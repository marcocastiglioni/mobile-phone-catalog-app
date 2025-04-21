import { Phone } from '@/types/phone';

export interface CartItem extends Phone {
  quantity: number;
  storageCapacity: string;
  colorName: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (phone: CartItem) => void;
  removeItem: (phoneId: string) => void;
  updateQuantity: (phoneId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}