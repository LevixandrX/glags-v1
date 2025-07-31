import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";
import clsx from 'clsx';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import NoImagePlaceholder from './NoImagePlaceholder';

interface VariantSliderProps {
  variants: Array<{ name: string; images: string[] }>;
  selectedVariant: number;
  setSelectedVariant: (idx: number) => void;
  setSelectedImage: (idx: number) => void;
}

export default function VariantSlider({ variants, selectedVariant, setSelectedVariant, setSelectedImage }: VariantSliderProps) {
  const variantSwiperRef = useRef<SwiperType | null>(null);
  const [variantThumbsIndex, setVariantThumbsIndex] = useState(0);
  const [variantIsEnd, setVariantIsEnd] = useState(false);
  const [variantIsSliding, setVariantIsSliding] = useState(false);
  const [hasThumbs, setHasThumbs] = useState<boolean[]>(variants.map(() => true));
  useEffect(() => {
    setHasThumbs(variants.map(() => true));
  }, [variants]);
  const showSliderControls = variants.length > 5;
  return (
    <>
      <div className="mb-2 text-lg">
      <span className="text-white/50">Вариант: </span>
      <span className="text-white">{variants[selectedVariant]?.name}</span>
      </div>
      <div className="relative w-full max-w-[440px] min-h-[92px] mb-4">
        {/* Затемнения */}
        {showSliderControls && !((variantThumbsIndex === 0) && !variantIsSliding) && (
          <div
            className="absolute top-0 left-0 h-full w-10 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
              transition: "transform 0.3s ease"
            }}
          />
        )}
        {showSliderControls && !((variantIsEnd) && !variantIsSliding) && (
          <div
            className="absolute top-0 right-0 h-full w-10 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to left, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
              transition: "transform 0.3s ease"
            }}
          />
        )}
        {/* Стрелки */}
        {showSliderControls && variantThumbsIndex > 0 && (
          <button
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-[#6E44FF] hover:bg-[#6E44FF] rounded-full p-2 z-20 shadow-lg transition-all cursor-pointer"
            style={{ width: 40, height: 40 }}
            onClick={() => {
              if (variantSwiperRef.current) {
                variantSwiperRef.current.slideTo(variantThumbsIndex - 1);
              }
            }}
            aria-label="Предыдущий вариант"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        {showSliderControls && !variantIsEnd && (
          <button
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#6E44FF] hover:bg-[#6E44FF] rounded-full p-2 z-20 shadow-lg transition-all cursor-pointer"
            style={{ width: 40, height: 40 }}
            onClick={() => {
              if (variantSwiperRef.current) {
                variantSwiperRef.current.slideTo(variantThumbsIndex + 1);
              }
            }}
            aria-label="Следующий вариант"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        {/* Сам Swiper */}
        <div style={{ overflow: 'hidden' }}>
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={showSliderControls ? 'auto' : variants.length}
            slidesPerGroup={1}
            effect="slide"
            navigation={false}
            allowTouchMove={showSliderControls}
            simulateTouch={showSliderControls}
            className="w-full"
            onSwiper={swiper => { variantSwiperRef.current = swiper; }}
            onSlideChange={swiper => {
              setVariantThumbsIndex(swiper.activeIndex);
              setVariantIsEnd(swiper.isEnd);
              setVariantIsSliding(false);
            }}
            onProgress={swiper => {
              if (swiper.progress > 0 && swiper.progress < 1) setVariantIsSliding(true);
              else if (Math.abs(swiper.progress - 0) < 0.01 || Math.abs(swiper.progress - 1) < 0.01) setVariantIsSliding(false);
            }}
            onTouchEnd={swiper => setVariantThumbsIndex(swiper.activeIndex)}
          >
            {variants.map((variant, idx) => (
              <SwiperSlide
                key={variant.name}
                className="!w-[80px] !h-[92px] flex-shrink-0 flex items-center justify-center py-1 cursor-pointer"
              >
                <div
                  className={clsx(
                    'w-[80px] h-[80px] rounded-xl overflow-hidden border-2 transition-all',
                    idx === selectedVariant ? 'border-[#6E44FF] scale-105 shadow-[0_0_32px_0_rgba(110,68,255,0.5)]' : 'border-transparent opacity-70 hover:opacity-100',
                    idx === 0 && variantThumbsIndex === 0 && !variantIsSliding ? '!ml-0' : ''
                  )}
                  style={{ marginLeft: idx === 0 && variantThumbsIndex === 0 && !variantIsSliding ? 0 : undefined }}
                  onClick={() => {
                    setSelectedVariant(idx);
                    setSelectedImage(0);
                  }}
                  aria-label={`Вариант ${variant.name}`}
                  role="button"
                  tabIndex={0}
                >
                  {hasThumbs[idx] && variant.images && variant.images[0] ? (
                    <Image
                      src={variant.images[0]}
                      alt={variant.name}
                      width={80}
                      height={80}
                      className="object-contain"
                      onError={() => setHasThumbs(prev => prev.map((v, i) => i === idx ? false : v))}
                    />
                  ) : (
                    <NoImagePlaceholder width={80} height={80} iconSize={20} textSize="10px" textPadding="0" bgColor="#D9D9D9" />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
} 