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
    <section className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#6442d7] to-[#8368b9] text-white pt-2 md:pt-10 pl-2 pr-0 md:pl-12 md:pr-0 rounded-b-3xl overflow-hidden min-h-[420px] md:min-h-[400px] lg:min-h-[400px] xl:min-h-[350px] z-10 pb-6 md:pb-0">
      {/* Мобильная и планшетная версия (до lg) */}
      <div className="block lg:hidden h-full relative">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src="/banner-image.png"
            alt="Стеклянная фигурка"
            fill
            className="object-cover opacity-40"
            style={{
              maskImage: "linear-gradient(to bottom, black 80%, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
            }}
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-between h-full min-h-[420px] pt-25 md:pt-32">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold leading-tight mt-8 md:mt-10 mb-3 text-center">
              GLAGS.RU — Мастерская стеклянных фигурок
            </h1>
            <p className="text-base sm:text-lg md:text-lg mb-4 text-center">
              От наших фигурок ваши глаза
              <br />
              станут <span className="font-bold">стеклянными!</span>
            </p>
            <div className="w-full flex justify-center mt-6 md:mt-8 mb-10 md:mb-12">
              <Link
                href="/order"
                className="px-6 md:px-8 py-3 md:py-3 rounded-full text-lg md:text-xl font-semibold flex items-center gap-3 md:gap-4 border-4 border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <div className="bg-white p-2 md:p-2 rounded-full">
                  <FaCar className="text-gray-500 text-xl md:text-xl" />
                </div>
                <span className="text-2xl md:text-2xl">Заказать</span>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center mt-auto z-10 md:pb-6">
            <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-xs md:max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <FaRegClock className="text-4xl md:text-5xl mb-1 md:mb-2" />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">15 лет</span>
                  <br />
                  на рынке
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaStar className="text-4xl md:text-5xl mb-1 md:mb-2" />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">Высокое</span>
                  <br />
                  качество
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaCheckCircle className="text-4xl md:text-5xl mb-1 md:mb-2" />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">1000+</span>
                  <br />
                  заказов
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <FaHandPaper className="text-4xl md:text-5xl mb-1 md:mb-2" />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">Ручная</span>
                  <br />
                  работа
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Десктопная версия (только lg и выше) */}
      <div className="hidden lg:flex max-w-8xl mx-auto flex-row items-center justify-between gap-32 h-full">
        {/* Левая часть: текст + иконки */}
        <div className="w-1/2 text-left pl-8 flex flex-col h-full">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-30 mb-4 whitespace-nowrap">
              GLAGS.RU — Мастерская
              <br />
              стеклянных фигурок
            </h1>
            <p className="text-2xl md:text-3xl mb-30">
              От наших фигурок ваши глаза
              <br />
              станут <span className="font-bold">стеклянные!</span>
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-auto">
            <div className="flex flex-col items-center text-center">
              <FaRegClock className="text-6xl md:text-7xl mb-4" />
              <p className="text-base md:text-lg leading-tight">
                <span className="font-bold text-xl md:text-2xl">15 лет</span>
                <br />
                на рынке
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaStar className="text-6xl md:text-7xl mb-4" />
              <p className="text-base md:text-lg leading-tight">
                <span className="font-bold text-xl md:text-2xl">Высокое</span>
                <br />
                качество
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-6xl md:text-7xl mb-4" />
              <p className="text-base md:text-lg leading-tight">
                <span className="font-bold text-xl md:text-2xl">1000+</span>
                <br />
                заказов
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaHandPaper className="text-6xl md:text-7xl mb-4" />
              <p className="text-base md:text-lg leading-tight">
                <span className="font-bold text-xl md:text-2xl">Ручная</span>
                <br />
                работа
              </p>
            </div>
          </div>
        </div>
        {/* Правая часть: изображение + кнопка */}
        <div className="w-1/2 relative flex lg:items-center xl:items-end justify-end pr-8">
          <div className="relative">
            <Image
              src="/banner-image.png"
              alt="Стеклянная фигурка"
              width={700}
              height={700}
              className="object-contain drop-shadow-2xl transform scale-110"
              style={{
                maskImage: "linear-gradient(to bottom, black 80%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
              }}
              priority
            />
            <Link
              href="/order"
              className="absolute lg:top-100 xl:top-120 top-135 right-30 px-12 py-4 rounded-full text-xl md:text-2xl font-semibold flex items-center gap-4 border-4 border-white text-white backdrop-blur-md bg-white/20 hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <div className="bg-white p-3 rounded-full">
                <FaCar className="text-gray-500 text-2xl md:text-3xl" />
              </div>
              <span className="text-2xl md:text-3xl">Заказать</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}