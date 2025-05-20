"use client";

import Link from "next/link";
import Image from "next/image";
import { FaStar, FaUser, FaShoppingCart, FaBars } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-[#6442d7]/80 to-[#8368b9]/80 backdrop-blur-lg text-white py-5 px-8 flex items-center justify-between rounded-b-3xl shadow-lg sticky top-0 z-50">
        {/* Лого и название сайта */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center group">
            <Image
              src="/glags-logo_3.svg"
              alt="GLAGS Logo"
              width={56}
              height={56}
            />
            <span className="text-3xl font-extrabold ml-3 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              GLAGS.RU
            </span>
          </Link>
        </div>

        {/* Навигационное меню для десктопа */}
        <nav className="hidden md:flex space-x-10 text-lg font-semibold">
          <Link
            href="/glavnaya"
            className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          >
            Главная
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/onas"
            className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          >
            О нас
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/catalog"
            className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          >
            Каталог
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/dostavka"
            className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          >
            Доставка
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            href="/kontakty"
            className="relative text-white hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          >
            Контакты
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Иконки и кнопка */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <button className="bg-pink-600 text-white px-6 py-2.5 rounded-full text-lg font-semibold hover:bg-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50">
              Мобильное приложение
            </button>
            {/* Количество баллов */}
            <div className="flex items-center space-x-2 group">
              <FaStar className="text-yellow-400 text-xl transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg font-medium">100</span>
            </div>
            <Link
              href="/login"
              className="flex items-center space-x-2 hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              <FaUser className="text-xl transition-transform duration-300 group-hover:scale-110" />
              <span className="text-lg font-medium">Войти</span>
            </Link>
            <Link
              href="/cart"
              className="flex items-center space-x-2 hover:text-white transition-all duration-300 group hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              <FaShoppingCart className="text-xl transition-transform duration-300 group-hover:scale-110" />
              <span className="text-lg font-medium">Корзина</span>
            </Link>
          </div>

          {/* Гамбургер-меню для мобильных */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <FaBars size={28} />
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`md:hidden fixed left-0 right-0 bg-gradient-to-b from-[#6442d7]/95 to-[#8368b9]/95 backdrop-blur-md text-white flex flex-col items-center space-y-5 py-8 pt-35 rounded-b-3xl shadow-lg transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform ${
          isMenuOpen ? "translate-y-0 opacity-100 z-40" : "-translate-y-full opacity-0 pointer-events-none z-40"
        }`}
      >
        <Link
          href="/glavnaya"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Главная
        </Link>
        <Link
          href="/onas"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          О нас
        </Link>
        <Link
          href="/catalog"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Каталог
        </Link>
        <Link
          href="/dostavka"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Доставка
        </Link>
        <Link
          href="/kontakty"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Контакты
        </Link>
        <Link
          href="/login"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Войти
        </Link>
        <Link
          href="/cart"
          className="text-xl font-semibold hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          onClick={toggleMenu}
        >
          Корзина
        </Link>
        <button
          className="bg-pink-600 text-white px-6 py-2.5 rounded-full text-lg font-semibold hover:bg-pink-700 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
          onClick={toggleMenu}
        >
          Мобильное приложение
        </button>
      </div>
    </>
  );
}