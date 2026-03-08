import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Car {
  id: number;
  name: string;
  model: string;
  price: string;
  priceValue: number;
  image: string;
  specs: {
    fuel: string;
    transmission: string;
    seats: string;
  };
  tag?: string;
}

export interface CartItem extends Car {
  quantity: number;
}

export interface User {
  email: string;
  name?: string;
}

interface AppContextType {
  // User
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: number) => void;
  updateQuantity: (carId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Car[];
  
  // Registered users (for demo)
  registeredUsers: { email: string; password: string; name: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const cars: Car[] = [
  {
    id: 1,
    name: 'BMW M4',
    model: 'Competition Coupe',
    price: '$84,100',
    priceValue: 84100,
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
    priceValue: 65200,
    image: '/images/bmw-x5.webp',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '7'
    },
    tag: 'SUV'
  },
  {
    id: 3,
    name: 'BMW M8',
    model: 'Gran Coupe',
    price: '$130,000',
    priceValue: 130000,
    image: '/images/bmw-m4-studio.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '4'
    },
    tag: 'Luxury'
  },
  {
    id: 4,
    name: 'BMW 7 Series',
    model: '740i',
    price: '$96,400',
    priceValue: 96400,
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
    priceValue: 65500,
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
    priceValue: 85000,
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
    name: 'BMW M5',
    model: 'Competition',
    price: '$111,000',
    priceValue: 111000,
    image: '/images/bmw-m4.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '5'
    },
    tag: 'Performance'
  },
  {
    id: 8,
    name: 'BMW X6',
    model: 'M50i',
    price: '$93,000',
    priceValue: 93000,
    image: '/images/bmw-x5.webp',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '5'
    },
    tag: 'SUV'
  },
  {
    id: 9,
    name: 'BMW 5 Series',
    model: 'M550i',
    price: '$78,000',
    priceValue: 78000,
    image: '/images/bmw-7series.jpg',
    specs: {
      fuel: 'Petrol',
      transmission: 'Auto',
      seats: '5'
    },
    tag: 'Sedan'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bmw_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Registered users (persisted)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('bmw_registered_users');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bmw_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persist cart
  useEffect(() => {
    localStorage.setItem('bmw_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem('bmw_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bmw_user');
    }
  }, [user]);
  
  // Persist registered users
  useEffect(() => {
    localStorage.setItem('bmw_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);
  
  // User functions
  const login = (email: string, password: string): boolean => {
    const found = registeredUsers.find((u: any) => u.email === email && u.password === password);
    if (found) {
      setUser({ email: found.email, name: found.name });
      return true;
    }
    return false;
  };
  
  const register = (email: string, password: string, name: string): boolean => {
    const exists = registeredUsers.find((u: any) => u.email === email);
    if (exists) return false;
    
    const newUser = { email, password, name };
    setRegisteredUsers([...registeredUsers, newUser]);
    setUser({ email, name });
    return true;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bmw_user');
  };
  
  // Cart functions
  const addToCart = (car: Car) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === car.id);
      if (existing) {
        return prev.map(item =>
          item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...car, quantity: 1 }];
    });
  };
  
  const removeFromCart = (carId: number) => {
    setCart(prev => prev.filter(item => item.id !== carId));
  };
  
  const updateQuantity = (carId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(carId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === carId ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setCart([]);
  };
  
  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Search results
  const searchResults = searchQuery.trim()
    ? cars.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tag?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <AppContext.Provider value={{
      user,
      login,
      register,
      logout,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      searchQuery,
      setSearchQuery,
      searchResults,
      registeredUsers
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
