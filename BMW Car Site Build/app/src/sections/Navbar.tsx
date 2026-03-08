import { useState, useEffect } from 'react';
import { ShoppingCart, User, X, Plus, Minus, Trash2, Menu, LogOut, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { user, logout, cart, cartCount, cartTotal, removeFromCart, updateQuantity } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const { login, register } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (isRegistering) {
      const success = register(loginEmail, loginPassword, registerName);
      if (success) {
        setIsLoginOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        setRegisterName('');
      } else {
        setLoginError('Email already registered');
      }
    } else {
      const success = login(loginEmail, loginPassword);
      if (success) {
        setIsLoginOpen(false);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError('Invalid email or password');
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-bmw-dark/95 backdrop-blur-lg border-b border-white/5 py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-bmw-blue flex items-center justify-center">
                <span className="text-white font-oswald font-bold text-lg">B</span>
              </div>
              <span className="text-white font-oswald font-semibold text-xl tracking-wider hidden sm:block">BMW</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('featured')} className="text-bmw-gray hover:text-white transition-colors text-sm font-medium underline-animation">
                Models
              </button>
              <button onClick={() => scrollToSection('featured')} className="text-bmw-gray hover:text-white transition-colors text-sm font-medium underline-animation">
                Featured
              </button>
              <button onClick={() => scrollToSection('stats')} className="text-bmw-gray hover:text-white transition-colors text-sm font-medium underline-animation">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-bmw-gray hover:text-white transition-colors text-sm font-medium underline-animation">
                Contact
              </button>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white hover:bg-white/10 transition-all"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white hover:bg-white/10 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-bmw-blue text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Button */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm hidden lg:block">{user.name || user.email}</span>
                  <button 
                    onClick={logout}
                    className="w-10 h-10 rounded-full bg-bmw-blue flex items-center justify-center text-white hover:bg-blue-600 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white hover:bg-bmw-blue transition-all"
                >
                  <User className="w-4 h-4" />
                </button>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white transition-all"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearch} className="mt-4 animate-fade-in-up">
              <div className="glass rounded-full p-2 flex items-center gap-3">
                <Search className="w-5 h-5 text-bmw-gray ml-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search BMW models..."
                  className="flex-1 bg-transparent text-white placeholder-bmw-gray outline-none text-sm py-2"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="px-5 py-2 bg-bmw-blue text-white text-sm font-medium rounded-full hover:bg-blue-600 transition-all"
                >
                  Search
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-bmw-dark/98 backdrop-blur-lg border-b border-white/5 py-4 animate-fade-in-up">
            <div className="px-4 space-y-3">
              <button onClick={() => scrollToSection('featured')} className="block w-full text-left text-white py-2 hover:text-bmw-blue transition-colors">
                Models
              </button>
              <button onClick={() => scrollToSection('featured')} className="block w-full text-left text-white py-2 hover:text-bmw-blue transition-colors">
                Featured
              </button>
              <button onClick={() => scrollToSection('stats')} className="block w-full text-left text-white py-2 hover:text-bmw-blue transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-white py-2 hover:text-bmw-blue transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bmw-card border-l border-white/10 animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-white font-oswald font-bold text-2xl">Your Cart</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="w-16 h-16 text-bmw-gray mb-4" />
                    <p className="text-white font-medium mb-2">Your cart is empty</p>
                    <p className="text-bmw-gray text-sm">Add some BMW cars to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-bmw-gray text-sm">{item.model}</p>
                          <p className="text-bmw-blue font-semibold mt-1">{item.price}</p>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-bmw-blue transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-white w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-bmw-blue transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-bmw-gray">Subtotal</span>
                    <span className="text-white font-semibold">${cartTotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => {
                      if (!user) {
                        setIsCartOpen(false);
                        setIsLoginOpen(true);
                        alert('Please sign in to place an order');
                      } else {
                        alert(`Order placed successfully! Total: $${cartTotal.toLocaleString()}`);
                      }
                    }}
                    className="w-full py-4 bg-bmw-blue text-white font-medium rounded-xl hover:bg-blue-600 transition-all hover:shadow-glow"
                  >
                    {user ? 'Place Order' : 'Sign in to Order'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsLoginOpen(false)}
          />
          <div className="relative w-full max-w-md bg-bmw-card border border-white/10 rounded-2xl p-8 animate-scale-in">
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="text-white font-oswald font-bold text-3xl mb-2">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h3>
            <p className="text-bmw-gray mb-6">
              {isRegistering ? 'Sign up to start ordering' : 'Sign in to access your cart'}
            </p>

            {loginError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {isRegistering && (
                <div>
                  <label className="block text-bmw-gray text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-bmw-gray outline-none focus:border-bmw-blue transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-bmw-gray text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-bmw-gray outline-none focus:border-bmw-blue transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-bmw-gray text-sm mb-2">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-bmw-gray outline-none focus:border-bmw-blue transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-bmw-blue text-white font-medium rounded-xl hover:bg-blue-600 transition-all hover:shadow-glow"
              >
                {isRegistering ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            <p className="mt-6 text-center text-bmw-gray text-sm">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setLoginError('');
                }}
                className="ml-2 text-bmw-blue hover:underline"
              >
                {isRegistering ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
