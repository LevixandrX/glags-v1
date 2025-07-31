import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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

interface AddToCartCardProps {
  price: number;
  oldPrice?: number;
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

const AddToCartCard: React.FC<AddToCartCardProps> = ({
  price,
  oldPrice,
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
  const discount = oldPrice
    ? Math.round(100 - (price / oldPrice) * 100)
    : undefined;
  const maxQty = stock;
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [showMaxMsg, setShowMaxMsg] = useState(false);

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

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
      handleChangeQuantity(val);
    }
  };

  return (
    <div className="w-full max-w-[480px] min-w-[460px] bg-[#0F0F0F] rounded-[52px] shadow-[0_0_100px_35px_rgba(64,38,154,0.25)] flex flex-col items-center px-5 pt-12 pb-7 mx-auto select-none">
      {/* Цена и скидка */}
      <div className="mb-16 ml-5 self-start">
        <div className="flex items-start gap-3 flex-wrap">
          <span
            className={`font-semibold text-4xl leading-none tracking-wide ${
              oldPrice || discount ? "text-[#FF5656]" : "text-white"
            }`}
          >
            {price.toLocaleString()} <span className="text-4xl">₽</span>
          </span>
          {typeof oldPrice === "number" && (
            <span className="line-through text-white/60 font-semibold text-base mt-4">
              {oldPrice.toLocaleString()} ₽
            </span>
          )}
          {discount && (
            <span className="bg-[#FF5656] text-white font-semibold text-xl rounded-[8px] px-3 py-0.5 mt-1">
              -{discount}%
            </span>
          )}
        </div>
      </div>
      {/* Кнопки и счетчик */}
      <div className="w-full flex flex-col gap-5 max-w-[400px] mx-auto">
        {!cartItem ? (
          <button
            onClick={handleAddToCart}
            className="w-full min-h-[52px] bg-[#EA698B] hover:bg-[#d65f7f] transition-colors rounded-2xl text-white font-medium text-xl flex items-center justify-center gap-3 shadow-lg cursor-pointer"
          >
            <Image
              src="/icons/local_mall.svg"
              alt="Cart Icon"
              width={26}
              height={26}
            />
            Добавить в корзину
          </button>
        ) : (
          <div className="flex flex-row items-center justify-between gap-4 w-full min-h-[52px]">
            <a
              href="/cart"
              className="h-[52px] px-4 flex items-center justify-center bg-[#EA698B]/25 hover:bg-[#EA698B]/40 transition-colors rounded-2xl text-[#EA698B] font-medium text-lg whitespace-nowrap text-center shadow-md"
            >
              Перейти в корзину
            </a>
            <div className="flex flex-col items-center relative">
              <div className="flex flex-row items-center gap-0 bg-[#23232B] rounded-xl px-2 py-1 h-[52px] min-w-[120px]">
                <button
                  onClick={() =>
                    quantity > 1
                      ? handleChangeQuantity(quantity - 1)
                      : cartItem &&
                        removeFromCart(productId, sizeLabel, variantName)
                  }
                  className={`w-12 h-10 rounded-xl text-white font-bold text-2xl flex items-center justify-center transition-colors cursor-pointer
                    ${
                      quantity < 2
                        ? "bg-[#FF5656] hover:bg-[#e04d4d]"
                        : "bg-[#EA698B] hover:bg-[#d65f7f]"
                    }
                    disabled:bg-[#FF5656] disabled:opacity-70`}
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
                  className="text-2xl w-16 text-center text-white select-none bg-transparent border-none outline-none focus:ring-0 appearance-none hide-number-arrows"
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
                  className={`w-12 h-10 bg-[#EA698B] hover:bg-[#d65f7f] transition-colors rounded-xl text-white font-bold text-2xl flex items-center cursor-pointer justify-center${
                    quantity >= maxQty ? " opacity-60 cursor-not-allowed" : ""
                  }`}
                  tabIndex={0}
                >
                  +
                </button>
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
          </div>
        )}
        <button
          onClick={handleBuyNow}
          className="w-full min-h-[52px] bg-[#EA698B]/25 hover:bg-[#EA698B]/40 transition-colors rounded-2xl text-[#EA698B] font-medium text-xl flex items-center justify-center mb-7 gap-3 shadow-md cursor-pointer"
        >
          Купить сейчас
        </button>
      </div>
      {/* Остаток */}
      {stock < 5 && (
        <div className="flex items-center justify-center text-[#FF5656] font-semibold text-xl mb-2 text-center">
          <span className="flex items-center mr-2">
            <span
              className="h-[10px] w-[10px] rounded-full bg-[#FF5656]"
              style={{
                animation: "pulse-dot 1.5s infinite ease-in-out",
              }}
            ></span>
          </span>
          осталось {stock} шт.
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
  );
};

export default AddToCartCard;