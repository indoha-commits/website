import type { LucideIcon } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type SolutionPoint = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type SolutionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  painPoints: string[];
  outcomes: string[];
  featurePoints: SolutionPoint[];
};

export function SolutionPage({
  eyebrow,
  title,
  description,
  highlights,
  painPoints,
  outcomes,
  featurePoints,
}: SolutionPageProps) {
  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4">{eyebrow}</p>
            <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto mb-8">
              {description}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#010102]">
        <div className="container-wide">
          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollAnimation>
              <div className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-8">
                <h2 className="text-2xl font-serif font-bold text-white mb-5">Where operations break down</h2>
                <ul className="space-y-3">
                  {painPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                      <span className="text-white/65 leading-[1.6]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={120}>
              <div className="rounded-[18px] border border-[#5E6AD2]/30 bg-[#0F1011] p-8 shadow-lg shadow-[#5E6AD2]/5">
                <h2 className="text-2xl font-serif font-bold text-white mb-5">What changes with InDataFlow</h2>
                <ul className="space-y-3">
                  {outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3 rounded-[12px] border border-[#5E6AD2]/15 bg-[#5E6AD2]/[0.04] p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#5E6AD2]" />
                      <span className="text-white/78 leading-[1.6]">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
                One shipment record across the workflow
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                InDataFlow keeps each document, milestone, approval and client update connected to the same cargo record.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {featurePoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <ScrollAnimation key={point.title} animation="fade-up" delay={index * 90}>
                    <div className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 h-full">
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
                      <p className="text-white/65 leading-[1.7]">{point.description}</p>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">See the workflow in context</h2>
            <p className="text-lg text-white/70 mb-8">
              Explore the product and document workflow resources to see how cargo operations stay traceable from intake to client visibility.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/product/">Explore the product</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/">
                  Read workflow resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
