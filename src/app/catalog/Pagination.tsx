'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const WINDOW_SIZE = 5;
const SHIFT_SIZE = 2;

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const [windowStart, setWindowStart] = useState(1);

  useEffect(() => {
    // Если текущая страница вышла за окно, сдвигаем окно
    if (currentPage < windowStart) {
      setWindowStart(currentPage);
    } else if (currentPage >= windowStart + WINDOW_SIZE) {
      setWindowStart(currentPage - WINDOW_SIZE + 1);
    }
    // Если страниц стало меньше — сбрасываем окно
    if (windowStart > totalPages - WINDOW_SIZE + 1) {
      setWindowStart(Math.max(1, totalPages - WINDOW_SIZE + 1));
    }
  }, [currentPage, totalPages, windowStart]);

  if (totalPages <= 1) return null;

  // Вычисляем номера страниц для отображения
  const maxStart = Math.max(1, totalPages - WINDOW_SIZE + 1);
  const end = Math.min(windowStart + WINDOW_SIZE - 1, totalPages);

  const pages: (number | 'left-ellipsis' | 'right-ellipsis')[] = [];
  // Левая часть
  if (windowStart > 1) {
    pages.push(1);
    if (windowStart > 2) pages.push('left-ellipsis');
  }
  // Основное окно
  for (let i = windowStart; i <= end; i++) {
    pages.push(i);
  }
  // Правая часть
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('right-ellipsis');
    pages.push(totalPages);
  }

  // Обработчики троеточий
  const handleLeftEllipsis = () => {
    setWindowStart(Math.max(1, windowStart - SHIFT_SIZE));
  };
  const handleRightEllipsis = () => {
    setWindowStart(Math.min(maxStart, windowStart + SHIFT_SIZE));
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 select-none bg-transparent">
      {/* Левая стрелка */}
      <button
        className="w-10 h-10 flex items-center justify-center text-white disabled:opacity-40 transition"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <Image src="/icons/arrow-left_pag.svg" alt="prev" width={28} height={28} />
      </button>
      {/* Страницы и троеточия */}
      {pages.map((page, idx) => {
        if (page === 'left-ellipsis') {
          return (
            <button
              key={"left-ellipsis" + idx}
              className="w-10 h-10 flex items-center justify-center"
              onClick={handleLeftEllipsis}
              aria-label="Показать предыдущие страницы"
              type="button"
            >
              <Image src="/icons/3ellipsis.svg" alt="..." width={28} height={28} />
            </button>
          );
        }
        if (page === 'right-ellipsis') {
          return (
            <button
              key={"right-ellipsis" + idx}
              className="w-10 h-10 flex items-center justify-center"
              onClick={handleRightEllipsis}
              aria-label="Показать следующие страницы"
              type="button"
            >
              <Image src="/icons/3ellipsis.svg" alt="..." width={28} height={28} />
            </button>
          );
        }
        return (
          <button
            key={page as number}
            className={`w-10 h-10 flex items-center justify-center text-2xl font-semibold transition
              ${currentPage === page ? 'bg-[#9A7AD4] text-white rounded-full' : 'text-white hover:bg-zinc-800 rounded-full'}`}
            onClick={() => onPageChange(page as number)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        );
      })}
      {/* Правая стрелка */}
      <button
        className="w-10 h-10 flex items-center justify-center text-white disabled:opacity-40 transition"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        <Image src="/icons/arrow-right_pag.svg" alt="next" width={28} height={28} />
      </button>
    </div>
  );
} 