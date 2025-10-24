// File: api/create-order.js

// --- FIX: Use 'import' instead of 'require' ---
import { Cashfree } from "cashfree-pg";
import { CFEnvironment } from "cashfree-pg/dist/utils/cf-environment";
import { createClient } from "@supabase/supabase-js";
// Note: We don't import VercelRequest/Response types in JS

// --- Validation (ensure VITE_BASE_URL is set in Vercel) ---
if (
  !process.env.CASHFREE_APP_ID ||
  !process.env.CASHFREE_SECRET_KEY ||
  !process.env.CASHFREE_API_VERSION ||
  !process.env.VITE_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_KEY ||
  !process.env.VITE_BASE_URL
) {
  const missing = [
    !process.env.CASHFREE_APP_ID && "CASHFREE_APP_ID",
    !process.env.CASHFREE_SECRET_KEY && "CASHFREE_SECRET_KEY",
    !process.env.CASHFREE_API_VERSION && "CASHFREE_API_VERSION",
    !process.env.VITE_SUPABASE_URL && "VITE_SUPABASE_URL",
    !process.env.SUPABASE_SERVICE_KEY && "SUPABASE_SERVICE_KEY",
    !process.env.VITE_BASE_URL && "VITE_BASE_URL",
  ]
    .filter(Boolean)
    .join(", ");

  console.error(`Missing required environment variables: ${missing}`);
  throw new Error(`Missing required environment variables: ${missing}`);
}

// --- Initialize Cashfree (V5 constructor) ---
const cashfree = new Cashfree({
  environment: CFEnvironment.SANDBOX,
  clientId: process.env.CASHFREE_APP_ID,
  clientSecret: process.env.CASHFREE_SECRET_KEY,
  apiVersion: process.env.CASHFREE_API_VERSION,
});

// --- Initialize Supabase ---
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// --- FIX: Use 'export default' for ES Modules ---
export default async function handler(req, res) {
  // Check method
  if (req.method !== "POST") {
    // Note: Vercel types aren't available, but we can still set status/json
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

    // === "STORE" STEP ===
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
      .select("id")
      .single();

    if (supabaseError) {
      console.error("Supabase error:", supabaseError.message);
      res.status(500).json({ error: "Failed to create order record" });
      return;
    }

    if (!orderRecord) {
      console.error(
        "Supabase error: Failed to retrieve order record after insert"
      );
      res.status(500).json({ error: "Failed to create order record properly" });
      return;
    }

    // === "TRANSFER" STEP ===
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
        return_url: `${process.env.VITE_BASE_URL}/payment-status?order_id={order_id}`,
      },
      order_note: "0 to 50K YouTube Blueprint",
    };

    // --- Call Cashfree API (V5 method) ---
    const response = await cashfree.pg.orders.create(orderRequest);
    const orderData = response.data;

    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned a non-active order:", orderData);
      throw new Error("Cashfree order creation failed"); // This will be caught below
    }

    // === "PROCEED" STEP ===
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    const errorDetails = error.response?.data || error.message || error;
    console.error("Handler error:", errorDetails);
    res.status(500).json({
      error: "Cashfree API error or internal server error",
      details: errorDetails,
    });
  }
}
