import Link from "next/link";
import Image from "next/image";
import { FaStar, FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#6442d7] to-[#8368b9] text-white py-4 px-6 flex items-center justify-between rounded-b-3xl">
      {/* Логотип и название сайта */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/glags-logo_3.svg"
            alt="GLAGS Logo"
            width={56}
            height={56}
            priority
          />
          <span className="text-2xl font-bold ml-2">GLAGS.RU</span>
        </Link>
      </div>

      {/* Навигационное меню */}
      <nav className="flex space-x-8 text-base">
        <Link href="/glavnaya" className="hover:underline">Главная</Link>
        <Link href="/onas" className="hover:underline">О нас</Link>
        <Link href="/catalog" className="hover:underline">Каталог</Link>
        <Link href="/dostavka" className="hover:underline">Доставка</Link>
        <Link href="/kontakty" className="hover:underline">Контакты</Link>
      </nav>

      {/* Кнопка и элементы справа */}
      <div className="flex items-center space-x-4">
        <button className="bg-pink-600 text-white px-5 py-2 rounded-full text-base hover:bg-pink-700">
          Мобильное приложение
        </button>
        <div className="flex items-center space-x-4">
          {/* Количество баллов */}
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-400" />
            <span className="text-base">100</span>
          </div>
          {/* Войти */}
          <Link href="/login" className="flex items-center space-x-1 hover:text-gray-300">
            <FaUser />
            <span className="text-base">Войти</span>
          </Link>
          {/* Корзина */}
          <Link href="/cart" className="flex items-center space-x-1 hover:text-gray-300">
            <FaShoppingCart />
            <span className="text-base">Корзина</span>
          </Link>
        </div>
      </div>
    </header>
  );
}