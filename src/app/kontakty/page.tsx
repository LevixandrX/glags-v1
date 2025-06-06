import Link from "next/link";
import { FaVk, FaInstagram, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function ContactsPage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      <section className="bg-gradient-to-br from-[#EA698B] via-[#9A7AD4] to-[#6E44FF] text-center py-28 px-6 md:px-12 shadow-[0_0_60px_20px_rgba(106,40,255,0.3)]">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
          Контакты
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-white/80">
          Всегда на связи. Ответим, поможем, доставим.
        </p>
      </section>

      <section className="py-20 px-6 md:px-16 max-w-4xl mx-auto space-y-10">
        <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 space-y-4 text-white/80 shadow hover:shadow-violet-500/20">
          <h2 className="text-2xl font-semibold text-purple-300">Время работы</h2>
          <p>Пн – Пт: 10:00–19:00<br />Сб, Вс — выходные<br />Письма принимаются круглосуточно</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaPhone /> Телефоны
            </h3>
            <p>+7 (812) 642 32 17 — опт и розница</p>
            <p>+7 (812) 642 82 70 — эксклюзивные (временно не работает)</p>
          </div>
          <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 text-white/80 shadow space-y-3">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaMapMarkerAlt /> Адрес
            </h3>
            <p>60.111791, 30.335919<br />Остановка «Берёзка», м. Просвещения / Парнас</p>
          </div>
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-white/10 shadow text-white/80 space-y-6">
          <div className="flex items-center gap-6 text-3xl">
            <Link href="https://vk.com/glags2" target="_blank" className="hover:text-violet-400 transition"><FaVk /></Link>
            <Link href="https://www.instagram.com/glags.ru/" target="_blank" className="hover:text-pink-400 transition"><FaInstagram /></Link>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-white">Реквизиты</h4>
            <p className="text-sm leading-relaxed">
              ИП Левитина Оксана Юрьевна<br />
              ИНН: 780210093241<br />
              ОГРН: 312784701900171<br />
              Банк: АО &quot;Т-БАНК&quot;<br />
              Р/с: 40802810300006052315<br />
              БИК: 7710140679<br />
              Кор/счет: 30101810145250000974
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}