"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard() {
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [hasImage, setHasImage] = useState(true);

  const handleAddToCart = () => {
    setInCart(true);
    setQuantity(1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setInCart(false);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleImageError = () => {
    setHasImage(false);
  };

  return (
    <div className="rounded-xl w-[220px] p-3 flex flex-col items-center text-white">
      {/* Фото и бейджи */}
      <div className="relative w-[196px] h-[196px] mb-2">
        {/* Квадратный фон под фото */}
        <div className="absolute inset-[-2px] bg-[#D9D9D9] rounded-[12px]"></div>

        {/* Изображение или заглушка */}
        {hasImage ? (
          <Image
            src="/card-image1.png"
            alt="Product"
            fill
            className="object-cover rounded-[10px]"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 rounded-[10px] flex flex-col items-center justify-center text-[#575757]">
            <Image
              src="/icons/no-image1.svg"
              alt="No Image Icon"
              width={50}
              height={50}
              className="mb-2 opacity-60"
            />
            <p className="text-sm font-medium z-0">Нет изображения</p>
          </div>
        )}

        {/* Размер */}
        <div className="absolute top-1 right-1 bg-[#6E44FF] text-white text-xs font-bold px-1.5 py-0.5 pr-2 rounded-[5px] flex items-center gap-1">
          <Image
            src="/icons/open_in_full.svg"
            alt="Size Icon"
            width={13}
            height={13}
            className="pl-0.5"
          />
          40 см
        </div>

        {/* Кол-во */}
        <div className="absolute top-7 right-1 bg-[#FF5656] text-white text-xs font-bold px-2.5 py-0.5 rounded-[5px]">
          1 шт.
        </div>
      </div>

      {/* Название */}
      <h3 className="text-left text-lg font-bold leading-tight mb-1 w-full min-h-[3rem] line-clamp-2 break-words">
        Фигурка Дракончик
      </h3>

      {/* Цена и скидка */}
      <div className="w-full mb-2">
        <div className="flex flex-row items-start justify-start gap-2">
          <p className="text-[#FF5656] text-lg font-bold">
            2 300 <span className="text-lg font-normal">₽</span>
          </p>
          <span className="line-through text-white/60 text-[11px] translate-y-2">
            2 900 ₽
          </span>
          <span className="bg-[#FF5656] px-1.5 py-0.5 rounded-[7px] text-white text-xs font-bold">
            -25%
          </span>
        </div>
      </div>

      {/* Кнопка или количество */}
      <div className="w-full flex justify-center">
        {!inCart ? (
          <button
            onClick={handleAddToCart}
            className="bg-[#EA698B] text-white text-base font-semibold w-full py-1 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#d65f7f] transition-colors"
          >
            <Image
              src="/icons/local_mall.svg"
              alt="Cart Icon"
              width={18}
              height={18}
            />
            В корзину
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleDecrease}
              className={`text-white text-lg font-semibold w-12 h-9 rounded-xl flex items-center justify-center leading-none transition-colors ${
                quantity < 2
                  ? "bg-[#FF5656] hover:bg-[#e04d4d]"
                  : "bg-[#EA698B] hover:bg-[#d65f7f]"
              }`}
            >
              -
            </button>
            <span className="text-lg w-19 text-center">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="bg-[#EA698B] text-white text-lg font-semibold w-12 h-9 rounded-xl hover:bg-[#d65f7f] flex items-center justify-center leading-none"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}