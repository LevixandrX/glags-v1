import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="bg-gray-800/50 rounded-xl p-12 text-center border border-gray-700/50">
      <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Ваша корзина пуста</h2>
      <p className="text-gray-400 mb-6">Добавьте товары из каталога, чтобы начать покупки</p>
      <Link 
        href="/catalog" 
        className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
      >
        Перейти в каталог
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
} 