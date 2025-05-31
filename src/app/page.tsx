import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
import PromoCardsSection from "./components/PromoCardsSection";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="flex-grow">
        {/* Секция с карточкой товара */}
        <section className="pl-50 pt-180 pb-50">
          <ProductCard />
        </section>
        {/* Секция с промо-карточками */}
        <section className="pb-80">
          <PromoCardsSection />
        </section>
      </main>
    </>
  );
}