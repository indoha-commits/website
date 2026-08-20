import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Sign up and describe your operation",
    description: "Tell us about your cargo types, the ports you work with, your typical workflows, and your team structure. This helps us configure InDataFlow for your specific needs.",
    bullets: [
      "Quick onboarding questionnaire tailored to your operation",
      "No technical knowledge or IT setup required",
      "Support available via call or chat throughout",
    ],
    image: "/how_it_works_1.mp4",
  },
  {
    number: "02",
    title: "Preview your dashboard",
    description: "See a preview of how your operation will look in InDataFlow. Review the cargo pipeline, document structure, and client portal before going live.",
    bullets: [
      "Personalized demo environment with your actual workflows",
      "See real cargo examples mapped to your operation",
      "Provide feedback and adjustments before going live",
    ],
    image: "/how_it_works_final.mp4",
  },
  {
    number: "03",
    title: "Complete setup",
    description: "Configure your milestones, document requirements, team roles, and client access levels. We help you set up everything correctly the first time.",
    bullets: [
      "Guided configuration of milestones and document types",
      "Import existing data and digital archive if needed",
      "Team training session included in every plan",
    ],
    image: "/how_it_works_2.mp4",
  },
  {
    number: "04",
    title: "Run daily operations",
    description: "Start managing real cargo from day one. Your team uses InDataFlow for every shipment, and your clients get instant visibility.",
    bullets: [
      "Begin with live cargo immediately after setup",
      "Ongoing support and regular check-ins during first month",
      "Clients access their portal for real-time shipment updates",
    ],
    image: "/homepage_The_full_picture.mp4",
  },
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <Layout>
      <PageHeader
        title="From signup to daily operations"
        description="No heavy IT. No months of implementation. InDataFlow is designed for fast onboarding and immediate daily usage."
      />

      <div ref={sectionRef}>
        <section className="section-padding bg-[#010102]">
          <div className="container-wide">
            <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
              <div className="md:col-span-3 md:sticky md:top-32 md:self-start">
                <div className="rounded-[20px] overflow-hidden border border-white/08 bg-[#0A0A0B] shadow-[0_0_40px_rgba(0,0,0,0.35)] aspect-[16/9] lg:aspect-[16/8]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      {steps[activeIndex].image.endsWith(".mp4") ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover block"
                        >
                          <source src={steps[activeIndex].image} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={steps[activeIndex].image}
                          alt={steps[activeIndex].title}
                          className="w-full h-full object-cover block"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col">
                {steps.map((step, i) => {
                  const isActive = i === activeIndex;

                  return (
                    <div
                      key={step.number}
                      className={"min-h-[60vh] flex flex-col justify-center py-12 transition-all duration-300 " + (isActive ? "opacity-100" : "opacity-65")}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={"w-10 h-10 rounded-[10px] flex items-center justify-center border transition-colors " + (isActive ? "border-[#5E6AD2] bg-[#5E6AD2]/10" : "border-white/15 bg-white/[0.03]") }>
                          <span className="text-[#5E6AD2] font-mono font-bold text-sm">{step.number}</span>
                        </div>
                        <span className="text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono">
                          Step {step.number}
                        </span>
                      </div>
                      <h2 className="text-4xl font-serif font-bold text-white mb-4">{step.title}</h2>
                      <p className="text-lg text-white/70 mb-6">{step.description}</p>
                      <ul className="space-y-3">
                        {step.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] mt-2 shrink-0" />
                            <span className="text-base text-white/70">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <ScrollAnimation>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-12 text-center tracking-[-0.02em]">
              What makes InDataFlow different
            </h2>
          </ScrollAnimation>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: "Days", label: "Not months", desc: "Go live within a week of signup" },
              { value: "Zero", label: "IT requirements", desc: "No servers, no installations, no IT team needed" },
              { value: "100%", label: "Web-based", desc: "Access from any device, anywhere" },
            ].map((item, index) => (
              <ScrollAnimation key={item.value} animation="fade-up" delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">{item.value}</div>
                  <div className="text-lg text-white mb-1">{item.label}</div>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
            Ready to get started?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Book a call and we'll walk you through the entire process.
          </p>
          <Button asChild className="inline-flex items-center gap-2">
            <Link to="/contact">
              Book a walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
