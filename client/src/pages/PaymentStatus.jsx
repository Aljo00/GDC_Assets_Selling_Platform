import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "Verifying your payment, please wait..."
  );

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default PaymentStatus;
