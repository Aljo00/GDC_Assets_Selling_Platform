import { Check, Star, Users, TrendingUp, Award, PlayCircle, Target } from 'lucide-react';

function App() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 font-semibold text-xs sm:text-sm shadow-lg">
              <Target className="w-4 h-4" />
              Limited Release | Only 100 Copies Available | Lifetime Access
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
              The exact YouTube system I use for my high-paying North American clients — now yours.
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              I don't take mentorship anymore, but I'm revealing everything that helped my clients and me grow from 0 to 50K+ subscribers fast — no ads, no tricks, just systems.
            </p>

            <button
              onClick={scrollToPricing}
              className="group relative bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg lg:text-xl font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <span className="relative z-10">Get Your Blueprint Now</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
            </button>

            <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">50K+</div>
                <div className="text-xs sm:text-sm text-gray-400">Subscribers Growth</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">12</div>
                <div className="text-xs sm:text-sm text-gray-400">Week Roadmap</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-[#FFC700] mb-1 sm:mb-2">100</div>
                <div className="text-xs sm:text-sm text-gray-400">Limited Copies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
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

      {/* What's Included Section */}
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
            {[
              '12-Week 0 – 50K Roadmap (step-by-step growth system)',
              'Viral Video Formula — how to craft content that blows up',
              '20+ video ideas + 10 storytelling templates',
              'My personal YouTube title & hook vault',
              'SEO & Algorithm Mastery (2025 update)',
              'Monetization Breakdown — brand deals & affiliate setups',
              'Automation system to upload & grow using AI tools',
              'Notion Dashboard + Upload Planner',
            ].map((item, index) => (
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
                💡 In short — the exact system my $4K/month clients get, now available for ₹1,499 only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-yellow-50/30 to-white">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] mb-4 sm:mb-6 bg-gradient-to-r from-[#1E1E1E] to-gray-600 bg-clip-text text-transparent">
              This Blueprint Was Built For You If...
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {[
              { text: 'Aspiring creators from Kerala who want a clear plan', icon: Users },
              { text: 'Freelancers and students who want to build a personal brand', icon: Target },
              { text: 'Working professionals who dream of a YouTube income', icon: TrendingUp },
              { text: 'Anyone tired of guessing what works and what doesn\'t', icon: Award },
            ].map((item, index) => {
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

      {/* Exclusivity Section */}
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

      {/* Pricing Section */}
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
                  After that → <span className="line-through text-gray-500">₹4,999</span> <span className="text-red-400 font-semibold">permanent price</span>
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
                onClick={scrollToPricing}
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

      {/* Testimonials Section */}
      <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-[0.02]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E1E1E] mb-4 sm:mb-6 bg-gradient-to-r from-[#1E1E1E] to-gray-600 bg-clip-text text-transparent">
              Real Results from Real Creators
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">See how creators transformed their channels using this exact system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Arjun Menon',
                role: 'Tech Content Creator',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'I used Amal\'s framework and my channel hit 10K subs in 2 months! The viral video formula alone was worth 10x the price.',
                rating: 5,
                growth: '0 → 10K subs'
              },
              {
                name: 'Priya Sharma',
                role: 'Lifestyle Vlogger',
                image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'This system showed me how to get brand deals under 5K subs. Made my first ₹25K within 3 weeks of implementing the strategies!',
                rating: 5,
                growth: '₹25K in 3 weeks'
              },
              {
                name: 'Rahul Krishna',
                role: 'Finance YouTuber',
                image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'The SEO and algorithm mastery section changed everything. My views went from 100 per video to 5K+ consistently.',
                rating: 5,
                growth: '100 → 5K+ views'
              },
              {
                name: 'Sneha Pillai',
                role: 'Educational Content',
                image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'The Malayalam + English framework was perfect for my audience. Hit monetization in just 8 weeks!',
                rating: 5,
                growth: 'Monetized in 8 weeks'
              },
              {
                name: 'Vivek Nair',
                role: 'Gaming Creator',
                image: 'https://images.pexels.com/photos/1681010/pexels-photo-1181010.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'The automation system saved me 10+ hours per week. Now I can focus on creating while the system handles the rest.',
                rating: 5,
                growth: 'Saved 10+ hrs/week'
              },
              {
                name: 'Anjali Thomas',
                role: 'Cooking Channel',
                image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
                text: 'From 200 subs to 15K in 3 months! The title & hook vault is pure gold. Every video now gets clicks.',
                rating: 5,
                growth: '200 → 15K subs'
              },
            ].map((testimonial, index) => (
              <div key={index} className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFC700]/10 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative">
                  <div className="flex items-start gap-4 mb-4 sm:mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#FFC700] shadow-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1E1E1E] text-base sm:text-lg">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                      <div className="flex gap-1 mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#FFC700] text-[#FFC700]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC700]/20 to-[#FFD700]/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#FFC700]/30">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#FFC700]" />
                    <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E]">{testimonial.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-[#FFC700]/10 via-[#FFD700]/10 to-[#FFC700]/10 p-6 sm:p-8 rounded-2xl border border-[#FFC700]/20">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold">
              🎯 Join 50+ creators who are already seeing results with this system
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-900 via-[#1E1E1E] to-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#FFC700] via-white to-[#FFC700] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#FFC700] to-[#FFD700] mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                q: 'Is this a course or mentorship?',
                a: 'No — it\'s a blueprint and system you can apply yourself. Everything is documented, organized, and ready to implement immediately.',
              },
              {
                q: 'Do I get lifetime access?',
                a: 'Yes. Download it once and keep it forever. Plus, you\'ll get all future updates completely free.',
              },
              {
                q: 'Do I need experience in YouTube?',
                a: 'Not at all. The system starts from zero. Whether you\'re a complete beginner or already have some subscribers, this will accelerate your growth.',
              },
              {
                q: 'Will this work for Malayalam content too?',
                a: 'Absolutely — the framework works for any language with the same algorithm. English, Malayalam, Hindi, or any regional language.',
              },
              {
                q: 'How is this different from other YouTube courses?',
                a: 'This isn\'t theory from a "guru". These are the exact systems I use for my high-paying North American clients. Real frameworks, real data, real results.',
              },
              {
                q: 'What if I don\'t see results?',
                a: 'The system is proven and used by paying clients. However, results depend on your implementation and consistency. This is not a magic pill — it\'s a professional system.',
              },
            ].map((faq, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#FFC700]/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#FFC700] mb-3 sm:mb-4 group-hover:text-white transition-colors">{faq.q}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative bg-gradient-to-br from-[#1E1E1E] via-black to-[#1E1E1E] text-white py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC700] to-[#FFD700] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <PlayCircle className="text-[#1E1E1E] w-6 h-6 sm:w-8 sm:h-8" strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#FFC700] to-white bg-clip-text text-transparent">
              I'm no longer taking new clients — but you can still access my entire YouTube growth system.
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
                <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">QUICK LINKS</h4>
                <div className="space-y-3">
                  <a href="#about" className="block text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base">About Us</a>
                  <a href="#contact" className="block text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base">Contact Us</a>
                </div>
              </div>

              <div>
                <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">LEGAL</h4>
                <div className="space-y-3">
                  <a href="#refund" className="block text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base">Refund Policy</a>
                  <a href="#privacy" className="block text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base">Privacy Policy</a>
                  <a href="#terms" className="block text-gray-400 hover:text-[#FFC700] transition-colors text-sm sm:text-base">Terms & Conditions</a>
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="text-[#FFC700] font-bold mb-4 text-sm sm:text-base">WHAT YOU GET</h4>
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
              <p className="text-gray-500 text-xs sm:text-sm">© 2025 GOM Digital Consultancy. All Rights Reserved.</p>
              <p className="text-gray-600 text-xs mt-2">Built with dedication to help creators succeed.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
