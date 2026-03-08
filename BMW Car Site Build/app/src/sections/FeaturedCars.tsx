import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Fuel, Settings, Users, ArrowRight, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { navigateTo } from '../App';

interface Car {
  id: number;
  name: string;
  model: string;
  price: string;
  image: string;
  specs: {
    fuel: string;
    transmission: string;
    seats: string;
  };
  tag?: string;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'BMW M4',
    model: 'Competition Coupe',
    price: '$84,100',
    image: '/images/bmw-m4.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '4'
    },
    tag: 'Popular'
  },
  {
    id: 2,
    name: 'BMW X5',
    model: 'xDrive40i',
    price: '$65,200',
    image: '/images/bmw-x5.webp',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '7'
    },
    tag: 'SUV'
  },
  {
    id: 4,
    name: 'BMW 7 Series',
    model: '740i',
    price: '$96,400',
    image: '/images/bmw-7series.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '5'
    },
    tag: 'Luxury'
  },
  {
    id: 5,
    name: 'BMW Z4',
    model: 'M40i',
    price: '$65,500',
    image: '/images/bmw-z4.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '2'
    },
    tag: 'Convertible'
  },
  {
    id: 6,
    name: 'BMW M3',
    model: 'Competition',
    price: '$85,000',
    image: '/images/bmw-m3.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '5'
    },
    tag: 'Performance'
  },
  {
    id: 7,
    name: 'BMW M8',
    model: 'Gran Coupe',
    price: '$130,000',
    image: '/images/bmw-m4-studio.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '4'
    },
    tag: 'Luxury'
  }
];

const FeaturedCars = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [addedCar, setAddedCar] = useState('');
  
  const { addToCart } = useApp();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability, { passive: true });
      checkScrollability();
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollability);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleAddToCart = (car: Car) => {
    addToCart(car as any);
    setAddedCar(car.name);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative py-24 bg-bmw-dark overflow-hidden"
    >
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 right-4 z-50 bg-bmw-blue text-white px-6 py-3 rounded-xl shadow-glow animate-slide-in-right">
          <p className="font-medium">{addedCar} added to cart!</p>
        </div>
      )}

      {/* Background elements */}
      <div className="absolute inset-0 neon-grid opacity-30" />
      <div 
        className="absolute top-0 right-0 w-1/2 h-full opacity-10"
        style={{
          background: 'radial-gradient(circle at 100% 50%, rgba(46, 92, 255, 0.2) 0%, transparent 60%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <p className="text-bmw-blue text-sm font-medium tracking-widest uppercase mb-2">
              Our Collection
            </p>
            <h2 className="font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
              FEATURED <span className="text-bmw-gray">CARS</span>
            </h2>
            <p className="text-bmw-gray mt-3 max-w-md">
              Curated selection of precision engineering. Discover the perfect BMW for your lifestyle.
            </p>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                canScrollLeft 
                  ? 'hover:bg-bmw-blue hover:border-bmw-blue hover:shadow-glow' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all ${
                canScrollRight 
                  ? 'hover:bg-bmw-blue hover:border-bmw-blue hover:shadow-glow' 
                  : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Cars Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory"
        >
          {cars.map((car, index) => (
            <div
              key={car.id}
              className={`flex-shrink-0 w-[320px] sm:w-[380px] snap-start transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="car-card bg-bmw-card rounded-2xl overflow-hidden border border-white/5 group">
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.name} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Tag */}
                  {car.tag && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-bmw-blue text-white text-xs font-medium rounded-full">
                      {car.tag}
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bmw-card via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-oswald font-semibold text-xl">
                        {car.name}
                      </h3>
                      <p className="text-bmw-gray text-sm">{car.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-bmw-blue font-oswald font-bold text-xl">
                        {car.price}
                      </p>
                      <p className="text-bmw-gray text-xs">Starting</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-4 py-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Fuel className="w-4 h-4 text-bmw-gray" />
                      <span className="text-bmw-gray text-xs">{car.specs.fuel}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-bmw-gray" />
                      <span className="text-bmw-gray text-xs">{car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-bmw-gray" />
                      <span className="text-bmw-gray text-xs">{car.specs.seats} Seats</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(car)}
                    className="w-full py-3 bg-bmw-blue text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 hover:shadow-glow mb-3"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`flex justify-center mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button 
            onClick={() => navigateTo('/inventory')}
            className="px-8 py-4 bg-transparent border border-bmw-blue text-bmw-blue hover:bg-bmw-blue hover:text-white font-medium rounded-full transition-all duration-300 flex items-center gap-3 hover:shadow-glow"
          >
            View All Inventory
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
