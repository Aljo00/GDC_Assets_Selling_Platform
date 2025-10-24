// File: api/create-order.js

import { Cashfree, CFEnvironment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

// --- Vercel Handler Function ---
export default async function handler(req, res) {
  // --- Check Environment Variables ---
  // Ensure VITE_BASE_URL is set in Vercel to your frontend URL
  // (e.g., https://assets.gomdigitalconsultancy.com)
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

  // --- Initialize Supabase ---
  let supabase;
  try {
    supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  } catch (dbError) {
    console.error("Supabase init failed:", dbError);
    return res
      .status(500)
      .json({ error: "Supabase init failed", details: dbError.message });
  }

  // --- Initialize Cashfree ---
  // This uses the object constructor matching the latest SDK and API docs
  let cashfree;
  try {
    cashfree = new Cashfree({
      environment: CFEnvironment.SANDBOX, // Use SANDBOX for testing
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY,
      apiVersion: process.env.CASHFREE_API_VERSION, // Should be '2023-08-01' or newer
    });
    // Check if initialization looks okay
    if (!cashfree || !cashfree.pg || !cashfree.pg.orders) {
      console.error(
        "!!! Cashfree instance invalid after initialization (missing pg.orders) !!!"
      );
      throw new Error(
        "Cashfree SDK failed to initialize correctly (missing pg.orders)"
      );
    }
  } catch (initError) {
    console.error("!!! Error during Cashfree initialization:", initError);
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

    // Validate incoming data
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Sanitize phone number to 10 digits
    const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const amount = 1499; // Amount from your pricing
    const orderId = `GDC_ORDER_${Date.now()}`; // Your unique order ID

    // === Step 1: Store Order Details in Supabase ===
    const { data: orderRecord, error: supabaseError } = await supabase
      .from("orders")
      .insert({
        order_id: orderId,
        name: name,
        email: email,
        phone: sanitizedPhone,
        address: address,
        amount: amount,
        payment_status: "PENDING",
      })
      .select("id") // Select the generated ID
      .single();

    if (supabaseError || !orderRecord) {
      console.error(
        "Supabase insert/select error:",
        supabaseError?.message || "No record returned"
      );
      return res.status(500).json({ error: "Failed to create order record" });
    }

    // === Step 2: Create Order Request for Cashfree ===
    // This structure matches the API documentation
    const orderRequest = {
      order_id: orderId, // Your order_id
      order_amount: amount, // Required amount
      order_currency: "INR", // Required currency
      customer_details: {
        customer_id: orderRecord.id.toString(), // Required, using Supabase ID
        customer_email: email, // Optional, but recommended
        customer_phone: sanitizedPhone, // Required phone
        customer_name: name, // Optional, but recommended
      },
      order_meta: {
        // Required for redirection after payment
        return_url: `${process.env.VITE_BASE_URL}/payment-status?order_id={order_id}`,
      },
      order_note: "0 to 50K YouTube Blueprint", // Optional note
    };

    // === Step 3: Call Cashfree API ===
    // Uses the V5 SDK method matching the documentation
    const response = await cashfree.pg.orders.create(orderRequest);
    const orderData = response.data; // Response data from Cashfree

    // Verify Cashfree accepted the order
    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned a non-active order:", orderData);
      throw new Error("Cashfree order creation failed - Non-ACTIVE status");
    }

    // === Step 4: Send Payment Session ID to Frontend ===
    // This ID is needed by the frontend SDK to open the payment modal
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    // Catch errors from Supabase or Cashfree API call
    const errorDetails = error.response?.data || error.message || error;
    console.error("Handler caught error:", errorDetails);
    if (error.stack) console.error("Stack:", error.stack);
    res.status(500).json({
      error: "API error or internal server error",
      details: errorDetails,
    });
  }
}
