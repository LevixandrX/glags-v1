"use client";
import { useState, useEffect, useRef, useContext, useMemo } from 'react';
import { products } from '../catalog/products-mock';
import { notFound, useParams, useSearchParams, useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import type { Swiper as SwiperType } from "swiper";
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import AddToCartCard from './AddToCartCard';
import ProductDescriptionModal from './ProductDescriptionModal';
import Breadcrumbs from "./Breadcrumbs";
import { ModalContext } from './ModalContext'; // Исправленный импорт

// Определяем тип для ModalContext
interface ModalContextType {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export default function ProductPageContent() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const product = products.find((item) => item.id === params.id || item.slug === params.id);
  if (!product) notFound();

  // Выбор варианта и размера по query
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
  }, [product, searchParams, product.variants, product.sizes]);

  // Обновление URL при изменении варианта/размера
  useEffect(() => {
    const variant = product.variants[selectedVariant]?.name;
    const size = product.sizes[selectedSize]?.label;
    const paramsArr = [];
    if (size) paramsArr.push(`size=${encodeURIComponent(size)}`);
    if (variant) paramsArr.push(`variant=${encodeURIComponent(variant)}`);
    const query = paramsArr.length ? `?${paramsArr.join('&')}` : '';
    router.replace(`/catalog/${product.slug}${query}`);
  }, [selectedVariant, selectedSize, product.sizes, product.slug, product.variants, router]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const images = (product.variants[selectedVariant]?.images || product.images) ?? [];
  const [hasMainImage, setHasMainImage] = useState(true);
  const [hasThumbs, setHasThumbs] = useState(Array(images.length).fill(true));
  const [isThumbsSliding, setIsThumbsSliding] = useState(false);
  const [isThumbsEnd, setIsThumbsEnd] = useState(false);
  const [thumbsIndex, setThumbsIndex] = useState(0);
  const thumbsSwiperRef = useRef<SwiperType | null>(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const { setShowModal } = useContext(ModalContext) as ModalContextType; // Добавляем типизацию

  // Синхронизация миниатюрного слайдера с главным изображением
  useEffect(() => {
    if (thumbsSwiperRef.current && typeof thumbsSwiperRef.current.slideTo === 'function') {
      thumbsSwiperRef.current.slideTo(selectedImage);
    }
  }, [selectedImage]);

  const getThumbsGradientStyle = () => {
    const leftTransform = (thumbsIndex === 0 && !isThumbsSliding) ? "translateX(-100%)" : "translateX(0)";
    const rightTransform = (isThumbsEnd && !isThumbsSliding) ? "translateX(100%)" : "translateX(0)";
    return { leftGradient: leftTransform, rightGradient: rightTransform };
  };

  useEffect(() => {
    setHasMainImage(true);
    setHasThumbs(Array(images.length).fill(true));
  }, [selectedVariant, selectedSize, images.length]);

  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const stock = product.stock;
  const sizeLabel = product.sizes[selectedSize]?.label;
  const variantName = product.variants[selectedVariant]?.name;

  // Используем useMemo для стабилизации cartItem
  const cartItem = useMemo(() => {
    const cartItemRaw = items.find(
      (i) => i.id === product.id && i.size === sizeLabel && i.variant === variantName
    );
    return cartItemRaw
      ? {
          id: cartItemRaw.id,
          size: cartItemRaw.size || '',
          variant: cartItemRaw.variant || '',
          quantity: cartItemRaw.quantity,
        }
      : null;
  }, [items, product.id, sizeLabel, variantName]);

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity);
    else setQuantity(1);
  }, [cartItem]);

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

  const handleOpenDescriptionModal = () => {
    setShowDescriptionModal(true);
    setShowModal(true);
  };
  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
    setShowModal(false);
  };

  return (
    <div className="p-6 py-10 mb-10 text-white w-full mx-auto">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,548px)_minmax(0,460px)_minmax(0,340px)] gap-10 w-full justify-center mx-auto">
          {/* Галерея */}
          <div className="flex flex-col items-start max-w-[548px] w-full">
            <Breadcrumbs category={product.category} />
            <ProductGallery
              images={images}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              hasMainImage={hasMainImage}
              setHasMainImage={setHasMainImage}
              hasThumbs={hasThumbs}
              setHasThumbs={setHasThumbs}
              thumbsIndex={thumbsIndex}
              setThumbsIndex={setThumbsIndex}
              isThumbsEnd={isThumbsEnd}
              setIsThumbsEnd={setIsThumbsEnd}
              isThumbsSliding={isThumbsSliding}
              setIsThumbsSliding={setIsThumbsSliding}
              getThumbsGradientStyle={getThumbsGradientStyle}
              thumbsSwiperRef={thumbsSwiperRef}
              productTitle={product.title}
            />
          </div>
          {/* Инфо о товаре */}
          <div className="flex flex-col justify-start w-full lg:pt-[64px]">
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              setSelectedImage={setSelectedImage}
              onShowDescriptionModal={handleOpenDescriptionModal}
            />
          </div>
          {/* AddToCartCard справа */}
          <div className="flex flex-col justify-start w-full lg:pt-[64px]">
            <AddToCartCard
              price={product.price}
              oldPrice={product.oldPrice}
              cartItem={cartItem}
              quantity={quantity}
              stock={stock}
              handleAddToCart={handleAddToCart}
              handleChangeQuantity={handleChangeQuantity}
              removeFromCart={removeFromCart}
              productId={product.id}
              sizeLabel={sizeLabel}
              variantName={variantName}
            />
          </div>
        </div>
      </div>
      {/* Модальное окно характеристик и описания */}
      <ProductDescriptionModal
        show={showDescriptionModal}
        onClose={handleCloseDescriptionModal}
        product={product}
        cartItem={cartItem}
        quantity={quantity}
        stock={stock}
        handleAddToCart={handleAddToCart}
        handleChangeQuantity={handleChangeQuantity}
        removeFromCart={removeFromCart}
        productId={product.id}
        sizeLabel={sizeLabel}
        variantName={variantName}
      />
    </div>
  );
}