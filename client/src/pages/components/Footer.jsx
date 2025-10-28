import { PlayCircle, Check } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = ({ scrollToPricing }) => {
  return (
    <footer className="relative bg-gradient-to-br from-[#1E1E1E] via-black to-[#1E1E1E] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC700] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <PlayCircle
                className="text-[#1E1E1E] w-6 h-6 sm:w-8 sm:h-8"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#FFC700] to-white bg-clip-text text-transparent">
            I'm no longer taking new clients — but you can still access my
            entire YouTube growth system.
          </h3>
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <span>Get Started Now</span>
            <span className="text-lg sm:text-xl">→</span>
          </button>
        </div>

        <div className="border-t border-white/10 pt-8 sm:pt-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div>
              <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">
                QUICK LINKS
              </h4>
              <div className="space-y-3">
                <a
                  href="https://www.gomdigitalconsultancy.com/about"
                  className="block text-left text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About us
                </a>
                <a
                  href="https://www.gomdigitalconsultancy.com/contact-us"
                  className="block text-left text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">
                LEGAL
              </h4>
              <div className="space-y-3">
                <Link
                  to="/privacy-policy"
                  className="block text-left text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-conditions"
                  className="block text-left text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/refund-policy"
                  className="block text-left text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base"
                >
                  Refund Policy
                </Link>
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">
                WHAT YOU GET
              </h4>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="text-[#FFC700] w-4 h-4" strokeWidth={3} />
                  <span>12-Week Growth Roadmap</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="text-[#FFC700] w-4 h-4" strokeWidth={3} />
                  <span>Viral Video Formula</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Check className="text-[#FFC700] w-4 h-4" strokeWidth={3} />
                  <span>Lifetime Access & Updates</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2025 GOM Digital Consultancy. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Built with dedication to help creators succeed.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
