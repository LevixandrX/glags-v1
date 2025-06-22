import Banner from "./components/Banner";
import ProductSlider from "./components/ProductSlider";
import PromoCardsSection from "./components/PromoCardsSection";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="flex-grow">
        {/* Секция со слайдером товаров */}
        <section className="pt-180 pb-50">
          <ProductSlider />
        </section>
        {/* Секция с промо-карточками */}
        <section className="pb-80">
          <PromoCardsSection />
        </section>
      </main>
    </>
  );
}