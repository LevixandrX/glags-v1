import Image from 'next/image';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import NoImagePlaceholder from "./NoImagePlaceholder";
import type { Swiper as SwiperType } from "swiper";
import { Dispatch, SetStateAction, RefObject } from "react";

interface ProductGalleryProps {
  images: string[];
  selectedImage: number;
  setSelectedImage: Dispatch<SetStateAction<number>>;
  hasMainImage: boolean;
  setHasMainImage: Dispatch<SetStateAction<boolean>>;
  hasThumbs: boolean[];
  setHasThumbs: Dispatch<SetStateAction<boolean[]>>;
  thumbsIndex: number;
  setThumbsIndex: Dispatch<SetStateAction<number>>;
  isThumbsEnd: boolean;
  setIsThumbsEnd: Dispatch<SetStateAction<boolean>>;
  isThumbsSliding: boolean;
  setIsThumbsSliding: Dispatch<SetStateAction<boolean>>;
  thumbsSwiperRef: RefObject<SwiperType | null>;
  productTitle: string;
}

export default function ProductGallery({
  images,
  selectedImage,
  setSelectedImage,
  hasMainImage,
  setHasMainImage,
  hasThumbs,
  setHasThumbs,
  thumbsIndex,
  setThumbsIndex,
  isThumbsEnd,
  setIsThumbsEnd,
  isThumbsSliding,
  setIsThumbsSliding,
  thumbsSwiperRef,
  productTitle
}: ProductGalleryProps) {
  const showSliderControls = images.length > 5;
  const showMainImageArrows = images.length > 1;
  return (
    <div className="flex flex-col items-start max-w-[700px] w-full mx-auto lg:max-w-[700px]">
      <div className="relative w-full aspect-square bg-white rounded-2xl shadow-xl overflow-hidden mb-4 mt-2 lg:min-h-[500px] lg:min-w-[500px]">
        {hasMainImage && images[selectedImage] && images[selectedImage] !== "" ? (
          <Image
            src={images[selectedImage]}
            alt={productTitle}
            fill
            className="object-contain transition-all duration-300"
            priority
            onError={() => setHasMainImage(false)}
          />
        ) : (
          <NoImagePlaceholder 
            width="100%" 
            height="100%" 
            iconSize={80} 
            textSize="20px" 
            bgColor="#D9D9D9" 
            className="w-full h-full min-w-0 min-h-0 rounded-2xl" 
          />
        )}
        {/* Стрелки */}
        {showMainImageArrows && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#6E44FF]/80 hover:bg-[#6E44FF] rounded-full p-2 z-10 shadow-lg transition-all"
              onClick={() => setSelectedImage((prev) => prev > 0 ? prev - 1 : images.length - 1)}
              aria-label="Предыдущее фото"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6E44FF]/80 hover:bg-[#6E44FF] rounded-full p-2 z-10 shadow-lg transition-all"
              onClick={() => setSelectedImage((prev) => prev < images.length - 1 ? prev + 1 : 0)}
              aria-label="Следующее фото"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}
      </div>
      {/* Слайдер */}
      <div className="relative w-full max-w-[548px] mx-auto">
          {/* Затемнения */}
          {showSliderControls && !((thumbsIndex === 0) && !isThumbsSliding) && (
            <div
              className="absolute top-0 left-0 h-full w-20 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to right, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
                transition: "transform 0.3s ease"
              }}
            />
          )}
          {showSliderControls && !((isThumbsEnd) && !isThumbsSliding) && (
            <div
              className="absolute top-0 right-0 h-full w-20 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to left, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
                transition: "transform 0.3s ease"
              }}
            />
          )}
          {/* Стрелка влево */}
          {showSliderControls && thumbsIndex > 0 && (
            <button
              className="absolute -left-2 top-1/2 -translate-y-1/2 bg-[#6E44FF]/80 hover:bg-[#6E44FF] rounded-full p-2 z-20 shadow-lg transition-all"
              style={{ width: 40, height: 40 }}
              onClick={() => {
                if (thumbsSwiperRef.current) {
                  thumbsSwiperRef.current.slideTo(thumbsIndex - 1);
                }
              }}
              aria-label="Предыдущая миниатюра"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          {/* Стрелка вправо */}
          {showSliderControls && !isThumbsEnd && (
            <button
              className="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#6E44FF]/80 hover:bg-[#6E44FF] rounded-full p-2 z-20 shadow-lg transition-all"
              style={{ width: 40, height: 40 }}
              onClick={() => {
                if (thumbsSwiperRef.current) {
                  thumbsSwiperRef.current.slideTo(thumbsIndex + 1);
                }
              }}
              aria-label="Следующая миниатюра"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          {/* Сам Swiper */}
          <div style={{ overflow: 'hidden' }}>
            <Swiper
              modules={[Navigation]}
              spaceBetween={12}
              slidesPerView={showSliderControls ? 'auto' : images.length}
              slidesPerGroup={1}
              effect="slide"
              navigation={false}
              allowTouchMove={showSliderControls}
              className="w-full"
              onSwiper={swiper => { thumbsSwiperRef.current = swiper; }}
              onSlideChange={(swiper) => {
                setThumbsIndex(swiper.activeIndex);
                setIsThumbsEnd(swiper.isEnd);
                setIsThumbsSliding(false);
              }}
              onProgress={(swiper) => {
                if (swiper.progress > 0 && swiper.progress < 1) setIsThumbsSliding(true);
                else if (Math.abs(swiper.progress - 0) < 0.01 || Math.abs(swiper.progress - 1) < 0.01) setIsThumbsSliding(false);
              }}
              onTouchEnd={(swiper) => setThumbsIndex(swiper.activeIndex)}
            >
              {images.length > 0 ? images.map((img, idx) => (
                <SwiperSlide
                  key={img + idx}
                  className="!w-[100px] !h-[112px] flex-shrink-0 flex items-center justify-center py-1"
                >
                  <button
                    className={clsx(
                      'w-[100px] h-[100px] rounded-xl overflow-hidden border-2 transition-all',
                      idx === selectedImage ? 'border-[#6E44FF] scale-105 shadow-[0_0_32px_0_rgba(110,68,255,0.5)]' : 'border-transparent opacity-70 hover:opacity-100',
                      idx === 0 && thumbsIndex === 0 && !isThumbsSliding ? '!ml-0' : ''
                    )}
                    style={{ marginLeft: idx === 0 && thumbsIndex === 0 && !isThumbsSliding ? 0 : undefined }}
                    onClick={() => setSelectedImage(idx)}
                    aria-label={`Фото ${idx + 1}`}
                  >
                    {hasThumbs[idx] && img && img !== "" ? (
                      <Image src={img} alt={productTitle} width={100} height={100} className="object-contain" onError={() => setHasThumbs((prev) => prev.map((v, i) => i === idx ? false : v))} />
                    ) : (
                      <NoImagePlaceholder width={100} height={100} iconSize={24} textSize="10px" textPadding="0" bgColor="#D9D9D9" />
                    )}
                  </button>
                </SwiperSlide>
              )) : (
                <SwiperSlide>
                  <NoImagePlaceholder width={100} height={100} iconSize={24} textSize="10px" textPadding="0" bgColor="#D9D9D9" />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
      </div>
    </div>
  );
} 