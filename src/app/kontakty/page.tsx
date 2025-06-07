import ContactsBanner from "../components/ContactsBanner";
import ContactDetailsSection from "../components/ContactDetailsSection";

export default function ContactsPage() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full">
        <ContactsBanner />
      </div>
      <main className="flex-grow">
        <section className="pt-135 pb-40">
          <ContactDetailsSection />
        </section>
      </main>
    </>
  );
}