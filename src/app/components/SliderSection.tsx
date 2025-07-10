"use client";

import ProductSlider from "./ProductSlider";
import { products } from '../catalog/products-mock';

export default function SliderSection() {
  // Новое — последние 8 товаров
  const newProducts = [...products].slice(-8).map(p => ({
    id: p.id, // добавлено поле id
    title: p.title,
    price: p.price,
    oldPrice: p.oldPrice,
    discount: p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : undefined,
    image: p.images[0],
    size: p.sizes[0]?.label || '',
    count: p.stock,
  }));
  // Популярное — топ-8 по рейтингу и отзывам
  const popularProducts = [...products]
    .sort((a, b) => (b.rating + b.reviewsCount / 100) - (a.rating + a.reviewsCount / 100))
    .slice(0, 8)
    .map(p => ({
      id: p.id, // добавлено поле id
      title: p.title,
      price: p.price,
      oldPrice: p.oldPrice,
      discount: p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : undefined,
      image: p.images[0],
      size: p.sizes[0]?.label || '',
      count: p.stock,
    }));

  const sliders = [
    { id: 'new', title: 'Новое', products: newProducts },
    { id: 'popular', title: 'Популярное', products: popularProducts },
  ];

  return (
    <div className="space-y-24">
      {sliders.map((slider) => (
        <ProductSlider key={slider.id} title={slider.title} products={slider.products} />
      ))}
    </div>
  );
}