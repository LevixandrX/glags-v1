import Image from 'next/image';
import Link from 'next/link';

interface BreadcrumbsProps {
  category: string[];
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
  // Для примера: путь назад всегда ведет на каталог
  return (
    <div className="flex items-center gap-2 text-sm text-gray-300 mb-4 w-full">
      <Link href="/catalog" className="flex items-center group">
        <span className="inline-block p-1 mr-2">
          <Image src="/icons/arrow_back.svg" alt="Назад" width={30} height={30} className="group-hover:scale-110 transition-transform" />
        </span>
        <span className="hidden sm:inline text-[#6E44FF] font-medium">Назад</span>
      </Link>
      <span className="mx-1 text-gray-400">/</span>
      {category.map((cat, idx) => (
        <span key={cat} className="flex items-center">
          <span>{cat}</span>
          {idx < category.length - 1 && <span className="mx-1 text-gray-400">/</span>}
        </span>
      ))}
    </div>
  );
} 