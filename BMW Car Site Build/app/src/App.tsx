import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import FeaturedCars from './sections/FeaturedCars';
import Stats from './sections/Stats';
import Footer from './sections/Footer';
import Inventory from './pages/Inventory';
import { AppProvider } from './context/AppContext';
import './App.css';

// Navigation context to handle routing
export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

// Main Home Page Component
const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <Stats />
      <Footer />
    </>
  );
};

// Router Component
const AppContent = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple client-side routing
  const renderPage = () => {
    switch (currentPath) {
      case '/inventory':
        return <Inventory />;
      case '/':
      default:
        return (
          <>
            <Navbar />
            <HomePage />
          </>
        );
    }
  };

  return (
    <main className="relative bg-bmw-dark min-h-screen">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {renderPage()}
    </main>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
