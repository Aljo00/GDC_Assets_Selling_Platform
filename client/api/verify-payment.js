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
    return res
      .status(400)
      .json({ error: "Missing required body parameter: order_id." });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
  );

  try {
    // First, get the order from Supabase to verify it exists
    const { data: existingOrder, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_id", order_id)
      .single();

    if (orderError || !existingOrder) {
      throw new Error("Order not found in database");
    }

    // Verify payment status with Cashfree using PGOrderFetchPayments
    const statusResponse = await cashfree.PGOrderFetchPayments(order_id);
    console.log("Cashfree Response:", statusResponse); // For debugging

    if (
      !statusResponse ||
      !statusResponse.data ||
      statusResponse.data.length === 0
    ) {
      throw new Error("No payment data found for this order");
    }

    // Check all transactions for this order
    const transactions = statusResponse.data;
    let paymentStatus;

    if (
      transactions.filter(
        (transaction) => transaction.payment_status === "SUCCESS"
      ).length > 0
    ) {
      paymentStatus = "PAID";
    } else if (
      transactions.filter(
        (transaction) => transaction.payment_status === "PENDING"
      ).length > 0
    ) {
      paymentStatus = "PENDING";
    } else {
      paymentStatus = "FAILED";
    } // Update the order in Supabase with new status
    const { data: updatedOrder, error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: paymentStatus,
        updated_at: new Date().toISOString(),
        payment_details: transactions[0], // Store the latest transaction details
      })
      .eq("order_id", order_id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Send the final payment status and order details to the frontend
    res.status(200).json({
      payment_status: paymentStatus,
      order: updatedOrder,
      transaction_details: transactions[0],
      message:
        paymentStatus === "PAID"
          ? "Payment successful! Your order has been confirmed."
          : `Payment ${normalizedStatus.toLowerCase()}. Please contact support if you need assistance.`,
    });
  } catch (error) {
    console.error(
      "Full error response:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error:
        error.response && error.response.data
          ? error.response.data.message
          : "Failed to verify payment.",
    });
  }
}
