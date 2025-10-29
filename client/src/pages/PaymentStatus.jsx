
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your payment, please wait...');

  useEffect(() => {
    const order_id = searchParams.get('order_id');

    if (!order_id) {
      setMessage('No order ID found.');
      toast.error('Payment verification failed: No order ID.');
      navigate('/');
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_id }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Payment verification failed.');
        }

        if (data.payment_status === 'PAID') {
          setMessage('Payment Successful! Your order has been confirmed.');
          // You can optionally redirect to a dedicated success page
          // navigate('/order-success');
        } else {
          // Handle other statuses like 'FAILED', 'PENDING', etc.
          setMessage(`Payment ${data.payment_status}. Redirecting to homepage...`);
          toast.error(`Payment failed or is still pending. Please try again.`);
          navigate('/');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setMessage(error.message);
        toast.error(error.message);
        navigate('/');
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
