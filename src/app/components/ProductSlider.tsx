"use client";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";

const products = [
  {
    title: "Драгстер",
    price: 2300,
    oldPrice: 2900,
    discount: 25,
    image: "/card-image1.png",
    size: "40 см",
    count: 1,
  },
  {
    title: "Трипо тропа трапо трипа",
    price: 2200,
    oldPrice: 2500,
    discount: 12,
    image: "/card-image1.png",
    size: "40 см",
    count: 1,
  },
  {
    title: "Скульптура Котик",
    price: 1800,
    oldPrice: 2100,
    discount: 15,
    image: "/card-image1.png",
    size: "30 см",
    count: 2,
  },
  {
    title: "Пингвинёнок",
    price: 1500,
    oldPrice: 1800,
    discount: 17,
    image: "/card-image1.png",
    size: "25 см",
    count: 3,
  },
  {
    title: "Сова стеклянная",
    price: 2700,
    oldPrice: 3200,
    discount: 16,
    image: "/card-image1.png",
    size: "35 см",
    count: 1,
  },
  {
    title: "Лягушка на листе",
    price: 2100,
    oldPrice: 2400,
    discount: 13,
    image: "/card-image1.png",
    size: "28 см",
    count: 2,
  },
  {
    title: "Слонёнок",
    price: 1950,
    oldPrice: 2200,
    discount: 11,
    image: "/card-image1.png",
    size: "32 см",
    count: 1,
  },
  {
    title: "Жирафчик",
    price: 2500,
    oldPrice: 2800,
    discount: 11,
    image: "/card-image1.png",
    size: "38 см",
    count: 1,
  },
  {
    title: "Медвежонок",
    price: 1600,
    oldPrice: 1900,
    discount: 16,
    image: "/card-image1.png",
    size: "27 см",
    count: 2,
  },
  {
    title: "Лисичка",
    price: 1750,
    oldPrice: 2000,
    discount: 13,
    image: "/card-image1.png",
    size: "29 см",
    count: 1,
  },
  {
    title: "Зайчонок",
    price: 1400,
    oldPrice: 1700,
    discount: 18,
    image: "/card-image1.png",
    size: "24 см",
    count: 3,
  },
  {
    title: "Ёжик стеклянный",
    price: 1550,
    oldPrice: 1800,
    discount: 14,
    image: "/card-image1.png",
    size: "26 см",
    count: 2,
  },
];

export default function ProductSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const totalSlides = products.length;

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  useEffect(() => {
    const updateUI = () => {
      if (swiperRef.current) {
        const slidesPerView = Number(swiperRef.current.params.slidesPerView) || 6;
        const prevButton = document.querySelector(".swiper-button-prev-custom");
        const nextButton = document.querySelector(".swiper-button-next-custom");

        if (prevButton) {
          prevButton.classList.toggle("hidden", activeIndex === 0); // Скрываем prev на первой карточке
        }
        if (nextButton) {
          nextButton.classList.toggle("hidden", activeIndex >= totalSlides - slidesPerView); // Скрываем next на последней группе
        }

        const slides = swiperRef.current.slides;
        slides.forEach((slide, idx) => {
          const card = slide.querySelector("div");
          if (card) {
            const isFirstVisible = idx === activeIndex;
            const isLastVisible = idx === activeIndex + slidesPerView - 1;
            const isLastOverall = idx === totalSlides - 1;

            if (isFirstVisible && activeIndex > 0) {
              card.classList.add("first-slide-gradient");
              card.style.maskImage = "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)";
              card.style.webkitMaskImage = "linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)";
            } else if (isLastVisible && !isLastOverall) {
              card.classList.add("last-slide-gradient");
              card.style.maskImage = "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)";
              card.style.webkitMaskImage = "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)";
            } else {
              card.classList.remove("first-slide-gradient", "last-slide-gradient");
              card.style.maskImage = "";
              card.style.webkitMaskImage = "";
            }
          }
        });
      }
    };

    if (swiperRef.current) {
      updateUI();
      swiperRef.current.on("transitionEnd", updateUI); // Синхронизация после анимации
    }

    return () => {
      if (swiperRef.current) {
        swiperRef.current.off("transitionEnd", updateUI);
      }
    };
  }, [activeIndex, totalSlides]);

  return (
    <div className="w-full py-8 rounded-2xl relative">
      <h2 className="text-center text-4xl font-bold text-white mb-8">Новое</h2>
      <div className="relative max-w-[1600px] mx-auto">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={8}
          slidesPerView={6}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          onSlideChange={handleSlideChange}
          className="pb-12"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {products.map((product, idx) => (
            <SwiperSlide key={idx} className="relative">
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Кастомные стрелки */}
        <button
          className="swiper-button-prev-custom absolute left-[-64px] top-1/2 -translate-y-1/2 z-30 bg-[#EA698B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#d65f7f] transition"
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="flex items-center justify-center w-full h-full"
            style={{ transform: "translateX(-1px)" }}
          >
            <Image
              src="/icons/strelka_vverh_aepi0isb8p5n.svg"
              alt="prev"
              width={16}
              height={16}
              className="-rotate-90"
            />
          </span>
        </button>
        <button
          className="swiper-button-next-custom absolute right-[-32px] top-1/2 -translate-y-1/2 z-30 bg-[#EA698B] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-[#d65f7f] transition"
          style={{
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="flex items-center justify-center w-full h-full"
            style={{ transform: "translateX(1px)" }}
          >
            <Image
              src="/icons/strelka_vverh_aepi0isb8p5n.svg"
              alt="next"
              width={16}
              height={16}
              className="rotate-90"
            />
          </span>
        </button>
        {/* Кастомные точки */}
        <div className="flex justify-center gap-3 mt-6">
          {Array.from({ length: Math.ceil(totalSlides - (6 - 1)) }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-[#EA698B]" : "bg-white/60"
              }`}
              style={{
                opacity: i < activeIndex ? 0.4 : 1,
                filter:
                  i > activeIndex
                    ? `brightness(${1 - (i - activeIndex) * 0.15})`
                    : undefined,
              }}
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