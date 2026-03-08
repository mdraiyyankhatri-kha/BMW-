import { useEffect, useRef, useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { navigateTo } from '../App';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const { setSearchQuery } = useApp();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x: x * 5, y: y * 5 });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery);
      navigateTo('/inventory');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-bmw-dark"
    >
      {/* Neon Grid Background */}
      <div className="absolute inset-0 neon-grid opacity-50" />
      
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #0A0C10 70%)'
        }}
      />

      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(46, 92, 255, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(46, 92, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Content */}
        <div className="flex flex-col items-center text-center mt-20">
          {/* BMW Logo Text */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 
              className="font-oswald font-bold text-[120px] sm:text-[180px] md:text-[220px] lg:text-[280px] leading-none tracking-tighter text-white/5 select-none"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
              }}
            >
              BMW
            </h1>
          </div>

          {/* Car Image */}
          <div 
            className={`relative -mt-20 sm:-mt-32 md:-mt-40 lg:-mt-48 transition-all duration-1200 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <img
              src="/images/bmw-hero.webp"
              alt="BMW M4 Coupe"
              className="w-full max-w-3xl lg:max-w-4xl h-auto object-contain animate-float"
            />
            {/* Light sweep effect */}
            <div className="absolute inset-0 animate-light-sweep pointer-events-none" />
          </div>

          {/* Tagline */}
          <div className={`mt-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-bmw-gray text-lg sm:text-xl font-light tracking-wide">
              Find Your Dream Car
            </p>
          </div>

          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className={`mt-8 w-full max-w-xl transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="glass rounded-full p-2 flex items-center gap-3 group hover:shadow-glow transition-shadow duration-300">
              <div className="pl-4">
                <Search className="w-5 h-5 text-bmw-gray group-focus-within:text-bmw-blue transition-colors" />
              </div>
              <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search for models, series..."
                className="flex-1 bg-transparent text-white placeholder-bmw-gray outline-none text-sm py-2"
              />
              <button 
                type="submit"
                className="px-6 py-2.5 bg-bmw-blue text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                Search
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className={`flex items-center gap-8 sm:gap-12 mt-12 transition-all duration-1000 delay-1100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-oswald font-bold text-white">9+</p>
              <p className="text-xs text-bmw-gray mt-1">Models</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-oswald font-bold text-white">15K+</p>
              <p className="text-xs text-bmw-gray mt-1">Sold</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-oswald font-bold text-white">98%</p>
              <p className="text-xs text-bmw-gray mt-1">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div 
          onClick={() => scrollToSection('featured')}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1300 cursor-pointer hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-bmw-gray text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-bmw-blue rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
