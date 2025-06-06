export default function DeliveryPage() {
    return (
      <div className="bg-[#0A0A0A] text-white">
        <section className="bg-gradient-to-r from-[#6E44FF] to-[#9A7AD4] text-center py-28 px-6 md:px-12 shadow-[0_0_60px_20px_rgba(106,40,255,0.3)]">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            Оплата и доставка
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
            Безопасная оплата и доставка по всему миру — надёжно, быстро, удобно.
          </p>
        </section>
  
        <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto space-y-12">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-purple-300">Способы оплаты</h2>
            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-white/10 text-white/80 leading-relaxed shadow transition hover:shadow-purple-500/20">
              <ul className="list-disc pl-6 space-y-3">
                <li>Банковский перевод (по счёту на почту)</li>
                <li>Сбербанк Онлайн по реквизитам</li>
                <li>Действует по всей России и за рубежом</li>
                <li>Оплата поступает в течение 1–2 дней</li>
              </ul>
            </div>
          </div>
  
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-pink-400">Условия доставки</h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 space-y-4 text-white/80 shadow hover:shadow-pink-500/20">
                <h3 className="text-xl font-semibold text-white">Сроки</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Готовый товар — до 3 рабочих дней</li>
                  <li>Изделия на заказ — до 1 месяца</li>
                  <li>Проектирование — 3 рабочих дня</li>
                </ul>
              </div>
              <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 space-y-4 text-white/80 shadow hover:shadow-pink-500/20">
                <h3 className="text-xl font-semibold text-white">Стоимость</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>СДЭК (СПб) — от 200₽ (ПВЗ), от 380₽ (адрес)</li>
                  <li>ТК вне списка — доп. 500–800₽</li>
                  <li>Ускоренная сборка — от 600₽</li>
                  <li>Доставка в любую точку мира</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }  