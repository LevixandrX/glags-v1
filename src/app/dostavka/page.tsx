import CTACard from "../components/CTACard";
import DeliveryBanner from "../components/DeliveryBanner";
import DeliveryAndPaymentSection from "../components/DeliveryAndPaymentSection";

export default function DeliveryPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <DeliveryBanner />
      </div>
      <main className="flex-grow">
        <section className="pt-128 pb-145">
          <DeliveryAndPaymentSection />
        </section>
      </main>
      <div className="absolute bottom-0 left-0 w-full pb-90">
        <CTACard />
      </div>
    </>
  );
}