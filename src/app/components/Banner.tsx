import Image from "next/image";
import Link from "next/link";
import {
  FaRegClock,
  FaStar,
  FaCheckCircle,
  FaHandPaper,
  FaCar,
} from "react-icons/fa";

export default function Banner() {
  return (
    <section className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#6442d7] to-[#8368b9] text-white pt-20 pl-6 pr-0 md:pl-12 md:pr-0 rounded-b-3xl overflow-hidden min-h-[400px] md:min-h-[500px] z-10">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-between gap-100">
        {/* Левая часть: текст + иконки */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-10 mb-6">
            GLAGS.RU — Мастерская
            <br />
            стеклянных фигурок
          </h1>
          <p className="text-lg md:text-2xl mb-30">
            От наших фигурок ваши глаза
            <br />
            станут <span className="font-bold">стеклянными!</span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <FaRegClock className="text-6xl mb-3" />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">15 лет</span>
                <br />
                на рынке
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaStar className="text-6xl mb-3" />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">Высокое</span>
                <br />
                качество
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-6xl mb-3" />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">1000+</span>
                <br />
                заказов
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaHandPaper className="text-6xl mb-3" />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">Ручная</span>
                <br />
                работа
              </p>
            </div>
          </div>
        </div>
        {/* Правая часть: изображение + кнопка */}
        <div className="w-full md:w-1/2 relative flex items-end justify-end">
          <div className="relative">
            <Image
              src="/banner-image.png"
              alt="Стеклянная фигурка"
              width={610}
              height={615}
              className="object-contain drop-shadow-xl"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
              }}
              priority
            />

            <Link
              href="/order"
              className="absolute bottom-10 left-6 px-10 py-3 rounded-full text-lg font-semibold flex items-center gap-3 border-4 border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <div className="bg-white p-3 rounded-full">
                <FaCar className="text-gray-500 text-2xl" />
              </div>
              <span className="text-3xl">Заказать</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}