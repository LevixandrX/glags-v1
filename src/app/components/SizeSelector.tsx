import clsx from 'clsx';

interface SizeSelectorProps {
  sizes: Array<{ label: string }>;
  selectedSize: number;
  setSelectedSize: (idx: number) => void;
}

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) {
  return (
    <div>
      <div className="text-white/50 text-lg mb-3">Размеры</div>
      <div className="flex flex-row gap-3">
        {sizes.map((size, idx) => (
          <button
            key={size.label}
            className="relative w-[87px] h-[35px] flex items-center justify-center p-0 bg-transparent group cursor-pointer"
            style={{ outline: 'none', border: 'none' }}
            onClick={() => setSelectedSize(idx)}
          >
            {/* Нижний прямоугольник (бордер) */}
            <div
              className={clsx(
                'absolute z-0 w-[93px] h-[41px] transition-colors duration-150 rounded-[18px]',
                idx === selectedSize
                  ? 'bg-[#6E44FF] group-hover:bg-[#8C6CFF]'
                  : 'bg-[#7D7D7D] group-hover:bg-[#A0A0A0]'
              )}
            />
            {/* Верхний прямоугольник (сама кнопка) */}
            <div
              className="relative z-10 w-[87px] h-[35px] flex items-center justify-center rounded-[16px] bg-black"
            >
              <span className="text-white text-base font-medium select-none mt-0.5">{size.label} см</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 