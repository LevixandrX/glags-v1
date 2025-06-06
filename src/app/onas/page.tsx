import AboutBanner from "../components/AboutBanner";
import ProductionSection from "../components/ProductionSection";
import AdvantagesSection from "../components/AdvantagesSection";
import CTACard from "../components/CTACard";

export default function AboutPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <AboutBanner />
      </div>
      <main className="flex-grow">
        <section className="pt-114">
          <ProductionSection />
        </section>
        <section className="pb-123">
          <AdvantagesSection />
        </section>
      </main>
      <div className="absolute bottom-0 left-0 w-full pb-90">
        <CTACard />
      </div>
    </>
  );
}