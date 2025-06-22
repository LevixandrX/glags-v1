"use client";

import Image from "next/image";
import { useState } from "react";

// Типизация пропсов
interface ProductCardProps {
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  size: string;
  count: number;
  isLastVisible?: boolean;
  isFirstVisible?: boolean;
  isLastOverall?: boolean; // Новый проп для последней карточки
}

export default function ProductCard({
  title,
  price,
  oldPrice,
  discount,
  image,
  size,
  count,
  isLastVisible,
  isFirstVisible,
  isLastOverall,
}: ProductCardProps) {
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

  const getCardStyle = () => {
    if (isLastVisible && !isLastOverall) {
      return {
        maskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)",
        webkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)",
      };
    }
    if (isFirstVisible) {
      return {
        maskImage: "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)",
        webkitMaskImage: "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)",
      };
    }
    return {};
  };

  return (
    <div
      className={`rounded-xl w-[220px] p-3 flex flex-col items-center text-white ${
        isLastVisible && !isLastOverall ? "last-slide-gradient" : ""
      } ${isFirstVisible ? "first-slide-gradient" : ""}`}
      style={getCardStyle()}
    >
      {/* Фото и бейджи */}
      <div className="relative w-[196px] h-[196px] mb-2">
        {/* Квадратный фон под фото */}
        <div className="absolute inset-[-2px] bg-[#D9D9D9] rounded-[12px]"></div>

        {/* Изображение или заглушка */}
        {hasImage && image ? (
          <Image
            src={image}
            alt={title || "Изображение товара"}
            fill
            className="object-cover rounded-[10px]"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-gray-700 rounded-[10px] flex flex-col items-center justify-center text-[#575757]">
            <Image
              src="/icons/no-image1.svg"
              alt="Нет изображения"
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
          {size}
        </div>

        {/* Кол-во */}
        <div className="absolute top-7 right-1 bg-[#FF5656] text-white text-xs font-bold px-2.5 py-0.5 rounded-[5px]">
          {count} шт.
        </div>
      </div>

      {/* Название */}
      <h3 className="text-left text-lg font-bold leading-tight mb-1 w-full min-h-[3rem] line-clamp-2 break-words">
        {title}
      </h3>

      {/* Цена и скидка */}
      <div className="w-full mb-2">
        <div className="flex flex-row items-start justify-start gap-2">
          <p className="text-[#FF5656] text-lg font-bold">
            {typeof price === "number" ? price.toLocaleString() : "-"} <span className="text-lg font-normal">₽</span>
          </p>
          {typeof oldPrice === "number" && (
            <span className="line-through text-white/60 text-[11px] translate-y-2">
              {oldPrice.toLocaleString()} ₽
            </span>
          )}
          {discount && (
            <span className="bg-[#FF5656] px-1.5 py-0.5 rounded-[7px] text-white text-xs font-bold">
              -{discount}%
            </span>
          )}
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