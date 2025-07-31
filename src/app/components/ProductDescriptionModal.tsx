"use client";

import { FC, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductDetails from "./ProductDetails";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string[];
  images: string[];
  variants: Array<{ name: string; images: string[] }>;
  sizes: Array<{ label: string; dimensions: string }>;
  price: number;
  oldPrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  article: string;
  composition: string;
  dimensions: string;
  weight: string;
  description: string;
  characteristics: Array<{ label: string; value: string }>;
}

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  size: string;
  variant: string;
  quantity: number;
  stock: number;
}

interface ProductDescriptionModalProps {
  show: boolean;
  onClose: () => void;
  product: Product;
  cartItem: CartItem | null;
  quantity: number;
  stock: number;
  handleAddToCart: () => void;
  handleChangeQuantity: (newQty: number) => void;
  handleBuyNow: () => void;
  removeFromCart: (id: string, size: string, variant: string) => void;
  productId: string;
  sizeLabel: string;
  variantName: string;
}

const ProductDescriptionModal: FC<ProductDescriptionModalProps> = ({
  show,
  onClose,
  product,
  cartItem,
  quantity,
  stock,
  handleAddToCart,
  handleChangeQuantity,
  handleBuyNow,
  removeFromCart,
  productId,
  sizeLabel,
  variantName,
}) => {
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [showMaxMsg, setShowMaxMsg] = useState(false);
  const maxQty = stock;
  const router = useRouter();

  // Блокировка скролла страницы при открытии модалки
  useEffect(() => {
    if (show) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "auto";
      };
    }
  }, [show]);

  // Синхронизация inputValue с quantity
  useEffect(() => {
    setInputValue(quantity.toString());
  }, [cartItem, quantity]);

  // Обработчик закрытия модалки с задержкой для анимации
  const handleClose = () => {
    setTimeout(() => {
      onClose();
    });
  };

  // Увеличение количества
  const handlePlusClick = () => {
    if (quantity < maxQty) {
      handleChangeQuantity(quantity + 1);
      if (quantity + 1 === maxQty) {
        setShowMaxMsg(true);
        setTimeout(() => setShowMaxMsg(false), 1500);
      }
    } else {
      setShowMaxMsg(true);
      setTimeout(() => setShowMaxMsg(false), 1500);
    }
  };

  // Уменьшение количества или удаление из корзины
  const handleMinusClick = () => {
    if (quantity > 1) {
      handleChangeQuantity(quantity - 1);
    } else if (cartItem) {
      removeFromCart(productId, sizeLabel, variantName);
    }
  };

  // Обработка ввода количества
  const handleInputBlur = () => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || val < 1) {
      setInputValue(quantity.toString());
    } else if (val >= maxQty) {
      setInputValue(maxQty.toString());
      handleChangeQuantity(maxQty);
      setShowMaxMsg(true);
      setTimeout(() => setShowMaxMsg(false), 1500);
    } else {
      setInputValue(val.toString());
      handleChangeQuantity(val);
    }
  };

  // Переход в корзину
  const handleGoToCart = () => {
    handleClose();
    router.push("/cart");
  };

  // Расчёт скидки
  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  return (
    <>
      <AnimatePresence>
        {show && (
          <div className="fixed inset-0 z-[100] flex items-stretch justify-end">
            {/* Фон с анимацией затемнения */}
            <motion.div
              className="absolute inset-0 bg-black/40 pointer-events-none"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            {/* Клик за пределами модалки для закрытия */}
            <div
              className="absolute inset-0 z-[90]"
              onClick={handleClose}
              aria-label="Закрыть модальное окно"
            />
            {/* Модальное окно */}
            <motion.div
              className="relative h-full max-w-[520px] w-full bg-[#181828] text-white shadow-2xl flex flex-col overflow-hidden z-[100] min-w-[320px]"
              initial={{ x: "100%", opacity: 0.3 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#181828] z-20 flex items-center justify-between px-8 py-6">
                <h2 className="text-2xl font-bold">
                  Характеристики и описание
                </h2>
                <button
                  onClick={handleClose}
                  aria-label="Закрыть"
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-8 pb-6 custom-scroll">
                <div className="mb-6">
                  <span className="block text-lg font-semibold mb-2">
                    Основная информация
                  </span>
                  <ProductDetails characteristics={product.characteristics} />
                </div>
                <div className="mb-6">
                  <span className="block text-lg font-semibold mb-2">
                    Описание
                  </span>
                  <div className="text-base text-white/90 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 left-0 w-full bg-[#181828] px-8 pt-6 pb-8 flex flex-col gap-3 shadow-[0_-10px_200px_rgba(0,0,0,0.6)] z-10">
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className={`font-semibold text-3xl leading-none tracking-wide ${
                      product.oldPrice ? "text-[#FF5656]" : "text-white"
                    }`}
                  >
                    {product.price.toLocaleString()} ₽
                  </span>
                  {product.oldPrice && (
                    <>
                      <span className="line-through text-white/60 font-semibold text-base mt-2">
                        {product.oldPrice.toLocaleString()} ₽
                      </span>
                      <span className="bg-[#FF5656] text-white font-semibold text-sm rounded-lg px-2 py-0.5 mt-1">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>

                {!cartItem ? (
                  <div className="flex flex-row items-center justify-between gap-4 w-full">
                    <button
                      onClick={handleBuyNow}
                      className="flex-1 min-h-[52px] bg-[#EA698B]/25 hover:bg-[#EA698B]/40 rounded-2xl text-[#EA698B] font-semibold text-lg flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      Купить сейчас
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 min-h-[52px] bg-[#EA698B] hover:bg-[#d65f7f] rounded-2xl text-white font-semibold text-lg flex items-center justify-center gap-3 shadow-lg transition-colors cursor-pointer"
                    >
                      <Image
                        src="/icons/local_mall.svg"
                        alt="Cart Icon"
                        width={26}
                        height={26}
                      />
                      В корзину
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-between gap-4 w-full min-h-[52px]">
                    <button
                      onClick={handleGoToCart}
                      className="h-[52px] min-w-[220px] px-4 flex items-center justify-center bg-[#EA698B]/25 hover:bg-[#EA698B]/40 rounded-2xl text-[#EA698B] font-semibold text-lg whitespace-nowrap text-center shadow-md transition-colors cursor-pointer"
                    >
                      Перейти в корзину
                    </button>
                    <div className="flex flex-col items-center relative">
                      <AnimatePresence>
                        {showMaxMsg && (
                          <motion.div
                            className="absolute left-1/2 -translate-x-1/2 mb-4 bottom-full z-10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="relative">
                              <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-10 border-l-transparent border-r-transparent border-t-[#23232B]" />
                              <div className="bg-[#23232B] text-white text-sm rounded-xl px-4 py-3 shadow-lg min-w-[220px] text-center">
                                Выбрано максимальное количество, доступное для
                                заказа
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex flex-row items-center gap-0 bg-[#23232B] rounded-xl px-2 py-1 h-[52px] min-w-[120px]">
                        <button
                          onClick={handleMinusClick}
                          className={`w-12 h-10 rounded-xl text-white font-bold text-2xl flex items-center justify-center transition-colors cursor-pointer ${
                            quantity <= 1
                              ? "bg-[#FF5656] hover:bg-[#e04d4d]"
                              : "bg-[#EA698B] hover:bg-[#d65f7f]"
                          } disabled:bg-[#FF5656] disabled:opacity-70`}
                          disabled={quantity <= 1 && !cartItem}
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
                          className="text-2xl w-16 text-center text-white select-none bg-transparent border-none outline-none focus:ring-0 appearance-none"
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
                          className={`w-12 h-10 bg-[#EA698B] hover:bg-[#d65f7f] rounded-xl text-white font-bold text-2xl flex items-center justify-center transition-colors cursor-pointer ${
                            quantity >= maxQty
                              ? "opacity-60 cursor-not-allowed"
                              : ""
                          }`}
                          tabIndex={0}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #444;
          border-radius: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background-color: #666;
        }
      `}</style>
    </>
  );
};

export default ProductDescriptionModal;
