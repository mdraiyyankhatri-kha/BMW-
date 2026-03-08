import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Fuel, Settings, Users, Search, Filter } from 'lucide-react';
import { useApp, cars } from '../context/AppContext';
import Navbar from '../sections/Navbar';
import { navigateTo } from '../App';

const Inventory = () => {
  const { addToCart, cartCount, searchQuery, setSearchQuery, searchResults } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showNotification, setShowNotification] = useState(false);
  const [addedCar, setAddedCar] = useState('');

  const filters = ['All', 'SUV', 'Luxury', 'Performance', 'Convertible', 'Sedan'];

  const filteredCars = searchQuery.trim() 
    ? searchResults 
    : selectedFilter === 'All' 
      ? cars 
      : cars.filter(car => car.tag === selectedFilter);

  const handleAddToCart = (car: typeof cars[0]) => {
    addToCart(car);
    setAddedCar(car.name);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-bmw-dark">
      <Navbar onSearch={handleSearch} />
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-24 right-4 z-50 bg-bmw-blue text-white px-6 py-3 rounded-xl shadow-glow animate-slide-in-right">
          <p className="font-medium">{addedCar} added to cart!</p>
        </div>
      )}

      {/* Header */}
      <div className="pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-bmw-gray hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-bmw-blue text-sm font-medium tracking-widest uppercase mb-2">
                Full Collection
              </p>
              <h1 className="font-oswald font-bold text-4xl sm:text-5xl lg:text-6xl text-white">
                OUR <span className="text-bmw-gray">INVENTORY</span>
              </h1>
              <p className="text-bmw-gray mt-3">
                Browse our complete collection of petrol BMW vehicles
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bmw-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cars..."
                  className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-bmw-gray outline-none focus:border-bmw-blue transition-colors text-sm w-48 sm:w-64"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-bmw-blue/20 border border-bmw-blue/30 rounded-full">
                <ShoppingCart className="w-4 h-4 text-bmw-blue" />
                <span className="text-white text-sm font-medium">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
            <Filter className="w-4 h-4 text-bmw-gray flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-bmw-blue text-white'
                    : 'bg-white/5 text-bmw-gray hover:text-white hover:bg-white/10'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-bmw-gray mx-auto mb-4" />
              <h3 className="text-white text-xl font-medium mb-2">No cars found</h3>
              <p className="text-bmw-gray">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <div 
                  key={car.id}
                  className="car-card bg-bmw-card rounded-2xl overflow-hidden border border-white/5 group"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={car.image}
                      alt={`${car.name} ${car.model}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {car.tag && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-bmw-blue text-white text-xs font-medium rounded-full">
                        {car.tag}
                      </div>
                    )}
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
                      className="w-full py-3 bg-bmw-blue text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 hover:shadow-glow"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-bmw-gray text-sm">
            © 2024 BMW Dream Cars. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Inventory;
