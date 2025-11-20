// app/page.tsx (ou pages/index.tsx)
import AboutUs from "@/components/layout/AboutUs";
import ContactForm from "@/components/layout/ContactForm";
import DeliveryInfo from "@/components/layout/DeliveryInfo";
import HeroSection from "@/components/layout/HeroSection";
import ServicesOverview from "@/components/layout/ServicesOverview";
import RepairCategories from "@/components/layout/RepairCategories";
import Testimonials from "@/components/layout/Testimonials";

import BotoesInf from "@/components/ui/BotoesInf";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ServicesOverview />
        <DeliveryInfo />
        <RepairCategories />
        <AboutUs />
        <Testimonials />
        <ContactForm />
        <BotoesInf/>
      </main>
    </>
  );
}



