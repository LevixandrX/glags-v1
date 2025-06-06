"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Анимация для секций
const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, ease: "easeOut", type: "spring", stiffness: 80 },
  },
};

// Анимация для карточек с уменьшенной задержкой
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: 2 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { delay: i * 0.05, duration: 0.3, type: "spring", stiffness: 200 },
  }),
};

// Анимация для текста
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, delay: 0.3, ease: "easeOut" } },
};

export default function AdvantagesSection() {
  const advantages = [
    {
      icon: "/icons/hourglass.svg",
      title: "С 1993 года",
      desc: "Опыт, проверенный временем. Уважение к традициям.",
    },
    {
      icon: "/icons/verified.svg",
      title: "Художественное стекло",
      desc: "Проверка качества и совершенства каждой детали.",
    },
    {
      icon: "/icons/orders.svg",
      title: "2100+ фигурок",
      desc: "Самый большой стеклянный каталог в России.",
    },
    {
      icon: "/icons/eda.svg",
      title: "Ручная работа",
      desc: "Живой огонь. Умелые руки. Настоящее волшебство.",
    },
    {
      icon: "/icons/crystal.svg",
      title: "Опт и эксклюзив",
      desc: "Воплощаем мечты в стекле. Любые заказы — любые масштабы.",
    },
    {
      icon: "/icons/truck-delivery.svg",
      title: "Доставка по миру",
      desc: "Надёжная упаковка. Доставим даже на край света.",
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="py-38 bg-gradient-to-b from-[#1B1B1B] to-[#111] shadow-[0_0_100px_1px_rgba(106,40,255,0.4)] relative z-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          Почему выбирают GLAGS
        </motion.h2>
        <div className="grid gap-10 mb-10 md:grid-cols-3">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-[#1f1f1f] rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] p-8 border border-white/10 hover:border-purple-500 hover:shadow-purple-500/40 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              <motion.div
                whileHover={{ y: -5, rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}