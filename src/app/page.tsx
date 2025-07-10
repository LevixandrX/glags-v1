import Banner from "./components/Banner";
import SliderSection from "./components/SliderSection";
import PromoCardsSection from "./components/PromoCardsSection";
import CatalogSection from "./components/CatalogSection";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="flex-grow">
        {/* Поле поиска */}
        <section className="pt-160 py-12">
        <h2 className="text-center text-4xl font-bold text-white">Поиск</h2>
          <SearchBar />
        </section>
        {/* Секция каталога */}
        <section className="py-16">
          <CatalogSection />
        </section>
        {/* Секция со слайдерами */}
        <section className="py-16">
          <SliderSection />
        </section>
        {/* Секция с промо-карточками */}
        <section className="py-16">
          <PromoCardsSection />
        </section>
        {/* Подпись под промо-карточками */}
        <section className="text-center py-16 pb-36">
          <p className="text-2xl md:text-3xl font-bold text-white">
            Воплощаем мечты в стеклянную реальность!
          </p>
        </section>
      </main>
    </>
  );
}