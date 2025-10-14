import { Check } from 'lucide-react';

const Included = () => {
  const includedItems = [
    '12-Week 0 – 50K Roadmap (step-by-step growth system)',
    'Viral Video Formula — how to craft content that blows up',
    '20+ video ideas + 10 storytelling templates',
    'My personal YouTube title & hook vault',
    'SEO & Algorithm Mastery (2025 update)',
    'Monetization Breakdown — brand deals & affiliate setups',
    'Automation system to upload & grow using AI tools',
    'Notion Dashboard + Upload Planner',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-[#1E1E1E] to-black text-white">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#FFC700] via-[#FFD700] to-[#FFC700] bg-clip-text text-transparent">
            Inside the Blueprint: Your Complete Growth System
          </h2>
          <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {includedItems.map((item, index) => (
            <div key={index} className="group flex items-start gap-3 sm:gap-4 bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[#FFC700]/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FFC700]/20">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#FFC700] to-[#FFD700] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Check className="text-[#1E1E1E] w-4 h-4 sm:w-5 sm:h-5" strokeWidth={3} />
              </div>
              <span className="text-sm sm:text-base lg:text-lg text-gray-200 group-hover:text-white transition-colors">{item}</span>
            </div>
          ))}
        </div>

        <div className="relative bg-gradient-to-r from-[#FFC700] via-[#FFD700] to-[#FFC700] p-[2px] rounded-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFC700] to-[#FFD700] opacity-50 blur-xl group-hover:opacity-75 transition-opacity"></div>
          <div className="relative bg-[#1E1E1E] p-6 sm:p-8 rounded-2xl text-center">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-[#FFC700]">
              💡 In short — the exact system my $4K/month clients get, now available for ₹3,499 only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Included;
