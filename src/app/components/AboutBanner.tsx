"use client";

// Удаляем импорт motion
// import { motion } from "framer-motion";

// Удаляем неиспользуемые letterVariants, sectionVariants, textVariants, heroTitle

export default function AboutBanner() {
  return (
    <section
      className="absolute w-full pt-60 bg-gradient-to-r from-[#6E44FF] to-[#9A7AD4] text-white rounded-b-3xl py-32 px-6 md:px-12 text-center shadow-[0_0_80px_30px_rgba(106,40,255,0.4)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] opacity-50 pointer-events-none" />
      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight inline-block">
        {"О нас".split("").map((letter, i) => (
          <span key={i} className="inline-block">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
      <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 leading-relaxed">
        Более 15 лет превращаем огонь и стекло в волшебство. Ручная работа. Эксклюзив. GLAGS.
      </p>
    </section>
  );
}