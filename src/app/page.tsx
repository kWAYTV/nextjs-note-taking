import CallToAction from "@/components/core/cta/call-to-action";
import Features from "@/components/core/features/features";
import FooterSection from "@/components/core/footer/footer";
import HeroSection from "@/components/core/landing/hero-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <CallToAction />
      <FooterSection />
    </main>
  );
}
