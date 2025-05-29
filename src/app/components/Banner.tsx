import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="absolute top-0 left-0 w-full bg-gradient-to-r from-[#6E44FF] to-[#9A7AD4] text-white pt-2 md:pt-10 md:pl-12 md:pr-0 rounded-b-3xl overflow-hidden min-h-[420px] md:min-h-[400px] lg:min-h-[400px] 2xl:min-h-[350px] z-10 pb-6 md:pb-0 shadow-[0_4px_8px_4px_rgba(53,3,101,0.5)]">
      {/* Мобильная и планшетная версия (до lg) */}
      <div className="block lg:hidden h-full relative">
        {/* Фоновое изображение */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src="/media/banner-image1.png"
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
        <div className="relative z-10 flex flex-col items-center justify-between h-full min-h-[420px] pt-25 md:pt-32 pl-0">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold leading-tight mt-8 md:mt-10 mb-3 text-center">
              GLAGS.RU — Мастерская стеклянных фигурок
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 text-center">
              От наших фигурок ваши глаза
              <br />
              станут <span className="font-bold">стеклянные!</span>
            </p>
            <div className="w-full flex justify-center mt-6 md:mt-8 mb-10 md:mb-12">
              <Link
                href="/order"
                className="px-6 py-2 md:py-2 rounded-full text-lg md:text-xl font-semibold flex items-center gap-3 border-4 border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300 shadow-lg pl-2"
              >
                <Image
                  src="/icons/truck-delivery.svg"
                  alt="Truck Icon"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-2xl md:text-2xl">Заказать</span>
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center mt-auto z-10 md:pb-6">
            <div className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-xs md:max-w-md mx-auto">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/icons/hourglass.svg"
                  alt="Clock Icon"
                  width={40}
                  height={40}
                  className="mb-1 md:mb-2"
                />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">15 лет</span>
                  <br />
                  на рынке
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/icons/verified.svg"
                  alt="Star Icon"
                  width={40}
                  height={40}
                  className="mb-1 md:mb-2"
                />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">Высокое</span>
                  <br />
                  качество
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/icons/orders.svg"
                  alt="Check Circle Icon"
                  width={40}
                  height={40}
                  className="mb-1 md:mb-2"
                />
                <p className="text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-bold text-base sm:text-lg md:text-lg">1000+</span>
                  <br />
                  заказов
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/icons/eda.svg"
                  alt="Hand Paper Icon"
                  width={40}
                  height={40}
                  className="mb-1 md:mb-2"
                />
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
      <div className="hidden lg:flex max-w-8xl mx-auto flex-row items-center justify-between gap-32 h-full overflow-visible">
        {/* Левая часть: текст + иконки */}
        <div className="w-1/2 text-left pl-8 flex flex-col h-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-10 mb-6 whitespace-nowrap">
              GLAGS.RU — Мастерская
              <br />
              стеклянных фигурок
            </h1>
            <p className="text-lg md:!text-xl lg:!text-2xl mb-30">
              От наших фигурок ваши глаза
              <br />
              станут <span className="font-bold">стеклянные!</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-auto">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/hourglass.svg"
                alt="Clock Icon"
                width={64}
                height={64}
                className="mb-3"
              />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">15 лет</span>
                <br />
                на рынке
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/verified.svg"
                alt="Star Icon"
                width={64}
                height={64}
                className="mb-3"
              />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">Высокое</span>
                <br />
                качество
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/orders.svg"
                alt="Check Circle Icon"
                width={64}
                height={64}
                className="mb-3"
              />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">1000+</span>
                <br />
                заказов
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/eda.svg"
                alt="Hand Paper Icon"
                width={64}
                height={64}
                className="mb-3"
              />
              <p className="text-sm md:text-base leading-tight">
                <span className="font-bold text-xl">Ручная</span>
                <br />
                работа
              </p>
            </div>
          </div>
        </div>
        {/* Правая часть: изображение + кнопка */}
        <div className="w-1/2 flex-shrink-0 relative flex lg:items-end 2xl:items-end justify-end pr-0 h-[615px]">
          <div className="relative min-w-[520px] right-0">
            <Image
              src="/media/banner-image1.png"
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
              className="absolute bottom-16 right-8 py-1 lg:right-20 md:mr-20 rounded-full text-lg font-semibold flex items-center border-4 border-white text-white backdrop-blur-md bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <Image
                src="/icons/truck-delivery.svg"
                alt="Truck Icon"
                width={65}
                height={65}
                className="pt-[10px] pb-[10px] pl-[10px] mr-5"
              />
              <span className="text-2xl md:text-4xl flex-1 text-center mr-3 pr-4 md:pr-6">
                Заказать
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}