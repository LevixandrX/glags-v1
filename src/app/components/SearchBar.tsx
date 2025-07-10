"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику поиска
  };

  return (
    <div className="w-full flex flex-col items-center py-16">
      <div className="w-full max-w-2xl mx-auto">
        {/* Фоновый прямоугольник */}
        <div className="relative w-full flex items-center justify-center" style={{ height: '70px' }}>
          <div className="absolute inset-0 w-full h-full rounded-[20px]" style={{ background: '#9A7AD4' }} />
          {/* Поле ввода сдвинуто влево, справа "обводка" */}
          <form onSubmit={handleSearch} className="relative z-10 w-[89%] h-[92%] flex items-center mr-[67px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Фигурка динозавра..."
              className="flex-1 h-full rounded-[20px] bg-[#1E1E1E] text-white placeholder:italic placeholder:text-white/70 px-6 text-xl focus:outline-none focus:ring-2 focus:ring-[#9A7AD4] border-none"
            />
          </form>
          {/* Иконка поиска справа на фоне */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <Image
              src="/search.svg"
              alt="Search Icon"
              width={44}
              height={44}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SearchBarCatalogProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchBarCatalog({ value, onChange }: SearchBarCatalogProps) {
  const [internalValue, setInternalValue] = useState("");
  const searchValue = value !== undefined ? value : internalValue;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
    else setInternalValue(e.target.value);
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно добавить логику поиска
  };

  return (
    <div className="w-full flex flex-col items-center pb-4">
      <div className="w-full max-w-xl mx-auto">
        <div className="relative w-full flex items-center justify-center" style={{ height: '44px' }}>
          <div className="absolute inset-0 w-full h-full rounded-[14px]" style={{ background: '#9A7AD4' }} />
          <form onSubmit={handleSearch} className="relative z-10 w-[92%] h-[92%] flex items-center mr-[42px]">
            <input
              type="text"
              value={searchValue}
              onChange={handleChange}
              placeholder="Поиск по каталогу..."
              className="flex-1 h-full rounded-[14px] bg-[#1E1E1E] text-white placeholder:italic placeholder:text-white/70 px-4 text-base focus:outline-none focus:ring-2 focus:ring-[#9A7AD4] border-none"
            />
          </form>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
            <Image
              src="/search.svg"
              alt="Search Icon"
              width={28}
              height={28}
            />
          </div>
        </div>
      </div>
    </div>
  );
}