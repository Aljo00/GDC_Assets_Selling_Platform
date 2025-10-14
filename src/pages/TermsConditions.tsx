import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function TermsConditions() {
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
            Terms & Conditions
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] rounded-full mb-8"></div>

          <div className="prose max-w-none space-y-8 text-gray-700">
            <p className="text-sm text-gray-500">Last Updated: October 14, 2025</p>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">1. Agreement to Terms</h2>
                <p>Welcome to GOM Digital Consultancy. These Terms and Conditions are a legally binding contract between you (the "customer") and us ("GOM Digital Consultancy") for the sale of the "0 to 50K YouTube Blueprint" (the "Product").</p>
                <p><strong>By purchasing and accessing the Product, you confirm that you have read, understood, and agree to be bound by all of these terms.</strong> If you do not agree, you are prohibited from using the Product.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">2. Intellectual Property Rights</h2>
                <p>The Product, including its content, videos, templates, worksheets, and all related materials, is the exclusive intellectual property of GOM Digital Consultancy. It is protected by international copyright and trademark laws. Unauthorized use, copying, or distribution is strictly forbidden.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">3. License and Usage Rules</h2>
                <p>When you purchase the Product, you are granted one (1) single-user license. This license is personal, non-exclusive, and non-transferable.</p>
                
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg my-4">
                    <h4 className="font-bold text-green-800">What You CAN Do:</h4>
                    <ul className="list-disc list-inside text-green-700">
                        <li>You may use the blueprint for your own personal YouTube channels or for commercial channels that you directly manage.</li>
                    </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-red-600 w-8 h-8 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-red-800 text-xl">What You CANNOT Do (License Restrictions):</h4>
                            <p className="text-red-700 mt-2">The following actions are a direct violation of your license and will result in immediate termination of access without a refund:</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-red-900">
                                <li><strong>Do not resell or redistribute:</strong> You are strictly forbidden from selling or giving away the Product.</li>
                                <li><strong>Do not share:</strong> You cannot share the files with friends, colleagues, or on any public forum or group. Your license is for your use only.</li>
                                <li><strong>Do not modify and claim as your own:</strong> You cannot alter the Product and re-package it as your own for sale or distribution.</li>
                                <li><strong>Do not make it public:</strong> You cannot upload the Product files to any public server, website, or file-sharing service.</li>
                            </ul>
                             <p className="font-bold text-red-900 mt-4">Violation of these terms is a breach of contract and copyright law, and we reserve the right to pursue legal action.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">4. Payments and Digital Delivery</h2>
                <p>All transactions are securely processed via <strong>Cashfree</strong>. Upon successful payment, the Product, being a digital download, will be delivered to you instantly via email or a direct download link.</p>
            </section>

            <section>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg my-4">
                    <h2 className="text-2xl font-bold text-yellow-800 mt-8 mb-4">5. Refund Policy</h2>
                    <p className="font-semibold text-yellow-900">All sales are final. We do not offer refunds.</p>
                    <p className="text-yellow-800">Due to the instant, digital, and irrevocable nature of our Product, we cannot process refunds once the purchase is complete. By purchasing, you acknowledge and agree to this no-refund policy.</p>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">6. Disclaimers and No Guarantees</h2>
                 <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                    <div className="flex items-start gap-4">
                        <AlertTriangle className="text-red-600 w-8 h-8 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-red-800 text-xl">Please Read Carefully:</h4>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-red-900">
                                <li>The Product is sold on an <strong>"as is"</strong> basis.</li>
                                <li><strong>We make no guarantee of results.</strong> Your success, subscriber growth, and any income earned depend entirely on your own effort, skill, consistency, and market conditions. This blueprint is a guide, not a magic bullet.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">7. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, GOM Digital Consultancy shall not be liable for any indirect, incidental, special, consequential, or punitive damages. In any case, our maximum liability to you will not exceed the purchase price of the Product.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">8. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal disputes will be subject to the exclusive jurisdiction of the courts located in Kerala, India.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">9. Changes to Terms</h2>
                <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last Updated" date on this page. Your continued use of the Product after any changes constitutes your acceptance of the new terms.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-[#1E1E1E] mt-8 mb-4">10. Contact Information</h2>
                <p>This website is handled by Amal Gopal, CEO of GOM Digital Consultancy (amal@gomdigitalconsultancy.com).</p>
                <p>For any questions or concerns regarding these Terms and Conditions, please contact us at: <a href="mailto:info@gomdigitalconsultancy.com" className="text-[#FFC700] font-bold">info@gomdigitalconsultancy.com</a>.</p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
