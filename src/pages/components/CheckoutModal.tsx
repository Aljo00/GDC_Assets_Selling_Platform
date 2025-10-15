import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import cashfree_logo from "../../assets/cashfree_logo.png"

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (data: { name: string; email: string; phone: string; address: string; }) => void;
}

const CheckoutModal = ({ isOpen, onClose, onProceedToPayment }: CheckoutModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (value.length < 2) error = 'Please enter your full name.';
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email address.';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = 'Please enter a valid 10-digit phone number.';
        break;
      case 'address':
        if (value.length < 10) error = 'Please enter a complete address.';
        break;
      default:
        break;
    }
    return error;
  };

  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allFieldsFilled = Object.values(formData).every(value => value !== '');
    setIsFormValid(!hasErrors && allFieldsFilled && agreed);
  }, [formData, errors, agreed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (isFormValid) {
      onProceedToPayment(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 transition-opacity duration-300 font-sans">
      <div className="bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto border border-white/20 transform transition-transform duration-300 scale-100">
        <div className="p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
            Secure Checkout
          </h2>
          <p className="text-gray-400 mb-6 sm:mb-8">
            Enter your details to get instant access.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='e.g. Amal Gopal'
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-yellow-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='you@example.com'
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-yellow-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='10-digit mobile number'
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-yellow-400"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Your full address'
                className={`w-full px-4 py-2 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 text-white placeholder-gray-500 ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500"
                    : "border-white/20 focus:ring-yellow-400"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-500 mt-1 cursor-pointer"
              />
              <label htmlFor="agree" className="ml-3 text-xs text-gray-400">
                I have read and agree to the
                <Link
                  to="/terms-conditions"
                  target="_blank"
                  className="font-medium text-yellow-400 hover:underline ml-1"
                >
                  Terms and Conditions
                </Link>
                ,
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="font-medium text-yellow-400 hover:underline ml-1"
                >
                  Privacy Policy
                </Link>
                , and
                <Link
                  to="/refund-policy"
                  target="_blank"
                  className="font-medium text-yellow-400 hover:underline ml-1"
                >
                  Refund Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] font-bold py-3 px-4 rounded-full text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:from-gray-600 disabled:to-gray-700 disabled:shadow-none disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
            >
              <img
                src={cashfree_logo}
                alt="Cashfree"
                className="h-6 w-auto"
              />
              <span>Proceed to Secure Payment</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
