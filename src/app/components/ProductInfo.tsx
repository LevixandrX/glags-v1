import VariantSlider from "./VariantSlider";
import SizeSelector from "./SizeSelector";
import ProductDetails from "./ProductDetails";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface Variant {
  name: string;
  images: string[];
}
interface Size {
  label: string;
}
interface Characteristic {
  label: string;
  value: string;
}
interface ProductInfoProps {
  product: {
    id: string;
    title: string;
    rating: number;
    reviewsCount: number;
    variants: Variant[];
    sizes: Size[];
    characteristics: Characteristic[];
    price: number;
    oldPrice?: number;
    slug: string;
    description: string;
  };
  selectedVariant: number;
  setSelectedVariant: Dispatch<SetStateAction<number>>;
  selectedSize: number;
  setSelectedSize: Dispatch<SetStateAction<number>>;
  setSelectedImage: Dispatch<SetStateAction<number>>;
  onShowDescriptionModal: () => void;
}

export default function ProductInfo({
  product,
  selectedVariant,
  setSelectedVariant,
  selectedSize,
  setSelectedSize,
  setSelectedImage,
  onShowDescriptionModal,
}: ProductInfoProps) {
  return (
    <div className="flex-1 flex flex-col gap-2 max-w-xl mx-auto">
      {/* Название */}
      <h1 className="text-3xl font-medium text-white mb-0 pb-0 leading-tight">
        {product.title}
      </h1>
      {/* Рейтинг и оценки */}
      <div className="flex items-center gap-3 mb-6">
        <span className="flex items-center gap-1">
          <Image src="/icons/kid_star.svg" alt="star" width={20} height={20} />
          <span className="text-xl text-white">{product.rating}</span>
        </span>
        <Image src="/icons/Ellipse.svg" alt="dot" width={6} height={6} />
        <span className="text-xl text-white flex items-center group cursor-pointer">
          {product.reviewsCount} оценок
          <span className="ml-1 transition-colors group-hover:text-violet-500">
            <Image
              src="/icons/arrow_forward_ios.svg"
              alt="arrow"
              width={16}
              height={16}
              className="inline-block align-middle group-hover:filter group-hover:brightness-250"
            />
          </span>
        </span>
      </div>
      {/* Варианты — мини-слайдер (VariantSlider) */}
      <VariantSlider
        variants={product.variants}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        setSelectedImage={setSelectedImage}
      />
      {/* Размеры */}
      <div className="flex flex-col gap-2 mb-6">
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
      {/* Характеристики */}
      <ProductDetails characteristics={product.characteristics} />
      {/* Описание */}
      <button
        className="mt-4 flex items-center gap-1 bg-[#D9D9D940] text-white text-base rounded-[16px] px-6 py-2 w-fit hover:bg-[#D9D9D980] transition-colors cursor-pointer"
        type="button"
        onClick={onShowDescriptionModal}
      >
        Характеристики и описание
        <Image
          src="/icons/arrow_forward_ios.svg"
          alt="arrow"
          width={14}
          height={14}
          className="inline-block align-middle"
        />
      </button>
    </div>
  );
}
