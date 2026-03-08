import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Headphones, Award } from 'lucide-react';
import { navigateTo } from '../App';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: TrendingUp, value: 15000, suffix: '+', label: 'Cars Sold' },
  { icon: Users, value: 98, suffix: '%', label: 'Customer Satisfaction' },
  { icon: Headphones, value: 24, suffix: '/7', label: 'Support Available' },
  { icon: Award, value: 50, suffix: '+', label: 'Awards Won' }
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

const StatItem = ({ stat, index, isVisible }: { stat: Stat; index: number; isVisible: boolean }) => {
  const count = useCountUp(stat.value, 2500, isVisible);
  const Icon = stat.icon;

  return (
    <div 
      className={`relative flex flex-col items-center text-center p-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150 + 200}ms` }}
    >
      {/* Icon */}
      <div className="mb-4 p-4 rounded-full bg-bmw-blue/10 border border-bmw-blue/20">
        <Icon className="w-6 h-6 text-bmw-blue" />
      </div>

      {/* Number */}
      <div className="counter-number font-oswald font-bold text-5xl sm:text-6xl lg:text-7xl text-white animate-pulse-glow">
        {count.toLocaleString()}{stat.suffix}
      </div>

      {/* Label */}
      <p className="mt-3 text-bmw-gray text-sm font-medium tracking-wide uppercase">
        {stat.label}
      </p>

      {/* Divider line (except for last item) */}
      {index < stats.length - 1 && (
        <div 
          className={`hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-1000 ${
            isVisible ? 'h-24 opacity-100' : 'h-0 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 150 + 400}ms` }}
        />
      )}
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-24 bg-bmw-dark overflow-hidden"
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(46, 92, 255, 0.05) 0%, transparent 60%)'
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 neon-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-bmw-blue text-sm font-medium tracking-widest uppercase mb-2">
            Our Impact
          </p>
          <h2 className="font-oswald font-bold text-4xl sm:text-5xl text-white">
            NUMBERS THAT <span className="text-bmw-gray">SPEAK</span>
          </h2>
          <p className="text-bmw-gray mt-4 max-w-2xl mx-auto">
            Excellence in every metric. Our commitment to quality and customer satisfaction is reflected in every number.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <StatItem 
              key={stat.label} 
              stat={stat} 
              index={index} 
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-bmw-gray mb-6">
            Join thousands of satisfied BMW owners today
          </p>
          <button 
            onClick={() => navigateTo('/inventory')}
            className="inline-block px-8 py-4 bg-bmw-blue text-white font-medium rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-glow-lg"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stats;
