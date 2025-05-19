import Link from "next/link";
import Image from "next/image";
import { FaVk, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6 rounded-t-3xl border-t-2 border-t-purple-500">
      {/* Основной контент футера: три столбца */}
      <div className="max-w-6xl mx-auto flex justify-between border-b border-gray-700 pb-6">
        {/* Первый столбец - выравнивание по правому краю */}
        <div className="flex-1 text-right">
          <ul className="space-y-2">
            <li>
              <Link href="/tech" className="hover:underline">Каталог товаров</Link>
            </li>
            <li>
              <Link href="/tech" className="hover:underline">Технологии изготовления</Link>
            </li>
            <li>
              <Link href="/delivery" className="hover:underline">Доставка и оплата</Link>
            </li>
          </ul>
        </div>

        {/* Разделитель */}
        <div className="border-l border-gray-700 mx-4"></div>

        {/* Второй столбец - выравнивание по центру */}
        <div className="flex-1 text-center">
          <ul className="space-y-2">
            <li>
              <Link href="/order" className="hover:underline">Оптовым покупателям</Link>
            </li>
            <li>
              <Link href="/order" className="hover:underline">Как сделать заказ?</Link>
            </li>
            <li>
              <Link href="/warranty" className="hover:underline">Гарантии и сроки</Link>
            </li>
          </ul>
        </div>

        {/* Разделитель */}
        <div className="border-l border-gray-700 mx-4"></div>

        {/* Третий столбец - выравнивание по левому краю (оставляем как есть) */}
        <div className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link href="/cart" className="hover:underline">Контакты</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:underline">Корзина</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="max-w-6xl mx-auto flex justify-between pt-6">
        {/* Логотип и текст слева */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src="/glags-logo_3.svg"
              alt="GLAGS Logo"
              width={32}
              height={32}
              priority
            />
            <span className="text-xl font-bold">GLAGS.RU</span>
          </div>
          <p className="text-sm text-gray-400">
            © 2005-2025 Glags.ru<br />
            Индивидуальный предприниматель<br />
            Левитина Оксана Юрьевна
          </p>
        </div>

        {/* Контакты и иконки справа - выравнивание по правому краю */}
        <div className="flex flex-col text-right">
          <p className="text-lg font-bold mb-2">
            Пн. – Пт. 10:00 - 19:00<br />
            +7 (812) 642-32-17
          </p>
          <div className="flex justify-end space-x-4">
            <Link href="https://vk.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaVk size={24} />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaTiktok size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}