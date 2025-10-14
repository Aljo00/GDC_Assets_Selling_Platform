import { useState } from 'react';
import { Check } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProceedToPayment = (userData: { name: string; email: string; phone: string; address: string; }) => {
    console.log("Proceeding to payment with data:", userData);
    // Here you would typically initiate the Cashfree payment process
  };

  return (
    <>
      <section id="pricing" className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#FFC700]/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFD700]/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 font-bold text-xs sm:text-sm shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E1E1E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E1E1E]"></span>
            </span>
            Launch Offer (First 100 Copies Only)
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFC700] to-[#FFD700] blur-2xl opacity-20 rounded-3xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl p-8 sm:p-12 lg:p-16 rounded-3xl border-2 border-[#FFC700]/30 shadow-2xl">
              <div className="mb-6 sm:mb-8">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-[#FFC700] via-[#FFD700] to-[#FFC700] bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-2xl">
                  ₹1,499
                </div>
                <div className="text-lg sm:text-xl md:text-2xl text-gray-400">
                  After that → <span className="line-through text-gray-500">₹3,499</span> <span className="text-red-400 font-semibold">permanent price</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-10 text-xs sm:text-sm md:text-base">
                <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <Check className="text-[#FFC700] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <Check className="text-[#FFC700] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  <span>Download Right After Payment</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                  <Check className="text-[#FFC700] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
                  <span>Lifetime Updates Free</span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-8 sm:px-12 lg:px-16 py-4 sm:py-6 rounded-full text-base sm:text-lg lg:text-2xl font-black hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10">BUY THE 0-50K YOUTUBE BLUEPRINT (₹1,499)</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
              </button>

              <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span>87 copies remaining</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CheckoutModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceedToPayment={handleProceedToPayment}
      />
    </>
  );
};

export default Pricing;
