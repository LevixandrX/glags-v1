"use client";

import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { useCart } from "./CartContext";
import NoImagePlaceholder from "./NoImagePlaceholder";
import { products } from '../catalog/products-mock';

// Типизация пропсов
export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  size: string;
  count: number;
}

export default function ProductCard({
  id,
  title,
  price,
  oldPrice,
  discount,
  image,
  size,
  count,
}: Product) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const productData = products.find((p) => p.id === id);
  const slug = productData ? productData.slug : id;
  const firstVariant = productData && productData.variants && productData.variants.length > 0 ? productData.variants[0].name : undefined;
  // Формируем ссылку с query-параметрами для размера и варианта
  let href = `/catalog/${slug}`;
  const params = [];
  // size только число
  if (size) params.push(`size=${encodeURIComponent(size.replace(/[^0-9]/g, ''))}`);
  if (firstVariant) params.push(`variant=${encodeURIComponent(firstVariant)}`);
  if (params.length) href += `?${params.join('&')}`;

  // Ищем товар в корзине по id и size (варианты не используются в карточке)
  const cartItem = items.find(
    (i) => i.id === id && i.size === size && (firstVariant ? i.variant === firstVariant : true)
  );
  const inCart = !!cartItem;
  const quantity = cartItem?.quantity || 1;

  const [hasImage, setHasImage] = useState(true);

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      image,
      price,
      size,
      quantity: 1,
      stock: count,
      ...(firstVariant ? { variant: firstVariant } : {}),
    });
  };

  const handleDecrease = () => {
    if (cartItem && quantity > 1) {
      updateQuantity(id, quantity - 1, size);
    } else if (cartItem) {
      removeFromCart(id, size);
    }
  };

  const handleIncrease = () => {
    if (cartItem && quantity < count) {
      updateQuantity(id, quantity + 1, size);
    }
  };

  const handleImageError = () => {
    setHasImage(false);
  };

  return (
    <div className="rounded-xl w-[220px] p-3 flex flex-col items-center text-white">
      <Link href={href}>
        <div className="relative w-[196px] h-[196px] mb-2">
          {hasImage && image ? (
            <Image
              src={image}
              alt={title || "Изображение товара"}
              fill
              className="object-cover rounded-[10px]"
              onError={handleImageError}
            />
          ) : (
            <NoImagePlaceholder width={196} height={196} iconSize={40} textSize="13px" textPadding="2px 0 0 0" bgColor="#D9D9D9" />
          )}
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
          <div className="absolute top-7 right-1 bg-[#FF5656] text-white text-xs font-bold px-2.5 py-0.5 rounded-[5px]">
            {count} шт.
          </div>
        </div>
      </Link>
      <Link href={href}>
        <h3 className="text-left text-lg font-bold leading-tight mb-1 w-full min-h-[3rem] line-clamp-2 break-words" style={{textAlign: 'left', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
          {title}
        </h3>
      </Link>
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
      <div className="w-full flex justify-center">
        {!inCart ? (
          <button
            onClick={handleAddToCart}
            className="bg-[#EA698B] text-white text-base font-semibold w-full h-9 py-1 rounded-[12px] flex items-center justify-center gap-2 hover:bg-[#d65f7f] transition-colors"
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