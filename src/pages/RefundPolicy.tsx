import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Info } from 'lucide-react';

export default function RefundPolicy() {
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
            Refund Policy
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] rounded-full mb-8"></div>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            <p className="text-sm text-gray-500">Last Updated: October 14, 2025</p>
            
            <p>Thank you for purchasing the "0 to 50K YouTube Blueprint." We are confident it provides the tools and strategies to help you succeed on your YouTube journey.</p>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <div className="flex items-start gap-4">
                    <AlertTriangle className="text-red-600 w-8 h-8 flex-shrink-0 mt-1" />
                    <div>
                        <h2 className="text-2xl font-bold text-red-900 mt-0 mb-2">Our Policy on Refunds</h2>
                        <p className="text-red-800 font-semibold">
                            Due to the <strong>instant, digital, and irrevocable nature</strong> of our product, <strong>all sales are final and non-refundable.</strong>
                        </p>
                        <p className="mt-2 text-red-700">
                            When you complete your purchase, you receive immediate access to and can download the entire blueprint, including all templates, documents, and the Notion dashboard. Because the intellectual property is delivered to you instantly and cannot be "returned," we are unable to process any refunds.
                        </p>
                    </div>
                </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">Before You Purchase</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="font-semibold text-blue-800">We have made every effort to clearly and accurately describe the product. We strongly encourage you to:</p>
                <ul className="list-disc list-inside text-blue-700">
                    <li>Read the full product description on our landing page.</li>
                    <li>Review the "What's Included?" section carefully.</li>
                    <li>Check the FAQ section to clarify any doubts.</li>
                </ul>
                <p className="mt-2 text-blue-800">Please ensure the blueprint is the right fit for your needs <strong>before</strong> completing your transaction through our secure payment gateway, <strong>Cashfree</strong>.</p>
              </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">Acceptance of this Policy</h2>
                <p>By completing the purchase, you acknowledge that you have read, understood, and agree to be bound by this refund policy.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">Contact Us</h2>
                 <div className="bg-gray-100 border-l-4 border-gray-400 p-4 rounded-r-lg">
                    <div className="flex items-start gap-4">
                        <Info className="text-gray-600 w-6 h-6 flex-shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-gray-800">
                                If you have any questions about the blueprint <strong>before</strong> you buy, please feel free to contact us. We are happy to provide more details to help you make an informed decision.
                            </p>
                            <p className="mt-2"><strong>Email:</strong> <a href="mailto:[your-professional-email@gomdigitalconsultancy.com]" className="text-[#FFC700] font-bold">[your-professional-email@gomdigitalconsultancy.com]</a></p>
                        </div>
                    </div>
                </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}