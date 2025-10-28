
import { Cashfree, CFEnvironment } from "cashfree-pg";

// This is a Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { amount, customer } = req.body;

  if (!amount || !customer) {
    return res.status(400).json({ error: "Missing required body parameters: amount and customer." });
  }

  // Reverting to the older constructor syntax as per the user's sample code
  const cashfree = new Cashfree(
    CFEnvironment.SANDBOX, 
    process.env.CASHFREE_APP_ID, 
    process.env.CASHFREE_SECRET_KEY
  );

  // Generate a unique order ID for the transaction
  const orderId = `GDC-YT-BLUEPRINT-${Date.now()}`;

  // Prepare the request object as per Cashfree's requirements
  const request = {
    order_amount: amount,
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: `customer-${customer.phone}`, // Create a unique customer ID
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_name: customer.name,
    },
    order_meta: {
      // This URL will be used to redirect the user after payment
      // IMPORTANT: Replace this with your actual production return URL
      return_url: `https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}`,
    },
  };

  try {
    // Reverting to the function call that worked on Vercel.
    const response = await cashfree.PGCreateOrder(request);
    
    // Send the successful response data (including payment_session_id) to the frontend
    res.status(200).json(response.data);

  } catch (error) {
    console.error("Full Cashfree error response:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: (error.response && error.response.data) ? error.response.data.message : "Failed to create order." });
  }
}
