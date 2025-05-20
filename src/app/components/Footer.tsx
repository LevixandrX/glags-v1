import Link from "next/link";
import Image from "next/image";
import { FaVk, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 md:px-6 rounded-t-3xl border-t-2 border-t-purple-500">
      <div className="max-w-full md:max-w-6xl mx-auto border-b border-gray-700 pb-8">
        {/* Верхняя часть: Первые две колонки и третья (адаптивно) */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-start space-y-6 md:space-y-0">
          {/* Первые две колонки (рядом на мобильных) */}
          <div className="flex flex-row justify-center md:flex-[2] space-x-4 md:space-x-0">
            {/* Первая колонка */}
            <div className="flex-1 text-right md:text-right">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/tech"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Каталог товаров
                    <span className="absolute right-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tech"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Технологии изготовления
                    <span className="absolute right-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivery"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Доставка и оплата
                    <span className="absolute right-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Вертикальный разделитель */}
            <div className="border-l border-gray-700 ml-1 mr-4 md:ml-20"></div>

            {/* Вторая колонка */}
            <div className="flex-1 text-left md:text-center">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/order"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Оптовым покупателям
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-white scale-x-0 group-hover:w-full group-hover:scale-x-100 origin-center transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/order"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Как сделать заказ?
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-white scale-x-0 group-hover:w-full group-hover:scale-x-100 origin-center transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warranty"
                    className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                  >
                    Гарантии и сроки
                    <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[2px] bg-white scale-x-0 group-hover:w-full group-hover:scale-x-100 origin-center transition-all duration-300"></span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Вертикальный разделитель (только на десктопе между второй и третьей) */}
            <div className="hidden md:block border-l border-gray-700 mr-15"></div>
          </div>

          {/* Третья колонка (ниже на мобильных, в ряду на десктопе) */}
          <div className="flex-1 text-center md:text-left md:flex-[1]">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/cart"
                  className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                >
                  Контакты
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-lg"
                >
                  Корзина
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="max-w-full md:max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between pt-10 space-y-6 md:space-y-0">
        {/* Контакты (сверху на мобильных) */}
        <div className="flex flex-col items-end text-right order-first md:order-last">
          <div className="mb-4">
            <p className="text-2xl md:text-lg font-bold">
              Пн. – Пт. 10:00 - 19:00<br />
              +7 (812) 642-32-17
            </p>
          </div>
          <div className="flex justify-end space-x-4 mb-4">
            <Link href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <FaVk size={36} className="md:w-6 md:h-6" />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <FaInstagram size={36} className="md:w-6 md:h-6" />
            </Link>
            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              <FaTiktok size={36} className="md:w-6 md:h-6" />
            </Link>
          </div>
        </div>

        {/* Лого и текст (снизу на мобильных) */}
        <div className="flex flex-col items-start order-last md:order-first">
          <Link href="/" className="flex items-center space-x-3 mb-4 group">
            <Image
              src="/glags-logo_3.svg"
              alt="GLAGS Logo"
              width={48}
              height={48}
              className="md:w-8 md:h-8"
            />
            <span className="text-3xl md:text-xl font-bold transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              GLAGS.RU
            </span>
          </Link>
          <p className="text-base md:text-sm text-gray-400 leading-relaxed">
            © 2005-2025 Glags.ru<br />
            Индивидуальный предприниматель<br />
            Левитина Оксана Юрьевна
          </p>
        </div>
      </div>
    </footer>
  );
}