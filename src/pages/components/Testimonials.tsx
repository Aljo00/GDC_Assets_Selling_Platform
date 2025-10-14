import { Star, TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Arjun Menon',
      role: 'Tech Content Creator',
      initials: 'AM',
      color: 'from-blue-500 to-blue-600',
      text: "I used Amal's framework and my channel hit 10K subs in 2 months! The viral video formula alone was worth 10x the price.",
      rating: 5,
      growth: '0 → 10K subs'
    },
    {
      name: 'Priya Sharma',
      role: 'Lifestyle Vlogger',
      initials: 'PS',
      color: 'from-pink-500 to-pink-600',
      text: "This system showed me how to get brand deals under 5K subs. Made my first ₹25K within 3 weeks of implementing the strategies!",
      rating: 5,
      growth: '₹25K in 3 weeks'
    },
    {
      name: 'Rahul Krishna',
      role: 'Finance YouTuber',
      initials: 'RK',
      color: 'from-green-500 to-green-600',
      text: "The SEO and algorithm mastery section changed everything. My views went from 100 per video to 5K+ consistently.",
      rating: 5,
      growth: '100 → 5K+ views'
    },
    {
      name: 'Sneha Pillai',
      role: 'Educational Content',
      initials: 'SP',
      color: 'from-purple-500 to-purple-600',
      text: "The Malayalam + English framework was perfect for my audience. Hit monetization in just 8 weeks!",
      rating: 5,
      growth: 'Monetized in 8 weeks'
    },
    {
      name: 'Vivek Nair',
      role: 'Gaming Creator',
      initials: 'VN',
      color: 'from-orange-500 to-orange-600',
      text: "The automation system saved me 10+ hours per week. Now I can focus on creating while the system handles the rest.",
      rating: 5,
      growth: 'Saved 10+ hrs/week'
    },
    {
      name: 'Anjali Thomas',
      role: 'Cooking Channel',
      initials: 'AT',
      color: 'from-red-500 to-red-600',
      text: "From 200 subs to 15K in 3 months! The title & hook vault is pure gold. Every video now gets clicks.",
      rating: 5,
      growth: '200 → 15K subs'
    },
  ];

  return (
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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#FFC700] transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFC700]/10 to-transparent rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="flex items-start gap-4 mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg`}>
                    {testimonial.initials}
                  </div>
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
  );
};

export default Testimonials;
