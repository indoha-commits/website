import { useState } from "react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const demoSteps = [
  { id: "upload", title: "Upload Document", description: "Client uploads customs paperwork", action: "Document received" },
  { id: "verify", title: "Auto Verification", description: "System checks completeness", action: "Verified" },
  { id: "track", title: "Real-time Update", description: "Client sees status instantly", action: "Notified" },
];

export function MiniDemo() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-2">Interactive Demo</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              See it work in 3 steps
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Click through a real cargo workflow.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {demoSteps.map((step, index) => (
              <ScrollAnimation key={step.id} animation="fade-up" delay={index * 100}>
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-full p-6 rounded-[16px] border text-left ${
                    activeStep === index
                      ? "border-[#5E6AD2] bg-[#0F1011]"
                      : "border-white/08 bg-[#0F1011] hover:border-[#5E6AD2]/50"
                  }`}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 mb-3">{step.description}</p>
                  <div className={`text-sm font-medium ${activeStep === index ? "text-[#5E6AD2]" : "text-white/50"}`}>
                    {step.action}
                  </div>
                </button>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fade-up" delay={400}>
            <div className="mt-8 p-8 bg-[#0F1011] border border-white/08 rounded-[16px]">
              <div className="rounded-[12px] overflow-hidden">
                <img
                  src="/tt1.png"
                  alt="Upload document preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
