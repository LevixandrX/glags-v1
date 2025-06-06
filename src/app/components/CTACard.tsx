"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// Анимация для секций
const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
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

export default function CTACard() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="bg-[#6E44FF] text-white text-center py-34 px-6 pb-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] opacity-30 pointer-events-none" />
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
        className="text-4xl md:text-6xl font-bold mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-tight"
      >
        Хочешь удивить стеклянным шедевром?
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
        className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto"
      >
        Переходи в каталог и выбери сувенир, который создаст настроение ✨
      </motion.p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Link
          href="/catalog"
          className="relative inline-block bg-white text-[#6E44FF] font-bold px-10 py-5 rounded-full text-xl hover:bg-purple-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 overflow-hidden"
        >
          <span className="relative z-10">Открыть каталог</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </Link>
      </motion.div>
    </motion.section>
  );
}