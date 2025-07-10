import React from 'react';

const categories = ['Животные', 'Люди', 'Растения', 'Фэнтези', 'Украшения', 'Прочее'];
const sizes = ['Маленькие', 'Средние', 'Большие'];

interface FilterSidebarProps {
  selectedCategories: string[];
  onCategoryChange: (cat: string) => void;
  selectedSizes: string[];
  onSizeChange: (size: string) => void;
  priceMin: number | '';
  priceMax: number | '';
  onPriceChange: (min: number | '', max: number | '') => void;
  onlyDiscount: boolean;
  onOnlyDiscountChange: (val: boolean) => void;
  onReset: () => void;
}

export default function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  selectedSizes,
  onSizeChange,
  priceMin,
  priceMax,
  onPriceChange,
  onlyDiscount,
  onOnlyDiscountChange,
  onReset,
}: FilterSidebarProps) {
  return (
    <aside className="w-72 bg-zinc-900 rounded-2xl p-4 flex flex-col gap-6 text-white sticky top-8 max-h-[90vh] overflow-auto">
      <div>
        <h3 className="font-bold mb-4 text-xl">Категория</h3>
        <ul className="space-y-2 text-base font-medium">
          {categories.map((cat) => (
            <li key={cat}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => onCategoryChange(cat)}
                  className="accent-violet-500 scale-110"
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-bold mb-4 text-xl">Размер</h3>
        <div className="flex flex-col gap-2 text-base font-medium">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => onSizeChange(size)}
                className="accent-violet-500 scale-110"
              />
              {size} фигурки
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4 text-xl">Цена</h3>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            placeholder="от"
            className="w-20 rounded bg-zinc-800 px-2 py-1 text-base"
            value={priceMin}
            onChange={e => onPriceChange(e.target.value ? Number(e.target.value) : '', priceMax)}
            min={0}
          />
          <span>—</span>
          <input
            type="number"
            placeholder="до"
            className="w-20 rounded bg-zinc-800 px-2 py-1 text-base"
            value={priceMax}
            onChange={e => onPriceChange(priceMin, e.target.value ? Number(e.target.value) : '')}
            min={0}
          />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-base font-semibold">Только со скидками</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={onlyDiscount}
            onChange={e => onOnlyDiscountChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-violet-500 rounded-full peer peer-checked:bg-violet-600 transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>
      <button
        className="mt-6 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg py-2 text-base font-semibold"
        onClick={onReset}
      >
        Сбросить фильтры
      </button>
    </aside>
  );
} 