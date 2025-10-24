// File: api/create-order.js

import { Cashfree } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const {
    CASHFREE_APP_ID,
    CASHFREE_SECRET_KEY,
    CASHFREE_API_VERSION,
    VITE_SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    VITE_BASE_URL,
  } = process.env;

  const missingVars = [
    "CASHFREE_APP_ID",
    "CASHFREE_SECRET_KEY",
    "CASHFREE_API_VERSION",
    "VITE_SUPABASE_URL",
    "SUPABASE_SERVICE_KEY",
    "VITE_BASE_URL",
  ].filter((v) => !process.env[v]);

  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(
      ", "
    )}`;
    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }

  // Initialize Supabase
  let supabase;
  try {
    supabase = createClient(VITE_SUPABASE_URL, SUPABASE_SERVICE_KEY);
  } catch (dbError) {
    console.error("Supabase init failed:", dbError);
    return res
      .status(500)
      .json({ error: "Supabase init failed", details: dbError.message });
  }

  // Initialize Cashfree SDK
  // Using version >=5 style initialization based on docs
  let cashfree;
  try {
    cashfree = new Cashfree(
      Cashfree.SANDBOX, // Sandbox environment for testing
      CASHFREE_APP_ID,
      CASHFREE_SECRET_KEY
    );
    // No need to check `cashfree.pg.orders` because v5 uses static methods like PGCreateOrder
  } catch (initError) {
    console.error("Cashfree init failed:", initError);
    return res
      .status(500)
      .json({ error: "Cashfree init failed", details: initError.message });
  }

  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const amount = 1499; // Use your dynamic pricing logic if needed
    const orderId = `GDC_ORDER_${Date.now()}`;

    // Step 1: Create Supabase record
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
        "Supabase insert/select error:",
        supabaseError?.message || "No record returned"
      );
      return res.status(500).json({ error: "Failed to create order record" });
    }

    // Step 2: Build Cashfree order request
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: orderRecord.id.toString(),
        customer_email: email,
        customer_phone: sanitizedPhone,
        customer_name: name,
      },
      order_meta: {
        return_url: `${VITE_BASE_URL}/payment-status?order_id={order_id}`,
      },
      order_note: "0 to 50K YouTube Blueprint",
    };

    // Step 3: Call Cashfree API Create Order
    // Note: use CASHFREE_API_VERSION from env if required
    const response = await Cashfree.PGCreateOrder(
      CASHFREE_API_VERSION,
      orderRequest
    );
    const orderData = response.data;

    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned non-ACTIVE status:", orderData);
      throw new Error("Cashfree order creation failed - Non-ACTIVE status");
    }

    // Step 4: Send paymentSessionId to frontend
    return res
      .status(200)
      .json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    const errorDetails = error.response?.data || error.message || error;
    console.error("Handler caught error:", errorDetails);
    return res.status(500).json({
      error: "API error or internal server error",
      details: errorDetails,
    });
  }
}
