const Exclusivity = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-[#1E1E1E] to-black text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 text-red-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold backdrop-blur-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          Limited Time Offer
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-[#FFC700] via-white to-[#FFC700] bg-clip-text text-transparent">
          Why This is a One-Time Opportunity
        </h2>

        <div className="bg-white/5 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
            I don't take new mentorship clients anymore — my schedule is full for the next 1.5 years. That's why this blueprint exists. It's the only way to access my private frameworks, data, and YouTube systems that I use for brands and creators. Once this limited batch is sold out, I won't relaunch it.
          </p>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">1.5</div>
            <div className="text-xs sm:text-sm text-gray-400">Years Booked</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">100</div>
            <div className="text-xs sm:text-sm text-gray-400">Copies Only</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10">
            <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">$4K</div>
            <div className="text-xs sm:text-sm text-gray-400">Client Value</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exclusivity;
