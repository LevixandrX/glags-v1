import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NoImagePlaceholder from "./NoImagePlaceholder";
import React from "react";
import { products } from '../catalog/products-mock';
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    image: string;
    price: number;
    oldPrice?: number;
    size?: string;
    variant?: string;
    quantity: number;
    stock?: number;
  };
  removeFromCart: (id: string, size?: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, variant?: string) => void;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

export default function CartItem({
  item,
  removeFromCart,
  updateQuantity,
  isSelected = false,
  onToggleSelect
}: CartItemProps) {
  const [hasImage, setHasImage] = useState(true);
  const [inputValue, setInputValue] = useState(item.quantity.toString());
  const [showMaxMsg, setShowMaxMsg] = useState(false);

  // Синхронизируем inputValue, если количество меняется извне
  React.useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const maxQty = typeof item.stock === 'number' ? item.stock : 9999;

  const handlePlusClick = () => {
    if (item.quantity < maxQty) {
      updateQuantity(item.id, item.quantity + 1, item.size, item.variant);
      if (item.quantity + 1 === maxQty) {
        setShowMaxMsg(true);
        setTimeout(() => setShowMaxMsg(false), 1500);
      }
    } else {
      setShowMaxMsg(true);
      setTimeout(() => setShowMaxMsg(false), 1500);
    }
  };

  const handleInputBlur = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || val < 1) {
      setInputValue(item.quantity.toString());
    } else if (val >= maxQty) {
      setInputValue(maxQty.toString());
      updateQuantity(item.id, maxQty, item.size, item.variant);
      setShowMaxMsg(true);
      setTimeout(() => setShowMaxMsg(false), 1500);
    } else {
      updateQuantity(item.id, val, item.size, item.variant);
    }
  };

  // Получаем slug по id
  const productData = products.find((p) => p.id === item.id);
  const slug = productData ? productData.slug : item.id;
  let href = `/catalog/${item.id}`;
  if (slug) href = `/catalog/${slug}`;
  const params = [];
  if (item.size) params.push(`size=${encodeURIComponent(item.size.replace(/[^0-9]/g, ''))}`);
  if (item.variant) params.push(`variant=${encodeURIComponent(item.variant)}`);
  if (params.length) href += `?${params.join('&')}`;

  return (
    <div className="relative">
      {onToggleSelect && (
        <label className="absolute top-4 left-4 z-10 cursor-pointer">
          <div className="relative w-6 h-6">
                           <input
                 type="checkbox"
                 checked={isSelected}
                 onChange={onToggleSelect}
                 className="w-6 h-6 bg-gray-700 hover:bg-gray-600 border-2 border-gray-500 hover:border-gray-400 rounded-lg focus:ring-0 appearance-none transition-colors cursor-pointer"
               />
               {isSelected && (
                 <div className="absolute inset-0 bg-violet-600 hover:bg-violet-500 border-2 border-violet-600 hover:border-violet-500 rounded-lg flex items-center justify-center">
                   <Check className="w-4 h-4 text-white" strokeWidth={3} />
                 </div>
               )}
          </div>
        </label>
      )}

      {/* Кнопка удаления в правом нижнем углу */}
      <button
        className="absolute bottom-4 right-4 z-10 text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10 cursor-pointer"
        onClick={() => removeFromCart(item.id, item.size, item.variant)}
        title="Удалить из корзины"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

             <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-700/30 transition-all duration-200 cart-transition cart-item-enter">
        <div className="flex gap-4">
          {/* Изображение товара */}
          <Link href={href} className="flex-shrink-0" tabIndex={-1}>
            <div className="relative w-24 h-24 bg-gray-700 rounded-lg overflow-hidden">
              {hasImage && item.image && item.image !== "" ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  onError={() => setHasImage(false)}
                />
              ) : (
                <NoImagePlaceholder
                  width={96}
                  height={96}
                  iconSize={32}
                  textSize="12px"
                  textPadding="4px 0 0 0"
                  bgColor="#374151"
                  textAlign="center"
                />
              )}
            </div>
          </Link>

          {/* Информация о товаре и управление */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <Link href={href} className="block">
                  <h3 className="font-medium text-gray-100 text-base leading-tight line-clamp-2 hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </Link>

                {/* Атрибуты товара */}
                <div className="mt-2 space-y-1">
                  {item.size && (
                    <div className="text-sm text-gray-400">Размер: {item.size}</div>
                  )}
                  {item.variant && (
                    <div className="text-sm text-gray-400">Вариант: {item.variant}</div>
                  )}
                  {item.stock && item.stock < 10 && (
                    <div className="flex items-center text-[#FF5656] font-semibold text-sm">
                      <span className="flex items-center mr-2">
                        <span
                          className="h-[6px] w-[6px] rounded-full bg-[#FF5656]"
                          style={{
                            animation: "pulse-dot 1.5s infinite ease-in-out",
                          }}
                        ></span>
                      </span>
                      осталось {item.stock} шт.
                      <style jsx>{`
                           @keyframes pulse-dot {
                             0% {
                               transform: scale(1);
                               opacity: 0.9;
                               box-shadow: 0 0 0 0 rgba(255, 86, 86, 0.4);
                             }
                             50% {
                               transform: scale(1.1);
                               opacity: 1;
                               box-shadow: 0 0 4px 2px rgba(255, 86, 86, 0.5);
                             }
                             100% {
                               transform: scale(1);
                               opacity: 0.9;
                               box-shadow: 0 0 0 0 rgba(255, 86, 86, 0.4);
                             }
                           }
                         `}</style>
                    </div>
                  )}
                </div>

              </div>

              {/* Счетчик и цена */}
              <div className="flex items-start gap-12">
                {/* Счетчик количества */}
                <div className="flex flex-col items-center relative">
                  <div className="flex items-center gap-0 bg-[#23232B] rounded-xl px-2 py-1 h-[40px] min-w-[100px]">
                    <button
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.id, item.quantity - 1, item.size, item.variant)
                          : removeFromCart(item.id, item.size, item.variant)
                      }
                      className={`w-8 h-7 rounded-lg text-white font-bold text-lg flex items-center justify-center transition-colors cursor-pointer
                            ${item.quantity < 2
                          ? "bg-[#FF5656] hover:bg-[#e04d4d]"
                          : "bg-[#EA698B] hover:bg-[#d65f7f]"
                        }
                            disabled:bg-[#FF5656] disabled:opacity-70`}
                      disabled={item.quantity <= 1}
                    >
                      –
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={inputValue}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, "");
                        if (val !== "" && parseInt(val, 10) > maxQty)
                          val = maxQty.toString();
                        setInputValue(val);
                      }}
                      onBlur={handleInputBlur}
                      className="text-lg w-12 text-center text-white select-none bg-transparent border-none outline-none focus:ring-0 appearance-none hide-number-arrows"
                      style={{ boxShadow: "none" }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          (e.target as HTMLInputElement).blur();
                        }
                      }}
                      autoComplete="off"
                    />
                    <button
                      onClick={handlePlusClick}
                      className={`w-8 h-7 bg-[#EA698B] hover:bg-[#d65f7f] transition-colors rounded-lg text-white font-bold text-lg flex items-center cursor-pointer justify-center${item.quantity >= maxQty ? " opacity-60 cursor-not-allowed" : ""
                        }`}
                      tabIndex={0}
                    >
                      +
                    </button>
                  </div>
                  {/* Цена за штуку под счетчиком */}
                  <div className="text-center mt-2">
                    <div className="text-sm text-gray-400">
                      {item.price.toLocaleString()} ₽ / шт
                    </div>
                  </div>
                  <AnimatePresence>
                    {showMaxMsg && (
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 mt-16 z-10"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="relative">
                          <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-[#23232B]" />
                          <div className="bg-[#23232B] text-white text-sm rounded-xl px-4 py-3 shadow-lg min-w-[220px] text-center">
                            Выбрано максимальное количество, доступное для заказа
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Цены */}
                <div className="text-right flex flex-col">
                  <div className={`text-xl font-semibold ${item.oldPrice ? "text-[#FF5656]" : "text-white"}`}>
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </div>
                  {item.oldPrice && (
                    <div className="text-base text-gray-400 line-through">
                      {(item.oldPrice * item.quantity).toLocaleString()} ₽
                    </div>
                  )}
                  {/* Пустое место для выравнивания, если нет старой цены */}
                  {!item.oldPrice && <div className="text-base text-transparent">0 ₽</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 