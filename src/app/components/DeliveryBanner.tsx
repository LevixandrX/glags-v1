"use client";

// Удаляем импорт motion
// import { motion } from "framer-motion";

// Анимация для букв в заголовке
const letterVariants = {
  hidden: { opacity: 0, y: 30, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: i * 0.02, duration: 0.6, type: "spring", stiffness: 120 },
  }),
};

// Анимация для секций (сверху вниз)
const sectionVariants = {
  hidden: { opacity: 0, y: -80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut", type: "spring", stiffness: 80 },
  },
};

// Анимация для текста
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
};

// Разбиваем заголовок на буквы
const heroTitle = "Оплата и доставка".split("");

export default function DeliveryBanner() {
  return (
    <section
      className="absolute w-full pt-60 bg-gradient-to-r from-[#6E44FF] to-[#9A7AD4] text-white rounded-b-3xl py-32 px-6 md:px-12 text-center shadow-[0_0_80px_30px_rgba(106,40,255,0.4)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-50 pointer-events-none" />
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight inline-block">
        {"Оплата и доставка".split("").map((letter, i) => (
          <span key={i} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
      <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
        Безопасная оплата и доставка по всему миру — надёжно, быстро, удобно.
      </p>
    </section>
  );
}