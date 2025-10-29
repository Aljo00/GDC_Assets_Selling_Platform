
import { createClient } from "@supabase/supabase-js";
import { Cashfree, CFEnvironment } from "cashfree-pg";

// This is a Vercel Serverless Function
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { order_id } = req.body;

  if (!order_id) {
    return res.status(400).json({ error: "Missing required body parameter: order_id." });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
  );

  try {
    // Verify payment status with Cashfree
    const statusResponse = await cashfree.PGOrderFetchPayments("2023-08-01", order_id);
    const payment = statusResponse.data[0]; // Get the most recent payment attempt

    if (!payment) {
      throw new Error("No payment found for this order.");
    }

    const paymentStatus = payment.payment_status;

    // Update the order in Supabase
    const { error: updateError } = await supabase
      .from("orders")
      .update({ payment_status: paymentStatus })
      .eq("order_id", order_id);

    if (updateError) {
      throw updateError;
    }

    // Send the final payment status to the frontend
    res.status(200).json({ payment_status: paymentStatus });

  } catch (error) {
    console.error("Full error response:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: (error.response && error.response.data) ? error.response.data.message : "Failed to verify payment." });
  }
}
