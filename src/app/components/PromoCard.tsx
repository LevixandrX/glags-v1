"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

interface PromoCardProps {
  text: string;
  linkText: string;
  linkBgColor: string;
  linkTextColor: string;
  shadowColor: string;
}

export default function PromoCard({
  text,
  linkText,
  linkBgColor,
  linkTextColor,
  shadowColor,
}: PromoCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const card = document.querySelector(".promo-card");
      if (card) {
        const rect = card.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.top <= window.innerHeight;
        setIsVisible(isInViewport);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[424px] 2xl:w-[466px] relative">
      {/* Черный блок с тенью */}
      <div
        className="relative z-20 bg-black text-white rounded-4xl px-18 py-10 text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-center h-28 2xl:h-36 flex flex-col justify-center"
        style={{
          boxShadow: `0 0 100px 30px ${shadowColor}`,
          backgroundColor: "#000000",
          opacity: 1,
        }}
      >
        <p
          className="leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n/g, "<br />").replace(/<b>/g, '<b class="font-medium">'),
          }}
        />
      </div>

      {/* Цветной блок с ссылкой */}
      <Link
        href="#"
        className={clsx(
          "relative z-10 block text-center font-semibold py-6.5 w-full rounded-b-4xl text-base 2xl:text-lg pt-11 2xl:pt-11",
          linkBgColor,
          linkTextColor,
          "transition-all duration-500 ease-in-out",
          isVisible ? "h-20 2xl:h-22 opacity-100" : "h-0 opacity-0"
        )}
        style={{ marginTop: "-2rem" }}
      >
        {linkText}
      </Link>
    </div>
  );
}