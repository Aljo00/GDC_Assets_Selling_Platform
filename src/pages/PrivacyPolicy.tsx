import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#1E1E1E] hover:text-[#FFC700] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Home</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E1E1E] mb-4">
            Privacy Policy
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] rounded-full mb-8"></div>

          <div className="prose max-w-none space-y-8 text-gray-700">
            <p className="text-sm text-gray-500">Last Updated: October 14, 2025</p>
            
            <p>Your privacy is a top priority for us at GOM Digital Consultancy. This policy outlines how we collect, use, and safeguard your personal information when you purchase our "0 to 50K YouTube Blueprint."</p>
            <p>By proceeding with your purchase, you consent to the practices described in this policy.</p>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">1. Information We Collect</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-semibold text-blue-800">To deliver your product and process your order, we only collect essential information:</p>
                <ul className="list-disc list-inside text-blue-700">
                    <li><strong>Full Name</strong></li>
                    <li><strong>Email Address</strong></li>
                    <li><strong>Phone Number</strong></li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use your data exclusively for the following purposes:</p>
              <ul className="space-y-2">
                <li><strong className="text-gray-800">To Process Transactions:</strong> Your name, email, and phone number are used to process your payment via our secure gateway.</li>
                <li><strong className="text-gray-800">To Deliver Your Product:</strong> We use your email to send your purchase confirmation and the instant download link.</li>
                <li><strong className="text-gray-800">To Provide Support:</strong> We use your information to identify you as a customer and assist with your questions.</li>
                <li><strong className="text-gray-800">To Send Important Updates:</strong> As a lifetime access customer, we may email you about significant updates to the blueprint. <strong>We will never send you marketing emails without your permission.</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">3. Data Sharing and Third Parties</h2>
               <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-6">
                    <div className="flex items-start gap-4">
                        <ShieldCheck className="text-yellow-600 w-8 h-8 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-yellow-800 text-xl">Your Payment Security is Our Priority</h4>
                            <p className="text-yellow-800 mt-2">We are committed to protecting your data. <strong>We will never sell, trade, or rent your Personal Data.</strong></p>
                            <p className="mt-2 text-yellow-900">
                                Your payment is securely handled by our partner, <strong>Cashfree</strong>. While we provide them with your name, email, and phone number to process the transaction, <strong>we do not collect, see, or store your sensitive payment details</strong> (like credit card numbers, CVV, or UPI PINs). All payment data is encrypted and managed directly by Cashfree.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">4. Data Security</h2>
              <p>We implement robust security measures to protect your information. Your Personal Data is stored on secure servers and is only accessible to a limited number of authorized personnel who are bound by confidentiality agreements.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">5. Website Cookies</h2>
              <p>Our website may use "cookies" to improve your browsing experience. Cookies are small data files stored on your device that help our site remember your preferences. You have the option to disable cookies in your browser settings, though this may affect some site functionality.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">6. Changes to This Privacy Policy</h2>
              <p>We may update this policy periodically. Any changes will be posted on this page, and the "Last Updated" date will be revised. We encourage you to review this page from time to to stay informed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please don't hesitate to contact us:</p>
               <p><strong>By Email:</strong> <a href="mailto:info@gomdigitalconsultancy.com" className="text-[#FFC700] font-bold">info@gomdigitalconsultancy.com</a></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
