"use client";
import Image from 'next/image';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { products } from '../products-mock';
import { notFound } from 'next/navigation';
import { useCart } from '../../components/CartContext';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import NoImagePlaceholder from "../../components/NoImagePlaceholder";

export default function Page() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = products.find((item) => item.id === params.id || item.slug === params.id);
  if (!product) notFound();

  // --- Выбор варианта и размера по query ---
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  useEffect(() => {
    const variantParam = searchParams.get('variant');
    if (variantParam) {
      const idx = product.variants.findIndex(v => v.name === variantParam);
      if (idx !== -1) setSelectedVariant(idx);
    }
    const sizeParam = searchParams.get('size');
    if (sizeParam) {
      const idx = product.sizes.findIndex(s => s.label.replace(/[^0-9]/g, '') === sizeParam.replace(/[^0-9]/g, ''));
      if (idx !== -1) setSelectedSize(idx);
    }
    // eslint-disable-next-line
  }, [product]);

  // --- Обновление URL при изменении варианта/размера ---
  useEffect(() => {
    const variant = product.variants[selectedVariant]?.name;
    const size = product.sizes[selectedSize]?.label;
    const paramsArr = [];
    if (size) paramsArr.push(`size=${encodeURIComponent(size)}`);
    if (variant) paramsArr.push(`variant=${encodeURIComponent(variant)}`);
    const query = paramsArr.length ? `?${paramsArr.join('&')}` : '';
    router.replace(`/catalog/${product.slug}${query}`);
    // eslint-disable-next-line
  }, [selectedVariant, selectedSize]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [showBuyNow, setShowBuyNow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const images = product.variants[selectedVariant]?.images || product.images;
  const [hasMainImage, setHasMainImage] = useState(true);
  const [hasThumbs, setHasThumbs] = useState(Array(images.length).fill(true));

  useEffect(() => {
    setHasMainImage(true);
    setHasThumbs(Array(images.length).fill(true));
  }, [selectedVariant, selectedSize]);

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const stock = product.stock;
  const sizeLabel = product.sizes[selectedSize]?.label;
  const variantName = product.variants[selectedVariant]?.name;

  const cartItem = items.find(
    (i) => i.id === product.id && i.size === sizeLabel && i.variant === variantName
  );

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity);
    else setQuantity(1);
  }, [cartItem, selectedVariant, selectedSize]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      image: images[0],
      price: product.price,
      size: sizeLabel,
      variant: variantName,
      quantity: 1,
      stock: stock,
    });
  };

  const handleChangeQuantity = (newQty: number) => {
    if (cartItem && newQty > 0 && newQty <= stock) {
      updateQuantity(product.id, newQty, sizeLabel, variantName);
    }
  };

  const handleBuyNow = () => setShowBuyNow(true);
  const handleCloseModal = () => setShowBuyNow(false);

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-6 max-w-7xl mx-auto text-white">
      {/* Левая часть: слайдер фото */}
      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-full max-w-[420px] aspect-square bg-white rounded-2xl shadow-xl overflow-hidden mb-4">
          {hasMainImage && images[selectedImage] && images[selectedImage] !== "" ? (
            <Image
              src={images[selectedImage]}
              alt={product.title}
              fill
              className="object-contain transition-all duration-300"
              priority
              onError={() => setHasMainImage(false)}
            />
          ) : (
            <NoImagePlaceholder width={420} height={420} iconSize={80} textSize="20px" bgColor="#D9D9D9" />
          )}
          {/* Стрелки */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
            onClick={() => setSelectedImage((prev) => prev > 0 ? prev - 1 : images.length - 1)}
            aria-label="Предыдущее фото"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
            onClick={() => setSelectedImage((prev) => prev < images.length - 1 ? prev + 1 : 0)}
            aria-label="Следующее фото"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        {/* Миниатюры */}
        <div className="flex gap-2 mt-2">
          {images.length > 0 ? images.map((img, idx) => (
            <button
              key={img || idx}
              className={clsx(
                'w-16 h-16 rounded-xl overflow-hidden border-2 transition-all',
                idx === selectedImage ? 'border-violet-500 scale-105 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100')}
              onClick={() => setSelectedImage(idx)}
              aria-label={`Фото ${idx + 1}`}
            >
              {hasThumbs[idx] && img && img !== "" ? (
                <Image src={img} alt={product.title} width={64} height={64} className="object-contain" onError={() => setHasThumbs((prev) => prev.map((v, i) => i === idx ? false : v))} />
              ) : (
                <NoImagePlaceholder width={64} height={64} iconSize={20} textSize="10px" textPadding="0" bgColor="#D9D9D9" />
              )}
            </button>
          )) : (
            <NoImagePlaceholder width={64} height={64} iconSize={20} textSize="10px" textPadding="0" bgColor="#D9D9D9" />
          )}
        </div>
      </div>
      {/* Правая часть: инфо о товаре */}
      <div className="flex-1 flex flex-col gap-6 max-w-xl mx-auto">
        {/* Хлебные крошки */}
        <div className="text-sm text-gray-400 mb-2">
          {product.category.join(' / ')}
        </div>
        {/* Название и рейтинг */}
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-bold text-white mb-1">{product.title}</h1>
          <span className="flex items-center gap-1 text-yellow-400 text-lg font-semibold">
            ★ {product.rating}
          </span>
          <span className="text-gray-400 text-base">• {product.reviewsCount} оценок</span>
        </div>
        {/* Варианты */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-300">Варианты:</span>
          {product.variants.map((variant, idx) => (
            <button
              key={variant.name}
              className={clsx(
                'rounded-lg border px-3 py-1 text-base font-medium transition-all',
                idx === selectedVariant ? 'border-violet-500 bg-violet-700 shadow-md scale-105' : 'border-gray-600 bg-gray-800 hover:border-violet-400')}
              onClick={() => {
                setSelectedVariant(idx);
                setSelectedImage(0);
              }}
            >
              {variant.name}
            </button>
          ))}
        </div>
        {/* Размеры */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-300">Размеры:</span>
          {product.sizes.map((size, idx) => (
            <button
              key={size.label}
              className={clsx(
                'rounded-full border px-4 py-1 text-base font-medium transition-all',
                idx === selectedSize ? 'border-violet-500 bg-violet-700 shadow-md scale-105' : 'border-gray-600 bg-gray-800 hover:border-violet-400')}
              onClick={() => setSelectedSize(idx)}
            >
              {size.label}
            </button>
          ))}
        </div>
        {/* Характеристики */}
        <div className="text-base text-gray-300 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
          {product.characteristics.map((c) => (
            <div key={c.label} className="flex gap-2">
              <span className="w-32 text-gray-400">{c.label}:</span>
              <span>{c.value}</span>
            </div>
          ))}
        </div>
        {/* Описание */}
        <div className="mt-2">
          <button
            className="text-gray-300 border border-gray-600 rounded px-3 py-1 text-base mb-1 hover:bg-gray-700 transition"
            onClick={() => setShowDescription((v) => !v)}
          >
            {showDescription ? 'Скрыть описание' : 'Показать описание'}
          </button>
          {showDescription && (
            <div className="text-gray-200 text-base mt-2 bg-black/40 rounded-xl p-4 shadow-inner animate-fade-in">
              {product.description}
            </div>
          )}
        </div>
        {/* Блок с ценой и кнопками */}
        <div className="w-full bg-black/70 rounded-2xl p-6 flex flex-col gap-4 items-center shadow-2xl mt-4">
          <div className="flex items-end gap-3 flex-wrap">
            <span className="text-4xl font-bold text-pink-400">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-xl text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₽</span>
            )}
            {product.oldPrice && (
              <span className="ml-2 text-base bg-pink-600 text-white rounded px-2 py-0.5 font-bold">-{Math.round(100 - (product.price / product.oldPrice) * 100)}%</span>
            )}
          </div>
          <div className="flex gap-3 w-full">
            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 text-lg transition shadow-lg"
              >
                В корзину
              </button>
            ) : (
              <div className="flex-1 flex items-center justify-center gap-3">
                <button
                  onClick={() => quantity > 1 ? handleChangeQuantity(quantity - 1) : (cartItem && removeFromCart(product.id, sizeLabel, variantName))}
                  className="text-white text-2xl font-semibold w-12 h-12 rounded-xl flex items-center justify-center leading-none transition-colors bg-pink-400 hover:bg-pink-500"
                  disabled={quantity <= 1 && !cartItem}
                >
                  -
                </button>
                <span className="text-2xl w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleChangeQuantity(quantity + 1)}
                  className="text-white text-2xl font-semibold w-12 h-12 rounded-xl flex items-center justify-center leading-none transition-colors bg-pink-400 hover:bg-pink-500"
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            )}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg py-3 text-lg transition shadow-lg"
            >
              Купить сейчас
            </button>
          </div>
          {stock < 5 && (
            <div className="text-red-400 text-center text-base font-semibold">осталось {stock} шт.</div>
          )}
        </div>
      </div>
      {/* Модальное окно "Купить сейчас" */}
      {showBuyNow && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-black shadow-2xl relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl"
              onClick={handleCloseModal}
              aria-label="Закрыть"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Оформление заказа</h2>
            <div className="mb-4">Тут будет форма оформления заказа или заглушка.</div>
            <button
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg py-3 text-lg transition"
              onClick={handleCloseModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 