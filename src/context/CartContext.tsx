import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  id: string; // unique id for cart item (product id + size)
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (cartItemId: string) => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, size: string) => {
    setCartItems(prev => {
      const cartItemId = `${product.id}-${size}`;
      const existingItem = prev.find(item => item.id === cartItemId);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prev, { id: cartItemId, product, size, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
