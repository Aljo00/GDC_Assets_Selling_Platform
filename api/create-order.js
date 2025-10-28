import { Cashfree, CFEnvironment } from "cashfree-pg";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Get credentials from Vercel env
  const APP_ID = process.env.CASHFREE_APP_ID;
  const APP_SECRET = process.env.CASHFREE_SECRET_KEY;
  if (!APP_ID || !APP_SECRET) {
    return res
      .status(500)
      .json({ error: "Missing Cashfree credentials in environment" });
  }

  // Get user details from request body
  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Prepare order data
  const orderId = `GDC_ORDER_${Date.now()}`;
  const orderRequest = {
    order_id: orderId,
    order_amount: 1499,
    order_currency: "INR",
    customer_details: {
      customer_id: orderId,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
    },
    order_meta: {
      return_url: `${
        process.env.VITE_BASE_URL || "https://assets.gomdigitalconsultancy.com"
      }/payment-status?order_id={order_id}`,
    },
    order_note: "GDC Asset Purchase",
  };

  try {
    const cashfree = new Cashfree(CFEnvironment.SANDBOX, APP_ID, APP_SECRET);
    const response = await cashfree.PGCreateOrder(orderRequest);
    const orderData = response.data;
    if (orderData.order_status !== "ACTIVE") {
      throw new Error("Cashfree order creation failed");
    }
    return res
      .status(200)
      .json({ paymentSessionId: orderData.payment_session_id });
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || error;
    return res.status(500).json({ error: "Cashfree error", details: msg });
  }
}
