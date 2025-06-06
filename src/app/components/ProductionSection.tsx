"use client";

import Image from "next/image";
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

export default function ProductionSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="py-52 px-6 md:px-16 max-w-7xl mx-auto space-y-16"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 90 }}
        >
          <Image
            src="/media/banner-image1.png"
            alt="Производство стеклянных фигурок"
            width={600}
            height={400}
            className="rounded-3xl shadow-[0_0_50px_1px_rgba(106,40,255,0.4)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 90 }}
          className="space-y-6"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-4xl font-bold text-purple-300 tracking-tight"
          >
            Что мы делаем?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            className="text-lg text-white/90 leading-relaxed"
          >
            Мы производим русские сувениры из цветного художественного стекла. Используем только лучшее стекло: гусевское, львовское, чешское и муранское.
            <br /><br />
            Стекло расплавляется на огне, принимает форму без прикосновений. Это — настоящее ремесло, доведённое до искусства.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
}