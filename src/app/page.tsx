import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <>
      <Banner />
      <main className="flex-grow pl-50 pt-180 pb-510 font-[family-name:var(--font-geist-sans)]">
      <ProductCard />
      </main>
    </>
  );
}