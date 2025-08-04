"use client";
import { useCart } from "../components/CartContext";
import { useState } from "react";
import EmptyCart from "../components/EmptyCart";
import CartSummary from "../components/CartSummary";
import CartControls from "../components/CartControls";
import CartItem from "../components/CartItem";
import { getItemsCountText } from "../utils/declension";



export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedTotal = items
    .filter(item => selectedItems.has(item.id + (item.size || "") + (item.variant || "")))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id + (item.size || "") + (item.variant || ""))));
    }
  };

  const toggleSelectItem = (itemKey: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemKey)) {
      newSelected.delete(itemKey);
    } else {
      newSelected.add(itemKey);
    }
    setSelectedItems(newSelected);
  };

  const removeSelected = () => {
    items.forEach(item => {
      const itemKey = item.id + (item.size || "") + (item.variant || "");
      if (selectedItems.has(itemKey)) {
        removeFromCart(item.id, item.size, item.variant);
      }
    });
    setSelectedItems(new Set());
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Основная область корзины */}
          <div className="flex-1">
            {/* Заголовок */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">Корзина</h1>
              <p className="text-gray-400">{getItemsCountText(items.length)}</p>
            </div>

            {items.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                {/* Панель управления */}
                <CartControls
                  itemsCount={items.length}
                  selectedItemsCount={selectedItems.size}
                  onSelectAll={toggleSelectAll}
                  onRemoveSelected={removeSelected}
                  onClearCart={clearCart}
                />

                {/* Список товаров */}
                <div className="space-y-4">
                  {items.map((item) => {
                    const itemKey = item.id + (item.size || "") + (item.variant || "");
                    return (
                      <CartItem
                        key={itemKey}
                        item={item}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                        isSelected={selectedItems.has(itemKey)}
                        onToggleSelect={() => toggleSelectItem(itemKey)}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Боковая панель с итогами */}
          {items.length > 0 && (
            <CartSummary 
              itemsCount={items.length}
              total={total}
              onCheckout={() => alert("Оформление заказа пока не реализовано")}
            />
          )}
        </div>
      </div>
    </div>
  );
} 