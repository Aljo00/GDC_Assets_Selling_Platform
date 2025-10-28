const Faq = () => {
  const faqs = [
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
      a: 'This isn\'t theory from a \"guru\". These are the exact systems I use for my high-paying North American clients. Real frameworks, real data, real results.',
    },
    {
      q: 'What if I don\'t see results?',
      a: 'The system is proven and used by paying clients. However, results depend on your implementation and consistency. This is not a magic pill — it\'s a professional system.',
    },
  ];

  return (
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
          {faqs.map((faq, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-[#FFC700]/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#FFC700] mb-3 sm:mb-4 group-hover:text-white transition-colors">{faq.q}</h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
