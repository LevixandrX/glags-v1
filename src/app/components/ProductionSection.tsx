"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper/types";

type Step = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

const productionSteps: Step[] = [
  {
    title: "Выбор стекла",
    description: "Используем только лучшее: гусевское, львовское, чешское и муранское стекло. Каждая партия проверяется на чистоту и цвет.",
    image: "/create-figure1.jpg",
    alt: "Выбор стекла для сувениров",
  },
  {
    title: "Работа с огнем",
    description: "Огонь плавит стекло при температуре выше 1200°C, превращая его в податливую массу, готовую к созданию шедевров.",
    image: "/create-figure1.jpg",
    alt: "Работа с огнем для плавки стекла",
  },
  {
    title: "Ручная формовка",
    description: "Без прикосновений, только мастерство. Стекло принимает форму под умелыми руками ремесленников.",
    image: "/create-figure1.jpg",
    alt: "Ручная формовка стеклянных фигурок",
  },
  {
    title: "Финальный штрих",
    description: "Каждая фигурка полируется и проверяется, чтобы стать настоящим произведением искусства.",
    image: "/create-figure1.jpg",
    alt: "Финальная полировка стеклянных сувениров",
  },
];

export default function ProductionSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const sliderId = "production-slider";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update(); // Обновляем Swiper при изменении размеров
    }
  }, []);

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
    <section className="relative py-44 px-2 md:px-8 max-w-[1560px] mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
        Как рождается стеклянное волшебство
      </h2>
      <div className="relative w-full">
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-[1440px]">
            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={3}
              effect="slide"
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 12 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 24 },
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
              {productionSteps.map((step, idx) => (
                <SwiperSlide key={idx} className="relative">
                  <div className="flex flex-col">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={480}
                      height={288}
                      className="rounded-xl mb-4 object-cover w-full h-[200px] md:h-[240px]"
                    />
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-base md:text-lg text-white/70 leading-relaxed">{step.description}</p>
                  </div>
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
          className={`swiper-button-prev-${sliderId} absolute left-[32px] top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition`}
          style={{ padding: 0 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="m-auto"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button
          className={`swiper-button-next-${sliderId} absolute right-[32px] top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-white/10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition`}
          style={{ padding: 0 }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="m-auto"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
}