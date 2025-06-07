"use client";

import { motion } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaVk, FaInstagram } from "react-icons/fa";
import Link from "next/link";

// Анимация для секций
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function ContactDetailsSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-20 px-6 md:px-16 max-w-4xl mx-auto space-y-10"
    >
      {/* Время работы */}
      <motion.div
        custom={0}
        variants={sectionVariants}
        transition={{ delay: 0 }}
        className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 space-y-4 text-white/80 shadow-md hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      >
        <h2 className="text-2xl font-semibold text-purple-300">Время работы</h2>
        <p>
          Пн – Пт: 10:00–19:00<br />
          Сб, Вс — выходные<br />
          Письма принимаются круглосуточно
        </p>
      </motion.div>

      {/* Телефоны */}
      <motion.div
        custom={1}
        variants={sectionVariants}
        transition={{ delay: 0.2 }}
        className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow-md hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <FaPhone /> Телефоны
        </h3>
        <p>+7 (812) 642 32 17 — опт и розница</p>
        <p>+7 (812) 642 82 70 — эксклюзивные (временно не работает)</p>
      </motion.div>

      {/* Адрес */}
      <motion.div
        custom={2}
        variants={sectionVariants}
        transition={{ delay: 0.4 }}
        className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow-md hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <FaMapMarkerAlt /> Адрес
        </h3>
        <p>60.111791, 30.335919<br />Остановка «Берёзка», м. Просвещения / Парнас</p>
      </motion.div>

      {/* Соцсети */}
      <motion.div
        custom={3}
        variants={sectionVariants}
        transition={{ delay: 0.6 }}
        className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow-md hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-white">Соцсети</h3>
        <div className="flex items-center gap-6 text-3xl mt-2">
          <Link href="https://vk.com/glags2" target="_blank" className="hover:text-violet-400 transition">
            <FaVk />
          </Link>
          <Link href="https://www.instagram.com/glags.ru/" target="_blank" className="hover:text-pink-400 transition">
            <FaInstagram />
          </Link>
        </div>
      </motion.div>

      {/* Реквизиты */}
      <motion.div
        custom={4}
        variants={sectionVariants}
        transition={{ delay: 0.8 }}
        className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow-md hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300"
      >
        <h4 className="text-xl font-semibold text-white">Реквизиты</h4>
        <p className="text-sm leading-relaxed">
          ИП Левитина Оксана Юрьевна<br />
          ИНН: 780210093241<br />
          ОГРН: 312784701900171<br />
          Банк: АО &quot;Т-БАНК&quot;<br />
          Р/с: 40802810300006052315<br />
          БИК: 7710140679<br />
          Кор/счет: 30101810145250000974
        </p>
      </motion.div>
    </motion.section>
  );
}