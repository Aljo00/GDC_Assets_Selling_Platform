import { Cashfree } from "cashfree-pg";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone || !address)
    return res.status(400).json({ error: "Missing fields" });

  const required = [
    "CASHFREE_APP_ID",
    "CASHFREE_SECRET_KEY",
    "VITE_SUPABASE_URL",
    "SUPABASE_SERVICE_KEY",
    "VITE_BASE_URL",
  ];
  const missing = required.filter((v) => !process.env[v]);
  if (missing.length)
    return res
      .status(500)
      .json({ error: `Missing env vars: ${missing.join(", ")}` });

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
  const sanitizedPhone = phone.replace(/[^0-9]/g, "").slice(-10);
  const orderId = `GDC_ORDER_${Date.now()}`;
  const amount = 1499;

  const { data: orderRecord, error } = await supabase
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

  if (error || !orderRecord)
    return res.status(500).json({ error: "Supabase insert failed" });

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

  try {
    const response = await Cashfree.PGCreateOrder({
      order: orderRequest,
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2025-01-01",
      },
      env: "sandbox",
    });

    const orderData = response.data;
    res.status(200).json({ payment_session_id: orderData.payment_session_id });
  } catch (err) {
    console.error("Cashfree API error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ error: "Cashfree API call failed", details: err.message });
  }
}
