"use client";

import { FaPhone, FaMapMarkerAlt, FaVk, FaInstagram, FaClock } from "react-icons/fa";
import Link from "next/link";

// import { motion } from "framer-motion";

// Анимация для секций
// const sectionVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: "easeOut" },
//   },
// };

export default function ContactDetailsSection() {
  return (
    <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto space-y-12">
      {/* Время работы */}
      <div className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-700/30 shadow-sm hover:shadow-md hover:shadow-gray-600/20 transition-all duration-300 relative">
        <h2 className="text-2xl font-bold text-gray-200 flex items-center gap-3 mb-6">
          <FaClock className="text-gray-400" /> Время работы
        </h2>
        <p className="text-gray-400 text-lg leading-loose">
          <strong>Рабочее время (по Москве):</strong> Пн – Пт: 10:00–19:00<br />
          <strong>Выходные:</strong> Сб, Вс и официальные праздники<br />
          <strong>Приём писем:</strong> Круглосуточно (обработка в рабочее время)
        </p>
      </div>
      {/* Контакты (Телефоны + Адрес) */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-700/30 shadow-sm hover:shadow-md hover:shadow-gray-600/20 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-6">
            <FaPhone className="text-gray-400" /> Телефоны
          </h3>
          <p className="text-gray-400 text-lg leading-loose">
            +7 (812) 642 32 17 — опт и розница<br />
            +7 (812) 642 82 70 — эксклюзивные (с 13:00, временно не принимаем)
          </p>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-xl border border-gray-700/30 shadow-sm hover:shadow-md hover:shadow-gray-600/20 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-2 mb-6">
            <FaMapMarkerAlt className="text-gray-400" /> Адрес
          </h3>
          <p className="text-gray-400 text-lg leading-loose">
            <strong>Координаты:</strong> 30.335919, 60.111791<br />
            <strong>или:</strong> Долгота: 30°20&apos;9.31&quot;E, <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Широта: 60°6&apos;42.45&quot;N<br />
            <strong>Транспорт:</strong> Маршрутка 441 (м. Проспект Просвещения), Автобусы 148 и 104 (м. Парнас), остановка «Берёзка»
          </p>
        </div>
      </div>
      {/* Реквизиты + Соцсети */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-[#1f1f1f] p-8 rounded-xl border border-gray-700/30 shadow-sm hover:shadow-md hover:shadow-gray-600/20 transition-all duration-300 col-span-1 md:col-span-2 lg:col-span-2">
          <h4 className="text-xl font-semibold text-gray-200 mb-6">Реквизиты</h4>
          <p className="text-gray-400 text-lg leading-loose">
            <strong>Индивидуальный предприниматель:</strong> Левитина Оксана Юрьевна<br />
            <strong>ИНН:</strong> 780210093241<br />
            <strong>ОГРН:</strong> 312784701900171<br />
            <strong>Банк:</strong> АО &quot;Т-БАНК&quot; (региональная сеть по всей России)<br />
            <strong>Р/с:</strong> 40802810300006052315<br />
            <strong>БИК:</strong> 7710140679<br />
            <strong>Кор/счет:</strong> 30101810145250000974
          </p>
        </div>
        <div className="bg-[#1f1f1f] w-[300px] p-6 rounded-xl border border-gray-700/30 shadow-sm hover:shadow-md hover:shadow-gray-600/20 transition-all duration-300 hidden md:block">
          <h3 className="text-xl font-semibold text-gray-200 mb-6">Соцсети</h3>
          <div className="flex items-center gap-4 text-2xl">
            <Link href="https://vk.com/glags2" target="_blank" className="hover:text-gray-300 transition">
              <FaVk />
            </Link>
            <Link href="https://www.instagram.com/glags.ru/" target="_blank" className="hover:text-gray-300 transition">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}