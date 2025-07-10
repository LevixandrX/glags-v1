"use client";

import Image from "next/image";
// Удаляем импорт motion
// import { motion } from "framer-motion";

// Удаляем неиспользуемые sectionVariants, cardVariants, textVariants

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
    <section
      className="py-38 bg-gradient-to-b from-[#1B1B1B] to-[#111] shadow-[0_0_100px_1px_rgba(106,40,255,0.4)] relative z-50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
          Почему выбирают GLAGS
        </h2>
        <div className="grid gap-10 mb-10 md:grid-cols-2 xl:grid-cols-3">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="relative bg-[#1f1f1f] rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] p-12 min-h-56 min-w-[320px] border border-white/10 hover:border-purple-500 hover:shadow-purple-500/40 transition-all duration-500 group overflow-hidden"
            >
              {/* Фоновое изображение для всех карточек, где есть картинки */}
              {(index === 0 || index === 1 || index === 2 || index === 3 || index === 4 || index === 5) && (
                <div
                  className={`absolute pointer-events-none select-none z-0 
                    ${index === 1 ? 'right-[-35px] bottom-[-24px] w-32 h-32 md:bottom-[-24px] md:w-40 md:h-40' :
                      index === 3 ? 'right-[-24px] bottom-[-36px] w-40 h-40 md:bottom-[-36px] md:w-52 md:h-52' :
                      index === 5 ? 'right-[-24px] bottom-[-48px] w-40 h-40 md:bottom-[-48px] md:w-52 md:h-52' :
                      index === 4 ? 'right-[-48px] bottom-[-24px] w-32 h-32 md:bottom-[-24px] md:w-40 md:h-40' :
                      'right-[-24px] bottom-[-24px] w-32 h-32 md:bottom-[-24px] md:w-40 md:h-40'}`}
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
                    maskImage:
                      'linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 100%)',
                  }}
                >
                  <Image
                    src={
                      index === 0 ? "/clock-3d_1.png" :
                      index === 1 ? "/gold-thumb-up1.png" :
                      index === 2 ? "/basket1.png" :
                      index === 3 ? "/handmade1.png" :
                      index === 4 ? "/glagsik1.png" :
                      "/delivery-car2.png"
                    }
                    alt={
                      index === 0 ? "Clock 3D" :
                      index === 1 ? "Gold Thumb Up" :
                      index === 2 ? "Basket" :
                      index === 3 ? "Handmade" :
                      index === 4 ? "Glagsik" :
                      "Delivery Car"
                    }
                    fill
                    style={{ objectFit: 'contain', ...(index === 1 ? { transform: 'scaleX(-1) rotate(-20deg)' } : {}) }}
                    className="z-0"
                    sizes="(max-width: 768px) 128px, 160px"
                  />
                </div>
              )}
              <div
                className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={48}
                  height={48}
                  className="mx-auto mb-5 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300 relative z-10">
                {item.title}
              </h3>
              <p
                className="text-sm text-white/70 relative z-10"
                style={{
                  textShadow: `
                     1px 1px 0 #1F1F1F,
                     -1px -1px 0 #1F1F1F,
                     1px -1px 0 #1F1F1F,
                     -1px 1px 0 #1F1F1F,
                     0 1px 0 #1F1F1F,
                     1px 0 0 #1F1F1F,
                     0 -1px 0 #1F1F1F,
                     -1px 0 0 #1F1F1F
                   `,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}