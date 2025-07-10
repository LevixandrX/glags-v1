'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { SearchBarCatalog } from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import FilterSidebar from './FilterSidebar';
import SortDropdown from './SortDropdown';
import Pagination from './Pagination';
import type { Product as ProductCardType } from './types';
import { products as productsDataRaw } from './products-mock';
import type { Product as ProductMock } from './products-mock';

const sortOptions = [
  'Популярные',
  'Новинки',
  'Дешевле',
  'Дороже',
  'С высоким рейтингом',
  'С большими скидками',
];

const sizeGroups = [
  { label: 'Маленькие', min: 0, max: 10 },
  { label: 'Средние', min: 11, max: 20 },
  { label: 'Большие', min: 21, max: 100 },
];

export default function CatalogPage() {
  const PRODUCTS_PER_PAGE = 18;
  const productsData: ProductCardType[] = productsDataRaw.map((p: ProductMock) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    oldPrice: p.oldPrice,
    discount: p.oldPrice ? Math.round(100 - (p.price / p.oldPrice) * 100) : undefined,
    image: p.images[0],
    size: p.sizes[0]?.label || '',
    count: p.stock,
    category: p.category[p.category.length - 1],
  }));

  // Фильтры
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number | ''>('');
  const [priceMax, setPriceMax] = useState<number | ''>('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);

  // Поиск и сортировка
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Обработчики фильтров
  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const handlePriceChange = (min: number | '', max: number | '') => {
    setPriceMin(min);
    setPriceMax(max);
  };
  const handleOnlyDiscountChange = (val: boolean) => setOnlyDiscount(val);
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceMin('');
    setPriceMax('');
    setOnlyDiscount(false);
  };

  // Фильтрация и сортировка
  const filteredSortedProducts = useMemo(() => {
    let filtered = productsData.filter((p: ProductCardType) => {
      // Поиск
      if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      // Категории
      if (selectedCategories.length && (!p.category || !selectedCategories.includes(p.category))) return false;
      // Размеры
      if (selectedSizes.length) {
        const num = parseInt(p.size);
        const match = sizeGroups.some(
          (g) => selectedSizes.includes(g.label) && num >= g.min && num <= g.max
        );
        if (!match) return false;
      }
      // Цена
      if (priceMin !== '' && p.price < priceMin) return false;
      if (priceMax !== '' && p.price > priceMax) return false;
      // Только со скидкой
      if (onlyDiscount && !p.discount) return false;
      return true;
    });
    // Сортировка
    switch (sort) {
      case 'Дешевле':
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
        break;
      case 'Дороже':
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
        break;
      case 'С большими скидками':
        filtered = filtered.slice().sort((a, b) => {
          if (a.discount && b.discount) return b.discount - a.discount;
          if (a.discount) return -1;
          if (b.discount) return 1;
          return 0;
        });
        break;
      default:
        break;
    }
    return filtered;
  }, [productsData, searchTerm, sort, selectedCategories, selectedSizes, priceMin, priceMax, onlyDiscount]);

  // Сброс страницы при изменении поиска, сортировки или фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sort, selectedCategories, selectedSizes, priceMin, priceMax, onlyDiscount]);

  const totalPages = Math.ceil(filteredSortedProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const currentProducts = filteredSortedProducts.slice(startIdx, endIdx);

  return (
    <div className="flex gap-8 py-8 px-4 max-w-[1600px] mx-auto">
      <FilterSidebar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        selectedSizes={selectedSizes}
        onSizeChange={handleSizeChange}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceChange={handlePriceChange}
        onlyDiscount={onlyDiscount}
        onOnlyDiscountChange={handleOnlyDiscountChange}
        onReset={handleResetFilters}
      />
      <div className="flex-1 flex flex-col">
        <div className="flex items-stretch mb-8 gap-4 min-h-[44px]">
          <div className="flex-1 flex items-stretch">
            <SearchBarCatalog value={searchTerm} onChange={setSearchTerm} />
          </div>
          <div className="flex items-stretch">
            <SortDropdown selected={sort} onChange={setSort} />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-6">
          {currentProducts.map((product: ProductCardType) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
} 