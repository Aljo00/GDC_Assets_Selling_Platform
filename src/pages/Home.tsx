import Hero from './components/Hero';
import Problem from './components/Problem';
import Pricing from './components/Pricing';
import Included from './components/Included';
import WhoItsFor from './components/WhoItsFor';
import Exclusivity from './components/Exclusivity';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Footer from './components/Footer';

export default function Home() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Hero scrollToPricing={scrollToPricing} />
      <Problem />
      <Pricing scrollToPricing={scrollToPricing} />
      <Included />
      <WhoItsFor />
      <Exclusivity />
      <Testimonials />
      <Faq />
      <Footer scrollToPricing={scrollToPricing} />
    </div>
  );
}