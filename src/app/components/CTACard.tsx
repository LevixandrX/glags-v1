"use client";

// Удаляем неиспользуемые sectionVariants, textVariants

export default function CTACard() {
  return (
    <section
      className="bg-[#6E44FF] text-white text-center py-34 px-6 pb-40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] opacity-30 pointer-events-none" />
      <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
        Хочешь удивить стеклянным шедевром?
      </h2>
      <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
        Переходи в каталог и выбери сувенир, который создаст настроение ✨
      </p>
      <div
        className="inline-block bg-white text-[#6E44FF] font-bold px-10 py-5 rounded-full text-xl hover:bg-purple-100 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 overflow-hidden relative"
        style={{ cursor: 'pointer' }}
      >
        <a href="/catalog" className="relative z-10">
          Открыть каталог
        </a>
        {/* Можно добавить простую анимацию градиента через CSS, если нужно */}
      </div>
    </section>
  );
}