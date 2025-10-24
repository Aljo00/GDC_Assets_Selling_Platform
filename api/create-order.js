// File: api/create-order.js

import { Cashfree, CFEnvironment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

// --- Vercel Handler Function ---
export default async function handler(req, res) {
  // --- Check Environment Variables Inside Handler ---
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
    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }

  // --- Initialize Supabase Inside Handler ---
  let supabase;
  try {
    supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
    // Optional: console.log("Supabase client created successfully.");
  } catch (dbError) {
    console.error("!!! Error during Supabase initialization:", dbError);
    return res
      .status(500)
      .json({ error: "Supabase init failed", details: dbError.message });
  }

  // --- Initialize Cashfree Inside Handler ---
  let cashfree;
  try {
    cashfree = new Cashfree({
      environment: CFEnvironment.SANDBOX, // Or CFEnvironment.PRODUCTION based on keys
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY,
      apiVersion: process.env.CASHFREE_API_VERSION,
    });
    // Check if initialization looks okay
    if (!cashfree || !cashfree.pg || !cashfree.pg.orders) {
      console.error("!!! Cashfree instance invalid after initialization !!!");
      throw new Error(
        "Cashfree SDK failed to initialize correctly (missing pg.orders)"
      );
    }
    // Optional: console.log("Cashfree client created successfully.");
  } catch (initError) {
    console.error("!!! Error during Cashfree initialization:", initError);
    return res
      .status(500)
      .json({ error: "Cashfree init failed", details: initError.message });
  }

  // --- Actual Handler Logic ---
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const amount = 1499;
    const orderId = `GDC_ORDER_${Date.now()}`;
    console.log(`Processing order: ${orderId} for amount ${amount}`);

    // === "STORE" STEP ===
    console.log("Attempting Supabase insert...");
    const { data: orderRecord, error: supabaseError } = await supabase
      .from("orders")
      .insert({
        /* ... order details ... */ order_id: orderId,
        name,
        email,
        phone: sanitizedPhone,
        address,
        amount,
        payment_status: "PENDING",
      })
      .select("id")
      .single();

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError.message);
      res.status(500).json({ error: "Failed to create order record" });
      return;
    }
    if (!orderRecord) {
      console.error("Supabase error: No record returned after insert.");
      res
        .status(500)
        .json({ error: "Failed to create/retrieve order record properly" });
      return;
    }
    console.log(`Supabase record created ID: ${orderRecord.id}`);

    // === "TRANSFER" STEP ===
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
    console.log("Calling Cashfree API...");

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

    // === "PROCEED" STEP ===
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    const errorDetails = error.response?.data || error.message || error;
    console.error("!!! Handler caught error:", errorDetails);
    if (error.stack) console.error("Stack trace:", error.stack);
    res.status(500).json({
      error: "API error or internal server error",
      details: errorDetails,
    });
  }
}
