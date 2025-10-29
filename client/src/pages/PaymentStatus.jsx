import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "Verifying your payment, please wait..."
  );
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const order_id = searchParams.get("order_id");

    if (!order_id) {
      setMessage("No order ID found.");
      toast.error("Payment verification failed: No order ID.", {
        icon: "❌",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    // Show initial loading toast
    const loadingToast = toast.loading("Verifying payment...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order_id }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Payment verification failed.");
        }

        setMessage(data.message);
        // Save returned order details for UI
        if (data.order) setOrderDetails(data.order);

        // Dismiss the loading toast
        toast.dismiss(loadingToast);

        if (data.payment_status === "PAID") {
          toast.success("Payment successful! Redirecting to order details...", {
            icon: "✅",
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          // Store order details in localStorage for the success page
          localStorage.setItem(
            "lastSuccessfulOrder",
            JSON.stringify(data.order)
          );
          // Redirect to success page after a short delay
          setTimeout(() => {
            navigate("/order-success");
          }, 2000);
        } else if (data.payment_status === "PENDING") {
          const pendingToast = toast.loading("Payment is still processing...", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          // Recheck after 5 seconds
          setTimeout(() => {
            toast.dismiss(pendingToast);
            verifyPayment();
          }, 5000);
        } else {
          toast.error(data.message, {
            icon: "❌",
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          // Redirect to homepage after a delay
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage(error.message);
        toast.dismiss(loadingToast);
        toast.error(error.message, {
          icon: "❌",
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => navigate("/"), 3000);
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <section
      id="payment-status"
      className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFC700]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFD700]/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-3xl w-full">
        <div className="relative bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border-2 border-[#FFC700]/30 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              Payment Status
            </h1>
            <div className="text-sm text-gray-300">Order verification</div>
          </div>

          <div className="space-y-4">
            <div className="text-gray-200">{message}</div>

            {orderDetails && (
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/3 p-4 rounded-lg">
                <div>
                  <dt className="text-xs text-gray-300">Order ID</dt>
                  <dd className="text-sm font-medium text-white">
                    {orderDetails.order_id}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-300">Amount</dt>
                  <dd className="text-sm font-medium text-white">
                    ₹{orderDetails.amount || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-300">Status</dt>
                  <dd
                    className={`text-sm font-semibold ${
                      orderDetails.payment_status === "PAID"
                        ? "text-green-400"
                        : orderDetails.payment_status === "PENDING"
                        ? "text-yellow-300"
                        : "text-red-400"
                    }`}
                  >
                    {orderDetails.payment_status}
                  </dd>
                </div>
              </dl>
            )}

            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-6 py-3 bg-[#FFC700] text-[#1E1E1E] rounded-full font-bold hover:opacity-90 transition"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentStatus;
