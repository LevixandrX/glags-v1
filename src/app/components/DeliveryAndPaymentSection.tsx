"use client";

import { motion } from "framer-motion";
import { FaCreditCard } from "react-icons/fa";
import Image from "next/image";

// Анимация для секций
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 2 === 0 ? -1200 : 1200,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

export default function DeliveryAndPaymentSection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="py-20 px-6 md:px-16 max-w-7xl mx-auto space-y-16 relative overflow-hidden"
    >
      {/* Оплата - текстовый блок с иконкой */}
      <div className="relative mb-35">
        <motion.div
          variants={sectionVariants}
          transition={{ delay: 0 }}
          className="flex items-start space-x-4 text-left"
        >
          <FaCreditCard size={42} className="text-purple-400" />
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Оплата</h3>
            <p className="text-white/80 text-lg leading-loose">
              Оплата осуществляется банковским переводом по счёту организации или через Сбербанк Онлайн. Зачисление занимает 1–2 дня. Мы работаем по всей России и за рубежом с 2003 года, нацелены на долгосрочное сотрудничество.
            </p>
          </div>
        </motion.div>
        <div className="absolute -left-8 top-1/2 w-2 h-36 bg-purple-500/20 transform -translate-y-1/2 rounded-full" />
      </div>

      {/* Сроки доставки - карточка с изображением */}
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="relative bg-[#181818] p-6 rounded-xl border-2 border-pink-500/20 shadow-[0_4px_50px_rgba(255,105,180,0.15)] transition-all duration-600 w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/delivery-car1.png"
            alt="Delivery process"
            width={800}
            height={600}
            className="rounded-lg object-cover w-[80%] md:w-1/4"
          />
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Сроки доставки</h3>
            <ul className="list-disc text-lg pl-6 space-y-2 text-white/80">
              <li>Товар из каталога: 2 рабочих дня в СПб (СДЭК), 3 дня в другие города после оплаты.</li>
              <li>Эксклюзивные сувениры: 1 месяц после оплаты (по договорённости).</li>
              <li>Проектирование: 3 рабочих дня.</li>
              <li>Аннулирование заказа: возможно в течение 3 дней без оплаты.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Стоимость доставки - карточка с изображением и акцентом */}
      <motion.div
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="relative bg-[#181818] p-6 rounded-xl border-2 border-amber-400/20 shadow-[0_4px_50px_rgba(67,58,20,0.15)] transition-all duration-600 w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-50" />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/rubles1.png"
            alt="Pricing details"
            width={800}
            height={600}
            className="rounded-lg object-cover w-[80%] md:w-1/4"
          />
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">Стоимость доставки</h3>
            <ul className="list-disc text-lg pl-6 space-y-2 text-white/80">
              <li>СПб: от 3000 руб. — СДЭК ПВЗ от 200 руб., на адрес от 380 руб.</li>
              <li>ТК вне списка: +500 руб. (октябрь-январь: +800 руб.).</li>
              <li>Ускоренная сборка: 600 руб. за первые 100 позиций, +400 руб. за каждые 100 (до 30 000 руб.).</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* География и упаковка - карточка с изображением */}
      <motion.div
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardVariants}
        className="relative bg-[#181818] p-6 rounded-xl border-2 border-blue-400/20 shadow-[0_4px_50px_rgba(106,40,255,0.15)] transition-all duration-600 w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src="/world-boxes2.png"
            alt="Global delivery"
            width={800}
            height={600}
            className="rounded-lg object-cover w-[80%] md:w-1/4"
          />
          <div>
            <h3 className="text-3xl font-semibold text-white mb-6">География и упаковка</h3>
            <p className="text-white/80 text-lg leading-loose">
              Доставка по всему миру. Упаковка: гриппер, полиэтилен, вспененная пленка, картонный короб с двойным скотчем, деревянная обрешетка (кроме «Почты России»). Посылка маркируется «СТЕКЛО!!!» с реквизитами внутри.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}