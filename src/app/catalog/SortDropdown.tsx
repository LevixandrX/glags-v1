'use client';

import React, { useState, useRef, useEffect } from 'react';

const options = [
  'Популярные',
  'Новинки',
  'Дешевле',
  'Дороже',
  'С высоким рейтингом',
  'С большими скидками',
];

interface SortDropdownProps {
  selected: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ selected, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative min-w-[250px] select-none">
      <button
        type="button"
        className={`w-full flex items-center justify-between bg-zinc-900 text-white rounded-xl px-4 py-2 border border-zinc-700 shadow-md transition focus:outline-none focus:ring-2 focus:ring-violet-500 ${open ? 'ring-2 ring-violet-500' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="truncate text-base font-medium">{selected}</span>
        <span className={`ml-2 transition-transform ${open ? 'rotate-180' : ''}`}> {/* SVG стрелка */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <ul className="absolute left-0 z-20 mt-2 w-full bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl py-2 max-h-72 overflow-auto animate-fade-in">
          {options.map((option) => (
            <li
              key={option}
              className={`px-5 py-2 cursor-pointer text-base flex items-center transition-colors
                ${selected === option ? 'bg-gradient-to-r from-[#6E44FF] to-[#9A7AD4] text-white font-semibold' : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
              {selected === option && (
                <svg className="ml-auto" width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 