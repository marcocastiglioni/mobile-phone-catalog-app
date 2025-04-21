'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartContextType, CartItem } from '@/types/cart';

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const useCart = () => useContext( CartContext );

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // Load cart from localStorage when component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if ( savedCart ) {
      try {
        setItems( JSON.parse( savedCart ));

      } catch ( error ) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [ items ]);
  
  // Add item to cart
  const addItem = useCallback(( phone: CartItem ) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === phone.id);
      
      if ( existingItemIndex >= 0 ) {
        
        // Item already exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        
        // Item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...phone, quantity: 1 }];
      }
    });
  }, []);
  
  // Remove item from cart
  const removeItem = useCallback((phoneId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== phoneId));
  }, []);
  
  // Update quantity of item in cart
  const updateQuantity = useCallback((phoneId: string, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove item
      removeItem(phoneId);
      return;
    }
    
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === phoneId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  }, [removeItem]);
  
  // Clear cart
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);
  
  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + (item.basePrice * item.quantity), 0);
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};