// app/page.tsx (ou pages/index.tsx)
import AboutUs from "@/components/AboutUs";
import ContactForm from "@/components/ContactForm";
import DeliveryInfo from "@/components/DeliveryInfo";
import HeroSection from "@/components/layout/HeroSection";
import ServicesOverview from "@/components/ServicesOverview";
import RepairCategories from "@/components/RepairCategories";
import Testimonials from "@/components/Testimonials";
import TopButton from "@/components/TopButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

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
        <TopButton />
        <WhatsAppButton position='bottom-left'/>
      </main>
    </>
  );
}



