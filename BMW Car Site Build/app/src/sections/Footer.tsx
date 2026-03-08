import { useEffect, useRef, useState } from 'react';
import { Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const footerLinks = {
  models: [
    { name: '1 Series', href: '#' },
    { name: '2 Series', href: '#' },
    { name: '3 Series', href: '#' },
    { name: '4 Series', href: '#' },
    { name: '5 Series', href: '#' },
    { name: '7 Series', href: '#' },
    { name: 'X Series', href: '#' },
    { name: 'M Series', href: '#' },
  ],
  services: [
    { name: 'Test Drive', href: '#' },
    { name: 'Finance', href: '#' },
    { name: 'Insurance', href: '#' },
    { name: 'Service Center', href: '#' },
    { name: 'Parts & Accessories', href: '#' },
    { name: 'Extended Warranty', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Investor Relations', href: '#' },
  ],
  support: [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: "Owner's Manual", href: '#' },
    { name: 'Roadside Assistance', href: '#' },
    { name: 'Software Update', href: '#' },
  ],
};

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const { register } = useApp();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Register the email as a new user with a default password
    const success = register(email, 'password123', email.split('@')[0]);
    if (success || !success) { // Show success even if already registered
      setShowSuccess(true);
      setEmail('');
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-bmw-dark overflow-hidden"
    >
      {/* Giant BMW Watermark */}
      <div 
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none transition-all duration-1500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <span 
          className="font-oswald font-bold text-[200px] sm:text-[300px] lg:text-[400px] whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.05)',
            color: 'transparent'
          }}
        >
          BMW
        </span>
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bmw-blue/50 to-transparent" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div>
                <h3 className="font-oswald font-bold text-3xl sm:text-4xl text-white mb-2">
                  STAY <span className="text-bmw-blue">UPDATED</span>
                </h3>
                <p className="text-bmw-gray">
                  Subscribe to our newsletter for the latest BMW news and exclusive offers.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-3 w-full lg:w-auto">
                <div className="flex-1 lg:w-80">
                  <div className="glass rounded-full p-1.5 flex items-center">
                    <Mail className="w-5 h-5 text-bmw-gray ml-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 bg-transparent text-white placeholder-bmw-gray outline-none text-sm py-2 px-3"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-bmw-blue text-white font-medium rounded-full hover:bg-blue-600 transition-all hover:shadow-glow flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
            
            {/* Success Message */}
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center animate-fade-in-up">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm">You can now sign in with your email and password: password123</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className={`col-span-2 md:col-span-3 lg:col-span-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-bmw-blue flex items-center justify-center">
                  <span className="text-white font-oswald font-bold text-lg">B</span>
                </div>
                <span className="text-white font-oswald font-semibold text-xl tracking-wider">BMW</span>
              </div>
              <p className="text-bmw-gray text-sm mb-6 max-w-xs">
                The Ultimate Driving Machine. Experience luxury, performance, and innovation with BMW.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-bmw-gray text-sm">
                  <Phone className="w-4 h-4 text-bmw-blue" />
                  <span>+91-987654321</span>
                </div>
                <div className="flex items-center gap-3 text-bmw-gray text-sm">
                  <Mail className="w-4 h-4 text-bmw-blue" />
                  <span>sakibraiyyan@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-bmw-gray text-sm">
                  <MapPin className="w-4 h-4 text-bmw-blue" />
                  <span>Mundra (Gujrat), India</span>
                </div>
              </div>
            </div>

            {/* Models Links */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '200ms' }}>
              <h4 className="text-white font-semibold mb-4">Models</h4>
              <ul className="space-y-2.5">
                {footerLinks.models.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-bmw-gray text-sm hover:text-bmw-blue transition-colors underline-animation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '300ms' }}>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-bmw-gray text-sm hover:text-bmw-blue transition-colors underline-animation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-bmw-gray text-sm hover:text-bmw-blue transition-colors underline-animation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-bmw-gray text-sm hover:text-bmw-blue transition-colors underline-animation"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-bmw-gray text-sm">
                © 2024 BMW Dream Cars. All rights reserved.
              </p>
              
              {/* Social Links - Instagram Only */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/s_h_a_k_i_b_4_7?igsh=cmtoajJ3c3Nla3Zt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram 1"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:bg-bmw-blue hover:text-white transition-all duration-300 hover:rotate-[360deg]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/soul_raiyyan_official?igsh=MXQwNXJhbHpmMTV6Yw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram 2"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-bmw-gray hover:bg-bmw-blue hover:text-white transition-all duration-300 hover:rotate-[360deg]"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-6">
                <a href="#" className="text-bmw-gray text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-bmw-gray text-sm hover:text-white transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
