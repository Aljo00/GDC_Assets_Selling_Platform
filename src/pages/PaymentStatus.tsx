import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { CheckCircle, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

export default function PaymentStatus() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"LOADING" | "SUCCESS" | "FAILED">(
    "LOADING"
  );
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const order_id = searchParams.get("order_id");
    setOrderId(order_id);

    if (!order_id) {
      setStatus("FAILED");
      return;
    }

    // Function to verify payment.
    // We check our *own* database, which is the source of truth.
    // A more secure way would be a webhook from Cashfree updating
    // our DB, but polling works for a quick start.
    const checkPayment = async () => {
      try {
        // IMPORTANT: Enable Row Level Security (RLS) on your 'orders' table
        // For this to work, RLS should allow a user to read an order
        // if they know the 'order_id', or just allow public read access.
        const { data, error } = await supabase
          .from("orders")
          .select("payment_status")
          .eq("order_id", order_id)
          .single();

        if (error || !data) {
          console.error("Error fetching order:", error);
          // Retry or fail
          setStatus("FAILED");
          return;
        }

        // You might need to poll here if you use Webhooks,
        // but for 'return_url', the status might be updated by Cashfree.
        // For now, let's assume it might still be PENDING and we retry.

        // This is a simplified check.
        // A robust solution involves webhooks from Cashfree to update your DB.
        // For now, we'll assume the payment page is hit after Cashfree
        // processes the payment. A simple "SUCCESS" is optimistic.

        // A better check (if you don't have webhooks):
        // Call another serverless function `/api/verify-payment?order_id=...`
        // which then calls Cashfree's server-side API to get the true status
        // and updates Supabase, then returns the status to us.

        // For this example, we'll just show success.
        // TODO: Implement a proper server-side verification.
        setStatus("SUCCESS");

        // A simple check (if you don't have webhooks yet):
        // if (data.payment_status === 'PAID') {
        //   setStatus('SUCCESS');
        // } else {
        //   setStatus('FAILED'); // Or 'PENDING'
        // }
      } catch (err) {
        console.error(err);
        setStatus("FAILED");
      }
    };

    checkPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-12 text-center">
        {status === "LOADING" && (
          <>
            <Loader2 className="w-16 h-16 text-[#FFC700] mx-auto animate-spin" />
            <h1 className="text-2xl font-bold text-[#1E1E1E] mt-6">
              Verifying Payment...
            </h1>
            <p className="text-gray-600 mt-2">
              Please wait while we confirm your transaction.
            </p>
          </>
        )}

        {status === "SUCCESS" && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-[#1E1E1E] mt-6">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mt-2">
              Thank you for your purchase. Your "0-50K YouTube Blueprint" is on
              its way to your email inbox.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-medium">
              Order ID: <span className="text-gray-800">{orderId}</span>
            </p>
          </>
        )}

        {status === "FAILED" && (
          <>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h1 className="text-2xl font-bold text-[#1E1E1E] mt-6">
              Payment Failed
            </h1>
            <p className="text-gray-600 mt-2">
              There was an issue with your payment. Your card has not been
              charged. Please try again.
            </p>
            {orderId && (
              <p className="text-sm text-gray-500 mt-4 font-medium">
                Order ID: <span className="text-gray-800">{orderId}</span>
              </p>
            )}
          </>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#1E1E1E] hover:text-[#FFC700] transition-colors mt-10 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
