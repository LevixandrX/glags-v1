"use client";
import ProductCard, { Product } from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";

interface ProductSliderProps {
  title: string;
  products: Product[];
}

export default function ProductSlider({ title, products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [slideCount, setSlideCount] = useState(3); // Начальное значение
  const swiperRef = useRef<SwiperType | null>(null);
  const sliderId = title.toLowerCase().replace(/\s+/g, "-"); // Уникальный ID для навигации

  useEffect(() => {
    const updateSlideCount = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setSlideCount(3); // ≥1280px: 3 точки
      } else if (width >= 1024) {
        setSlideCount(5); // 1024px–1280px: 5 точек
      } else if (width >= 639) {
        setSlideCount(6); // 639px–1024px: 6 точек
      } else {
        setSlideCount(2); // <639px: 2 точки (по умолчанию для 320px)
      }
    };

    updateSlideCount(); // Инициализация
    window.addEventListener("resize", updateSlideCount); // Обновление при изменении размера

    if (swiperRef.current) {
      swiperRef.current.update(); // Обновляем Swiper
    }

    return () => window.removeEventListener("resize", updateSlideCount); // Очистка
  }, [products]);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex); // Обновляем индекс активного слайда
    setIsEnd(swiper.isEnd); // Обновляем флаг конца слайдера
    setIsSliding(false); // Сбрасываем состояние слайдинга после завершения
  };

  const handleProgress = (swiper: SwiperType) => {
    if (swiper.progress > 0 && swiper.progress < 1) {
      setIsSliding(true); // Активируем слайдинг при любом движении
    } else if (Math.abs(swiper.progress - 0) < 0.01 || Math.abs(swiper.progress - 1) < 0.01) {
      setIsSliding(false); // Сбрасываем, если вернулись к началу или концу
    }
  };

  const getGradientStyle = () => {
    const leftTransform = (currentIndex === 0 && !isSliding) ? "translateX(-100%)" : "translateX(0)";
    const rightTransform = (isEnd && !isSliding) ? "translateX(100%)" : "translateX(0)";

    return { leftGradient: leftTransform, rightGradient: rightTransform };
  };

  return (
    <div className="w-full rounded-2xl relative">
      <h2 className="text-center text-4xl font-bold text-white mb-8">{title}</h2>
      <div className="relative max-w-[1600px] mx-auto">
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[1440px]">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={6}
              effect="slide"
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 12 },
                639: { slidesPerView: 3, spaceBetween: 12 },
                1024: { slidesPerView: 4, spaceBetween: 12 },
                1280: { slidesPerView: 6, spaceBetween: 12 },
              }}
              navigation={{
                nextEl: `.swiper-button-next-${sliderId}`,
                prevEl: `.swiper-button-prev-${sliderId}`,
              }}
              className="pb-12"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={handleSlideChange}
              onProgress={handleProgress}
            >
              {products.map((product, idx) => (
                <SwiperSlide key={idx} className="relative">
                  <ProductCard {...product} />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Затемнения на концах контейнера */}
            <div
              className="absolute top-0 left-0 h-full w-20 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to right, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
                transform: getGradientStyle().leftGradient,
                transition: "transform 0.3s ease",
              }}
            />
            <div
              className="absolute top-0 right-0 h-full w-20 pointer-events-none z-10"
              style={{
                background: "linear-gradient(to left, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0))",
                transform: getGradientStyle().rightGradient,
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </div>
        <button
          className={`swiper-button-prev-${sliderId} absolute left-[32px] top-1/2 -translate-y-1/2 z-30 bg-[#EA698B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#d65f7f] transition`}
          style={{ padding: 0 }}
        >
          <span className="flex items-center justify-center w-full h-full" style={{ transform: "translateX(-1px)" }}>
            <Image src="/icons/strelka_vverh_aepi0isb8p5n.svg" alt="prev" width={16} height={16} className="-rotate-90" />
          </span>
        </button>
        <button
          className={`swiper-button-next-${sliderId} absolute right-[32px] top-1/2 -translate-y-1/2 z-30 bg-[#EA698B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#d65f7f] transition`}
          style={{ padding: 0 }}
        >
          <span className="flex items-center justify-center w-full h-full" style={{ transform: "translateX(1px)" }}>
            <Image src="/icons/strelka_vverh_aepi0isb8p5n.svg" alt="next" width={16} height={16} className="rotate-90" />
          </span>
        </button>
        <div className="flex justify-center gap-3 mt-6">
          {Array.from({ length: slideCount }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-[#EA698B]" : "bg-white/40"}`}
              onClick={() => {
                if (swiperRef.current && typeof swiperRef.current.slideTo === "function") {
                  swiperRef.current.slideTo(i);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}