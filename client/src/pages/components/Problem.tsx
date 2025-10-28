import { TrendingUp, Target, PlayCircle, Award } from 'lucide-react';

const Problem = () => {
  return ( 
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-[0.03]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] mb-4 sm:mb-6 bg-gradient-to-r from-[#1E1E1E] to-gray-600 bg-clip-text text-transparent">
            Stop Guessing. Start Growing.
          </h2>
          <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">Stuck Below 1K Subs?</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              If your channel is stuck below 1K subs and you've been uploading for months but still not growing, this blueprint has the answer.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Target className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">Find Your Perfect Niche</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Learn how to find the right niche that actually works in 2025 and get views without spending a rupee on ads.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <PlayCircle className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">Turn YouTube Into Income</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Transform YouTube into your side income or full-time career with proven monetization strategies.
            </p>
          </div>

          <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              <Award className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1E1E1E] mb-3 sm:mb-4">Monetize Early</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Discover how to monetize before even hitting 10K subs with brand deals and affiliate strategies.
            </p>
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-[#FFC700] to-[#FFD700] p-6 sm:p-8 rounded-2xl shadow-2xl">
          <p className="text-base sm:text-lg lg:text-xl font-bold text-[#1E1E1E]">
            📍 No theory. No YouTube Guru nonsense. Just the exact data and systems that work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Problem;
