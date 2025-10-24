// File: api/create-order.js

import { Cashfree, CFEnvironment } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

// --- Validation ---
console.log("--- Checking Environment Variables ---");
const requiredEnvVars = [
  "CASHFREE_APP_ID",
  "CASHFREE_SECRET_KEY",
  "CASHFREE_API_VERSION",
  "VITE_SUPABASE_URL",
  "SUPABASE_SERVICE_KEY",
  "VITE_BASE_URL",
];
let missingVars = [];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    missingVars.push(varName);
  } else {
    // Log existing vars (excluding secrets)
    if (!varName.includes("KEY")) {
      console.log(`${varName}: ${process.env[varName]}`);
    } else {
      console.log(`${varName} exists: true`);
    }
  }
}

if (missingVars.length > 0) {
  const errorMessage = `Missing required environment variables: ${missingVars.join(
    ", "
  )}`;
  console.error(errorMessage);
  // We'll throw later inside the handler if needed, but log now.
} else {
  console.log("All required environment variables seem to be present.");
}
console.log("------------------------------------");

// --- Initialize Cashfree ---
let cashfree;
try {
  console.log("Attempting to initialize Cashfree...");
  cashfree = new Cashfree({
    environment: CFEnvironment.SANDBOX, // Make sure this matches your keys (TEST vs PROD)
    clientId: process.env.CASHFREE_APP_ID,
    clientSecret: process.env.CASHFREE_SECRET_KEY,
    apiVersion: process.env.CASHFREE_API_VERSION,
  });
  console.log("Cashfree object created.");
  // --- ADDED CHECK ---
  if (cashfree && cashfree.pg && cashfree.pg.orders) {
    console.log("Cashfree instance seems valid (has pg.orders).");
  } else {
    console.error("!!! Cashfree instance is INVALID or missing pg.orders !!!");
    // Log the structure if it exists but is wrong
    console.log(
      "Cashfree object structure:",
      JSON.stringify(cashfree, null, 2)
    );
  }
} catch (initError) {
  console.error("!!! Error during Cashfree initialization:", initError);
  // Throwing here will stop the function before the handler runs
  throw initError;
}

// --- Initialize Supabase ---
let supabase;
try {
  console.log("Attempting to initialize Supabase...");
  supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  console.log("Supabase client created.");
} catch (dbError) {
  console.error("!!! Error during Supabase initialization:", dbError);
  throw dbError;
}

// --- Vercel Handler Function ---
export default async function handler(req, res) {
  // Double-check env vars inside handler too, in case of runtime issues
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables at runtime: ${missingVars.join(
      ", "
    )}`;
    console.error(errorMessage);
    return res.status(500).json({ error: errorMessage });
  }
  // Check if cashfree object exists
  if (!cashfree || !cashfree.pg || !cashfree.pg.orders) {
    console.error("Cashfree instance is invalid inside handler!");
    return res
      .status(500)
      .json({ error: "Cashfree SDK not initialized correctly" });
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const { name, email, phone, address } = req.body;
    console.log("Received request body:", req.body); // Log incoming data

    if (!name || !email || !phone || !address) {
      console.log("Validation failed: Missing required fields.");
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
    const amount = 1499;
    const orderId = `GDC_ORDER_${Date.now()}`;
    console.log(`Processing order: ${orderId} for amount ${amount}`);

    // === "STORE" STEP ===
    console.log("Attempting to insert into Supabase...");
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
    console.log(`Supabase record created with ID: ${orderRecord.id}`);

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
    console.log(
      "Cashfree order request:",
      JSON.stringify(orderRequest, null, 2)
    );

    // --- Call Cashfree API (V5 method) ---
    console.log("Calling cashfree.pg.orders.create...");
    // Check again right before the call
    if (!cashfree || !cashfree.pg || !cashfree.pg.orders) {
      console.error("!!! Cashfree became invalid before API call !!!");
      throw new Error("Cashfree SDK invalid");
    }

    const response = await cashfree.pg.orders.create(orderRequest);
    const orderData = response.data;
    console.log("Cashfree API response received.");

    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned a non-active order:", orderData);
      throw new Error("Cashfree order creation failed - Non-ACTIVE status");
    }
    console.log(
      `Cashfree order ACTIVE, payment_session_id: ${orderData.payment_session_id}`
    );

    // === "PROCEED" STEP ===
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    // Log the specific error from Cashfree or elsewhere
    const errorDetails = error.response?.data || error.message || error;
    console.error("!!! Handler caught error:", errorDetails);
    // Log the stack trace if available
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    res.status(500).json({
      error: "Cashfree API error or internal server error",
      details: errorDetails,
    });
  }
}
