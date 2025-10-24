// File: api/create-order.js

import { Cashfree, CFEnvironment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  // --- Check Environment Variables ---
  const requiredEnvVars = [
    "CASHFREE_APP_ID",
    "CASHFREE_SECRET_KEY",
    "CASHFREE_API_VERSION",
    "VITE_SUPABASE_URL",
    "SUPABASE_SERVICE_KEY",
    "VITE_BASE_URL",
  ];
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(
      ", "
    )}`;
    console.error("Startup Error:", errorMessage); // Log error clearly
    return res.status(500).json({ error: errorMessage });
  } else {
    // Log non-sensitive vars to confirm they are loaded
    console.log(
      `Env Vars Loaded: Version=${process.env.CASHFREE_API_VERSION}, BaseURL=${process.env.VITE_BASE_URL}, SupaURL=${process.env.VITE_SUPABASE_URL}`
    );
  }

  // --- Initialize Supabase ---
  let supabase;
  try {
    supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    console.log("Supabase client initialized.");
  } catch (dbError) {
    console.error("Supabase Init Error:", dbError);
    return res
      .status(500)
      .json({ error: "Supabase init failed", details: dbError.message });
  }

  // --- Initialize Cashfree ---
  let cashfree;
  try {
    console.log("Attempting Cashfree initialization...");
    cashfree = new Cashfree({
      environment: CFEnvironment.SANDBOX, // Using imported Enum
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY,
      apiVersion: process.env.CASHFREE_API_VERSION,
    });
    // Explicitly check for pg.orders immediately
    if (
      !cashfree ||
      typeof cashfree.pg !== "object" ||
      typeof cashfree.pg.orders !== "object" ||
      typeof cashfree.pg.orders.create !== "function"
    ) {
      console.error(
        "!!! Critical Error: Cashfree instance is invalid - pg or pg.orders or pg.orders.create is missing/invalid !!!"
      );
      // Log the structure for deep debugging
      console.error(
        "Cashfree object structure:",
        JSON.stringify(cashfree, null, 2)
      );
      throw new Error(
        "Cashfree SDK failed validation (missing pg.orders.create function)"
      );
    }
    console.log("Cashfree client initialized successfully and validated.");
  } catch (initError) {
    console.error("!!! Cashfree Initialization Catch Block:", initError);
    return res
      .status(500)
      .json({ error: "Cashfree init failed", details: initError.message });
  }

  // --- Actual Handler Logic ---
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const amount = 1499;
    const orderId = `GDC_ORDER_${Date.now()}`;
    console.log(`Processing order: ${orderId}`);

    // === STORE ===
    console.log("Inserting into Supabase...");
    const { data: orderRecord, error: supabaseError } = await supabase
      .from("orders")
      .insert({
        order_id: orderId,
        name,
        email,
        phone: sanitizedPhone,
        address,
        amount,
        payment_status: "PENDING",
      })
      .select("id")
      .single();

    if (supabaseError || !orderRecord) {
      console.error(
        "Supabase Error:",
        supabaseError?.message || "No record returned"
      );
      return res.status(500).json({ error: "Failed to create order record" });
    }
    console.log(`Supabase record created ID: ${orderRecord.id}`);

    // === TRANSFER ===
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderRecord.id.toString(),
        email,
        customer_phone: sanitizedPhone,
        customer_name: name,
      },
      order_meta: {
        return_url: `${process.env.VITE_BASE_URL}/payment-status?order_id={order_id}`,
      },
      order_note: "0 to 50K YouTube Blueprint",
    };
    console.log("Calling Cashfree API (pg.orders.create)...");

    // --- Call Cashfree API ---
    const response = await cashfree.pg.orders.create(orderRequest);
    const orderData = response.data;
    console.log("Cashfree API response received.");

    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned non-active order:", orderData);
      throw new Error("Cashfree order creation failed - Non-ACTIVE");
    }
    console.log(
      `Cashfree order ACTIVE, session_id: ${orderData.payment_session_id}`
    );

    // === PROCEED ===
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    const errorDetails = error.response?.data || error.message || error;
    console.error("!!! Handler Catch Block:", errorDetails);
    if (error.stack) console.error("Stack:", error.stack);
    res.status(500).json({
      error: "API error or internal server error",
      details: errorDetails,
    });
  }
}
