import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Trigger confetti animation
    const triggerConfetti = () => {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#00ff00", "#26c6da", "#43a047"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#00ff00", "#26c6da", "#43a047"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    };

    // Get order details from localStorage or URL param (fallback)
    const storedOrder = localStorage.getItem("lastSuccessfulOrder");

    const loadFromServer = async (orderId) => {
      try {
        const resp = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId }),
        });
        const data = await resp.json();
        if (resp.ok && data.order) {
          setOrderDetails(data.order);
          toast.success("🎉 Order confirmed! Thank you for your purchase!", {
            icon: "🎉",
          });
          triggerConfetti();
          return true;
        }
      } catch (err) {
        console.error("Failed to load order from server", err);
      }
      return false;
    };

    (async () => {
      if (storedOrder) {
        try {
          const parsedOrder = JSON.parse(storedOrder);
          setOrderDetails(parsedOrder);
          toast.success("🎉 Order confirmed! Thank you for your purchase!", {
            icon: "🎉",
          });
          triggerConfetti();
          // Clear the stored order after 5 seconds
          setTimeout(
            () => localStorage.removeItem("lastSuccessfulOrder"),
            5000
          );
          return;
        } catch (e) {
          console.warn("Could not parse stored order", e);
        }
      }

      // Fallback: try to read order_id from URL and fetch from server
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("order_id");
      if (orderId) {
        const ok = await loadFromServer(orderId);
        if (!ok) {
          toast.error("No order details found");
          navigate("/");
        }
        return;
      }

      toast.error("No order details found!");
      navigate("/");
    })();
    // end async loader
  }, [navigate]);

  if (!orderDetails) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FFC700]"></div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFC700]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFD700]/10 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative max-w-3xl w-full">
        <div className="relative bg-white/5 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border-2 border-[#FFC700]/30 shadow-2xl">
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold mb-1">
              Payment Successful!
            </h1>
            <p className="text-sm text-gray-300">
              Your order has been confirmed
            </p>
          </div>

          <div className="pt-4">
            <dl className="divide-y divide-white/5">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">Order ID</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {orderDetails.order_id}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">Amount</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  ₹{orderDetails.amount || "N/A"}
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">Status</dt>
                <dd
                  className={`mt-1 text-sm font-semibold sm:mt-0 sm:col-span-2 ${
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
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-300">Date</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">
                  {orderDetails.created_at
                    ? new Date(orderDetails.created_at).toLocaleString()
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-6 py-3 bg-[#FFC700] text-[#1E1E1E] rounded-full font-bold hover:opacity-90 transition"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
