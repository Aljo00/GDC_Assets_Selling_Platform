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
    // Verify payment status with Cashfree
    // Get current date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
    const statusResponse = await cashfree.PGOrderFetchPayments(today, order_id);

    if (!statusResponse.data || statusResponse.data.length === 0) {
      throw new Error("No payment found for this order.");
    }

    const payment = statusResponse.data[0]; // Get the most recent payment attempt
    const paymentStatus = payment.payment_status.toUpperCase();

    // Map Cashfree status to our status
    let normalizedStatus;
    switch (paymentStatus) {
      case "SUCCESS":
      case "PAID":
        normalizedStatus = "PAID";
        break;
      case "FAILED":
      case "CANCELLED":
        normalizedStatus = "FAILED";
        break;
      case "PENDING":
      case "PROCESSING":
        normalizedStatus = "PENDING";
        break;
      default:
        normalizedStatus = "UNKNOWN";
    }

    // Update the order in Supabase
    const { data: order, error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: normalizedStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("order_id", order_id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // Send the final payment status and order details to the frontend
    res.status(200).json({
      payment_status: normalizedStatus,
      order: order,
      message:
        normalizedStatus === "PAID"
          ? "Payment successful! Your order has been confirmed."
          : `Payment ${normalizedStatus.toLowerCase()}. Please contact support if you need assistance.`,
    });
  } catch (error) {
    console.error(
      "Full error response:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        error:
          error.response && error.response.data
            ? error.response.data.message
            : "Failed to verify payment.",
      });
  }
}
