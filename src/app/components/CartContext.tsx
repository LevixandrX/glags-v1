"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  size?: string;
  variant?: string;
  quantity: number;
  stock: number; // максимальное количество на складе
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size?: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, variant?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Загрузка из localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      // Проверяем по id, size, variant
      const idx = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size && i.variant === item.variant
      );
      if (idx > -1) {
        // Уже есть — увеличиваем количество
        const updated = [...prev];
        updated[idx].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string, size?: string, variant?: string) => {
    setItems((prev) => prev.filter(
      (i) => !(i.id === id && i.size === size && i.variant === variant)
    ));
  };

  const updateQuantity = (id: string, quantity: number, size?: string, variant?: string) => {
    setItems((prev) => prev.map((i) =>
      i.id === id && i.size === size && i.variant === variant ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
} 