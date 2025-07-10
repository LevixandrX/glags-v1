"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Микро фигуры 1-2,5 см.", image: "/card-image1.png" },
  { name: "Средние фигуры 4-6 см.", image: "/card-image1.png" },
  { name: "Крупные фигуры 6-15 см.", image: "/card-image1.png" },
  { name: "Композиции до 50 см.", image: "/card-image1.png" },
  { name: "Украшения из стекла, Фьюзинг", image: "/card-image1.png" },
  { name: "Эксклюзивные заказы", image: "/card-image1.png" },
];

export default function CatalogSection() {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Каталог стеклянных сувениров
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/catalog/${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="block bg-[#1A1A1A] rounded-lg p-4 text-white hover:bg-[#2A2A2A] transition-colors overflow-hidden"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <p className="text-center text-lg font-medium">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}