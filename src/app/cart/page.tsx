"use client";
import { useCart } from "../components/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NoImagePlaceholder from "../components/NoImagePlaceholder";
import React from "react";
import { products } from '../catalog/products-mock';

type CartItemRowProps = {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    size?: string;
    variant?: string;
    quantity: number;
    stock?: number;
  };
  removeFromCart: (id: string, size?: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, variant?: string) => void;
};

function CartItemRow({ item, removeFromCart, updateQuantity }: CartItemRowProps) {
  const [hasImage, setHasImage] = useState(true);
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  // Синхронизируем inputValue, если количество меняется извне (например, через кнопки)
  React.useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const maxQty = typeof item.stock === 'number' ? item.stock : 9999;

  // Получаем slug по id
  const productData = products.find((p) => p.id === item.id);
  const slug = productData ? productData.slug : item.id;
  // Формируем ссылку с query-параметрами для размера и варианта
  let href = `/catalog/${item.id}`;
  if (slug) href = `/catalog/${slug}`;
  const params = [];
  if (item.size) params.push(`size=${encodeURIComponent(item.size.replace(/[^0-9]/g, ''))}`);
  if (item.variant) params.push(`variant=${encodeURIComponent(item.variant)}`);
  if (params.length) href += `?${params.join('&')}`;

  return (
    <li key={item.id + (item.size || "") + (item.variant || "")}
        className="flex items-center py-4 px-2 gap-4">
      <Link href={href} className="flex-shrink-0" tabIndex={-1}>
        {hasImage && item.image && item.image !== "" ? (
          <Image
            src={item.image}
            alt={item.title}
            width={80}
            height={80}
            className="rounded bg-white object-contain"
            onError={() => setHasImage(false)}
          />
        ) : (
          <NoImagePlaceholder width={80} height={80} iconSize={32} textSize="12px" textPadding="2px 0 0 0" bgColor="#D9D9D9" textAlign="center" />
        )}
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={href} className="block">
          <div className="font-medium text-lg truncate">{item.title}</div>
          {item.size && <div className="text-sm text-gray-400 truncate">Размер: {item.size}</div>}
          {item.variant && <div className="text-sm text-gray-400 truncate">Вариант: {item.variant}</div>}
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="px-2 py-1 bg-gray-700 rounded text-lg"
            onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1, item.size, item.variant) : removeFromCart(item.id, item.size, item.variant)}
          >
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={e => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              if (val !== "" && parseInt(val, 10) > maxQty) val = maxQty.toString();
              setInputValue(val);
            }}
            onBlur={() => {
              const val = parseInt(inputValue, 10);
              if (isNaN(val) || val < 1) {
                setInputValue(item.quantity.toString());
              } else if (val > maxQty) {
                setInputValue(maxQty.toString());
                updateQuantity(item.id, maxQty, item.size, item.variant);
              } else {
                updateQuantity(item.id, val, item.size, item.variant);
              }
            }}
            className="w-12 text-center bg-transparent border-none outline-none focus:ring-0 text-lg appearance-none hide-number-arrows"
            style={{ boxShadow: 'none' }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                (e.target as HTMLInputElement).blur();
              }
            }}
            autoComplete="off"
          />
          <button
            className="px-2 py-1 bg-gray-700 rounded text-lg"
            onClick={() => item.quantity < maxQty && updateQuantity(item.id, item.quantity + 1, item.size, item.variant)}
            disabled={item.quantity >= maxQty}
          >+
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} ₽</span>
        <button
          className="text-xs text-red-400 hover:underline"
          onClick={() => removeFromCart(item.id, item.size, item.variant)}
        >Удалить</button>
      </div>
    </li>
  );
}

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Корзина</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center text-center text-lg gap-4">
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
            <mask id="mask0_84_176" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
              <rect width="32" height="32" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_84_176)">
              <path d="M8.41033 28.6667C7.73678 28.6667 7.16667 28.4334 6.7 27.9667C6.23333 27.5 6 26.9299 6 26.2564V11.077C6 10.4035 6.23333 9.83337 6.7 9.36671C7.16667 8.90004 7.73678 8.66671 8.41033 8.66671H11V8.33337C11 6.95226 11.488 5.7736 12.464 4.79737C13.4402 3.82137 14.6189 3.33337 16 3.33337C17.3811 3.33337 18.5598 3.82137 19.536 4.79737C20.512 5.7736 21 6.95226 21 8.33337V8.66671H23.5897C24.2632 8.66671 24.8333 8.90004 25.3 9.36671C25.7667 9.83337 26 10.4035 26 11.077V26.2564C26 26.9299 25.7667 27.5 25.3 27.9667C24.8333 28.4334 24.2632 28.6667 23.5897 28.6667H8.41033ZM8.41033 26.6667H23.5897C23.6923 26.6667 23.7863 26.6239 23.8717 26.5384C23.9572 26.453 24 26.359 24 26.2564V11.077C24 10.9744 23.9572 10.8804 23.8717 10.795C23.7863 10.7095 23.6923 10.6667 23.5897 10.6667H21V13.6667C21 13.9505 20.9042 14.188 20.7127 14.3794C20.5213 14.5709 20.2838 14.6667 20 14.6667C19.7162 14.6667 19.4787 14.5709 19.2873 14.3794C19.0958 14.188 19 13.9505 19 13.6667V10.6667H13V13.6667C13 13.9505 12.9042 14.188 12.7127 14.3794C12.5213 14.5709 12.2838 14.6667 12 14.6667C11.7162 14.6667 11.4787 14.5709 11.2873 14.3794C11.0958 14.188 11 13.9505 11 13.6667V10.6667H8.41033C8.30767 10.6667 8.21367 10.7095 8.12833 10.795C8.04278 10.8804 8 10.9744 8 11.077V26.2564C8 26.359 8.04278 26.453 8.12833 26.5384C8.21367 26.6239 8.30767 26.6667 8.41033 26.6667ZM13 8.66671H19V8.33337C19 7.4976 18.709 6.7886 18.127 6.20637C17.545 5.62437 16.836 5.33337 16 5.33337C15.164 5.33337 14.455 5.62437 13.873 6.20637C13.291 6.7886 13 7.4976 13 8.33337V8.66671Z" fill="#A3A3A3"/>
            </g>
          </svg>
          Ваша корзина пуста.<br />
          <Link href="/catalog" className="text-violet-600 hover:underline">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:underline"
            >
              Очистить корзину
            </button>
            <span className="text-xl font-semibold">Итого: {total.toLocaleString()} ₽</span>
          </div>
          <ul className="divide-y divide-gray-700 bg-[#18181B] rounded-lg shadow">
            {items.map((item) => (
              <CartItemRow
                key={item.id + (item.size || "") + (item.variant || "")}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </ul>
          <button
            className="w-full mt-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-lg font-bold rounded-lg shadow transition"
            onClick={() => alert("Оформление заказа пока не реализовано")}
          >
            Оформить заказ
          </button>
        </div>
      )}
    </div>
  );
} 