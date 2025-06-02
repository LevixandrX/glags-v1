"use client";

import PromoCard from "./PromoCard";
import Image from "next/image";

export default function PromoCardsSection() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4 space-y-10">
        {/* Первый ряд */}
        <div className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-17 xl:gap-35 items-center">
          {/* Карточка 1 */}
          <div className="flex items-center">
            <Image
              src="/media/violet-basket.svg"
              alt=""
              width={230}
              height={230}
              className="w-40 lg:w-36 xl:w-32 2xl:w-48 3xl:w-56 h-auto"
            />
            <PromoCard
              text="Наш каталог <b>обширен</b>, а пользоваться им <b>удобно</b>"
              linkText="В каталог"
              linkBgColor="bg-[#EA698B40]"
              linkTextColor="text-[#EA698B]"
              shadowColor="#BA506C80"
            />
          </div>

          {/* Карточка 2 */}
          <div className="flex items-center">
            <Image
              src="/media/thumb-up.svg"
              alt=""
              width={230}
              height={230}
              className="w-40 lg:w-36 xl:w-32 2xl:w-48 3xl:w-56 h-auto"
            />
            <PromoCard
              text="<b>Более тысячи</b> довольных клиентов"
              linkText="Почитать отзывы"
              linkBgColor="bg-[#65BF5D40]"
              linkTextColor="text-[#65BF5D]"
              shadowColor="#65BF5D80"
            />
          </div>
        </div>

        {/* Второй ряд */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center">
            <Image
              src="/media/quality.svg"
              alt=""
              width={230}
              height={230}
              className="w-40 lg:w-36 xl:w-32 2xl:w-48 3xl:w-56 h-auto"
            />
            <PromoCard
              text="На рынке уже <b>более 15 лет</b>, а все наши товары – <b>ручная работа</b>"
              linkText="Подробнее о нас"
              linkBgColor="bg-[#E9BB3C40]"
              linkTextColor="text-[#E9BB3C]"
              shadowColor="#DAA40F80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}