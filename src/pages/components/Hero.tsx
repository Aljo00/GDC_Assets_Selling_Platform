import { Target } from 'lucide-react';

interface HeroProps {
  scrollToPricing: () => void;
}

const Hero = ({ scrollToPricing }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text Content */}
              <div className="text-center lg:text-left animate-fade-in-up">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-4 sm:px-5 py-2 rounded-full mb-6 font-semibold text-xs sm:text-sm shadow-lg">
                      <Target className="w-4 h-4" />
                      Limited Release | Only 100 Copies Available
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-xl">
                      The YouTube System I Use For High-Paying Clients.
                  </h1>

                  <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                      I'm revealing the exact strategies that helped my clients and me grow from 0 to 50K+ subscribers—no ads, no tricks, just proven systems.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                      <button
                          onClick={scrollToPricing}
                          className="group relative bg-gradient-to-r from-[#FFC700] to-[#FFD700] text-[#1E1E1E] px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                      >
                          <span className="relative z-10">Get The Blueprint</span>
                      </button>
                      <div className="text-center">
                          <p className="text-lg font-bold text-white">Lifetime Access</p>
                          <p className="text-sm text-gray-400">One-Time Payment</p>
                      </div>
                  </div>
              </div>

              {/* Right Column: Visuals & Stats */}
              <div className="relative flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="relative w-full max-w-sm">
                      <div className="absolute -top-8 -left-8 w-48 h-48 bg-yellow-400 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob"></div>
                      <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-purple-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
                      
                      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                          <div className="flex flex-col items-center mb-6">
                              <img
                                  src="/CEO.jpg"
                                  alt="Amal Gopal - CEO"
                                  className="w-28 h-28 rounded-full object-cover border-4 border-[#FFC700] shadow-lg mb-4"
                              />
                              <h3 className="text-2xl font-bold text-white">Amal Gopal</h3>
                              <p className="text-base text-gray-400">CEO, GOM Digital</p>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                  <p className="text-3xl font-bold text-[#FFC700]">50K+</p>
                                  <p className="text-sm text-gray-400">Subscribers</p>
                              </div>
                              <div>
                                  <p className="text-3xl font-bold text-[#FFC700]">12</p>
                                  <p className="text-sm text-gray-400">Week Roadmap</p>
                              </div>
                              <div>
                                  <p className="text-3xl font-bold text-[#FFC700]">100</p>
                                  <p className="text-sm text-gray-400">Copies Left</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;
