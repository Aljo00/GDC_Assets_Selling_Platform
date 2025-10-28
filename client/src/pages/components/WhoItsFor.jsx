import { Users, Target, TrendingUp, Award } from 'lucide-react';

const WhoItsFor = () => {
  const items = [
    { text: 'Aspiring creators from Kerala who want a clear plan', icon: Users },
    { text: 'Freelancers and students who want to build a personal brand', icon: Target },
    { text: 'Working professionals who dream of a YouTube income', icon: TrendingUp },
    { text: 'Anyone tired of guessing what works and what doesn\'t', icon: Award },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-yellow-50/30 to-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] mb-4 sm:mb-6 bg-gradient-to-r from-[#1E1E1E] to-gray-600 bg-clip-text text-transparent">
            This Blueprint Was Built For You If...
          </h2>
          <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFC700]/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative">
                  <Icon className="text-[#FFC700] w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all" strokeWidth={2} />
                  <p className="text-base sm:text-lg font-semibold text-[#1E1E1E] leading-relaxed">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center bg-gradient-to-r from-[#FFC700]/20 via-[#FFD700]/20 to-[#FFC700]/20 p-6 sm:p-8 rounded-2xl border-2 border-[#FFC700]/30 backdrop-blur-sm">
          <p className="text-base sm:text-lg lg:text-xl font-bold text-[#1E1E1E]">🗣 English + Malayalam friendly frameworks inside.</p>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
