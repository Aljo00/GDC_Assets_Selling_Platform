// File: api/create-order.js

// 1. Import using require or ES module syntax
const { Cashfree } = require("cashfree-pg");
const { CFEnvironment } = require("cashfree-pg/dist/utils/cf-environment"); // Correct import
const { createClient } = require("@supabase/supabase-js");

// --- VALIDATION ---
// You MUST add VITE_BASE_URL to Vercel Environment Variables
// Value: https://assets.gomdigitalconsultancy.com
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
  // In a real app, you might want to return a 500 error here instead of throwing
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

// --- Vercel Handler Function ---
// Use 'module.exports' for CommonJS style, or 'export default' if your package.json has "type": "module"
module.exports = async (req, res) => {
  // Check method
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, phone, address } = req.body;

    // Basic validation for required fields
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Sanitize phone number
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
      return res.status(500).json({ error: "Failed to create order record" });
    }

    // Double-check if the insert returned data
    if (!orderRecord) {
      console.error(
        "Supabase error: Failed to retrieve order record after insert"
      );
      return res
        .status(500)
        .json({ error: "Failed to create order record properly" });
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

    // Check if Cashfree accepted the order
    if (orderData.order_status !== "ACTIVE") {
      console.error("Cashfree returned a non-active order:", orderData);
      throw new Error("Cashfree order creation failed");
    }

    // === "PROCEED" STEP ===
    // Send session ID back to the frontend
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (error) {
    // Log the actual error details
    const errorDetails = error.response?.data || error.message || error;
    console.error("Handler error:", errorDetails);
    res.status(500).json({
      error: "Cashfree API error or internal server error",
      details: errorDetails, // Send details back for debugging (maybe remove in production)
    });
  }
};
