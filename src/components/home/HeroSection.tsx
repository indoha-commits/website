import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center bg-[#010102]">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/14294690_3840_2160_24fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010102]/10 via-[#010102]/20 to-[#010102]/40" />
      </div>

      <div className="container-wide relative z-10 py-16 sm:py-20 md:py-24 lg:py-28 text-center">
        <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6 max-w-5xl mx-auto">
          Cargo operations, connected.
        </h1>
        <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto mb-4">
          InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record.
        </p>
        <p className="text-base sm:text-lg leading-[1.6] text-white/55 max-w-3xl mx-auto mb-8">
          Built for freight forwarders, clearing agents and logistics teams operating across East Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="hero" className="animate-cta-glow">
            <Link to="/contact">Book a walkthrough</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/resources">Read workflow resources</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#010102] to-transparent pointer-events-none z-10" />
    </section>
  );
}
