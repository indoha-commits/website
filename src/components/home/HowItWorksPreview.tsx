import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  { number: "01", title: "Describe your operation", description: "Tell us how your cargo workflows run today." },
  { number: "02", title: "Preview your dashboard", description: "See exactly how InDataFlow fits your operation before going live." },
  { number: "03", title: "Complete setup", description: "We configure documents, milestones, and client access." },
  { number: "04", title: "Run daily operations", description: "Manage cargo with clarity from day one." },
];

export function HowItWorksPreview() {
  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">How it works</h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              From signup to daily operations in days, not months.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.title} animation="fade-up" delay={index * 100} className="flex">
              <div className="bg-[#0F1011] rounded-[12px] p-4 border border-white/08 flex flex-col h-full hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
                <span className="font-mono text-xs text-white/30 tabular-nums mb-2">{step.number}</span>
                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{step.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
