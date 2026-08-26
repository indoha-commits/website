import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

type ResourceArticleProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export function ResourceArticle({ eyebrow, title, description, steps, sections }: ResourceArticleProps) {
  return (
    <Layout>
      <article>
        <section className="section-padding bg-[#010102]">
          <div className="container-wide">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4">{eyebrow}</p>
              <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
                {title}
              </h1>
              <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding pt-0 bg-[#010102]">
          <div className="container-wide">
            <div className="mx-auto max-w-4xl rounded-[18px] border border-[#5E6AD2]/25 bg-[#0F1011] p-8 shadow-lg shadow-[#5E6AD2]/5">
              <p className="text-sm uppercase tracking-[0.15em] font-mono text-[#5E6AD2] mb-5">Operational flow</p>
              <div className="grid gap-3 md:grid-cols-4">
                {steps.map((step) => (
                  <div key={step} className="rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4 text-white/78 leading-[1.6]">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#010102]">
          <div className="container-wide">
            <div className="mx-auto max-w-4xl space-y-5">
              {sections.map((section) => (
                <section key={section.title} className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 sm:p-8">
                  <h2 className="text-2xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">{section.title}</h2>
                  <p className="text-white/68 leading-[1.8] text-[17px]">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#010102]">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
                Turn document intake into a traceable cargo record
              </h2>
              <p className="text-lg text-white/70 mb-8">
                InDataFlow connects shipment documents, validation, cargo events, approvals and client updates in one operational workflow.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link to="/product">Explore the product</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">
                    Book a walkthrough
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
