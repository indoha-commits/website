import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { companyDocuments } from "@/data/company-documents";
import { ArrowRight, FileText, LockKeyhole, Mail, Scale, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  terms: Scale,
  privacy: LockKeyhole,
  contact: Mail,
  security: ShieldCheck,
};

export default function CompanyDocumentation() {
  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto text-center">
            <ScrollAnimation>
              <div className="inline-flex items-center gap-2 text-[#5E6AD2] text-sm font-medium px-4 py-2 rounded-full border border-[#5E6AD2]/35 bg-[#5E6AD2]/10 mb-6">
                <FileText className="w-4 h-4" />
                Company Documentation
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={100}>
              <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
                Legal, privacy, contact and security documents.
              </h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto">
                Read the current public InDataFlow company documents directly on the website. Each section opens a full text transcription of the original document.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#010102]">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {companyDocuments.map((doc, index) => {
              const Icon = iconMap[doc.icon];
              return (
                <ScrollAnimation key={doc.id} animation="fade-up" delay={index * 80} className="flex">
                  <Link
                    id={doc.id}
                    to={"/company-documentation/" + doc.slug}
                    className="group flex w-full flex-col rounded-[16px] border border-white/[0.08] bg-[#0F1011] p-6 sm:p-7 hover:border-[#5E6AD2]/35 hover:-translate-y-0.5 transition-all duration-300 scroll-mt-28"
                  >
                    <div className="flex items-start justify-between gap-5 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-1 leading-[1.4]">
                            {doc.eyebrow}
                          </p>
                          <h2 className="text-2xl font-serif font-bold text-white tracking-[-0.02em]">
                            {doc.title}
                          </h2>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/35 group-hover:text-[#5E6AD2] group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                    </div>

                    <p className="text-base text-white/70 leading-[1.7] mb-5">
                      {doc.summary}
                    </p>

                    <ul className="space-y-3 mb-6 flex-grow">
                      {doc.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.015] p-3.5">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shrink-0" />
                          <span className="text-[15px] text-white/65 leading-[1.55]">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-white/[0.06]">
                      <div>
                        <p className="text-xs text-white/35 font-mono leading-[1.5]">Effective date</p>
                        <p className="text-sm text-white/65 leading-[1.5]">{doc.effectiveDate}</p>
                      </div>
                      <span className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-white/10 px-4 py-2 text-sm font-mono text-white/75 group-hover:border-[#5E6AD2]/35 group-hover:text-white transition-colors">
                        Read page
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#010102]">
        <div className="container-wide">
          <div className="rounded-[16px] border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-7 sm:p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              Need a specific document?
            </h2>
            <p className="text-base text-white/70 leading-[1.7] mb-6">
              For privacy requests, customer enquiries or security reports, contact InDataFlow using the published company contact details.
            </p>
            <Button asChild>
              <a href="mailto:indoha@indataflow.com">Contact InDataFlow</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
