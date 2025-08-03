import CallToAction from "@/components/core/cta/call-to-action";
import Features from "@/components/core/features/features";
import HeroSection from "@/components/core/landing/hero-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <CallToAction />
    </main>
  );
}
