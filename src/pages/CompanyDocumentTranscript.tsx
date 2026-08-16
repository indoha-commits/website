import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getCompanyDocument, companyDocuments } from "@/data/company-documents";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export default function CompanyDocumentTranscript() {
  const { slug } = useParams();
  const document = getCompanyDocument(slug);

  if (!document) {
    return (
      <Layout>
        <section className="section-padding bg-[#010102]">
          <div className="container-wide text-center">
            <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
              Document not found.
            </h1>
            <Button asChild>
              <Link to="/company-documentation">Back to company documents</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div>
            <Link
              to="/company-documentation"
              className="inline-flex items-center gap-2 text-sm font-mono text-white/45 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Company documents
            </Link>

            <div className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] overflow-hidden w-full">
              <div className="p-6 sm:p-8 md:p-10 border-b border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-transparent">
                <div className="inline-flex items-center gap-2 text-[#5E6AD2] text-sm font-medium px-4 py-2 rounded-full border border-[#5E6AD2]/35 bg-[#5E6AD2]/10 mb-6">
                  <FileText className="w-4 h-4" />
                  {document.eyebrow}
                </div>
                <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-5">
                  {document.title}
                </h1>
                <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl">
                  {document.description}
                </p>
                <div className="mt-7 grid sm:grid-cols-2 gap-3 max-w-2xl">
                  <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.015] p-4">
                    <p className="text-xs text-white/35 font-mono leading-[1.5]">Effective date</p>
                    <p className="text-base text-white/75 leading-[1.5]">{document.effectiveDate}</p>
                  </div>
                  <div className="rounded-[12px] border border-white/[0.06] bg-white/[0.015] p-4">
                    <p className="text-xs text-white/35 font-mono leading-[1.5]">Source</p>
                    <p className="text-base text-white/75 leading-[1.5]">Transcribed from company PDF</p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="hidden lg:block border-r border-white/[0.06] p-6 sticky top-20 self-start max-h-[calc(100svh-5rem)] overflow-y-auto">
                  <p className="text-xs text-white/35 uppercase tracking-[0.15em] font-mono mb-4">On this page</p>
                  <nav className="space-y-2">
                    {document.sections.map((section) => (
                      <a
                        key={section.id}
                        href={"#" + section.id}
                        className="block text-sm text-white/45 hover:text-white leading-[1.45] transition-colors"
                      >
                        {section.heading}
                      </a>
                    ))}
                  </nav>
                </aside>

                <article className="p-6 sm:p-8 md:p-10 xl:p-12 space-y-7">
                  {document.sections.map((section) => (
                    <section key={section.id} id={section.id} className="scroll-mt-28 rounded-[14px] border border-white/[0.06] bg-[#010102]/35 p-5 sm:p-6 md:p-7">
                      <h2 className="text-2xl font-serif font-bold text-white tracking-[-0.02em] mb-4">
                        {section.heading}
                      </h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph} className="text-base sm:text-[17px] lg:text-lg text-white/70 leading-[1.75] mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets && (
                        <ul className="space-y-3">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 rounded-[10px] border border-white/[0.06] bg-white/[0.015] p-3.5">
                              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#5E6AD2] shrink-0" />
                              <span className="text-base lg:text-[17px] text-white/70 leading-[1.65]">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </section>
                  ))}
                </article>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {companyDocuments.map((item) => (
                <Link
                  key={item.slug}
                  to={"/company-documentation/" + item.slug}
                  className={"rounded-[12px] border p-4 transition-colors " + (item.slug === document.slug ? "border-[#5E6AD2]/35 bg-[#5E6AD2]/10 text-white" : "border-white/[0.08] bg-[#0F1011] text-white/55 hover:text-white hover:border-white/20")}
                >
                  <div className="text-sm font-medium leading-[1.4]">{item.title}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-mono text-[#5E6AD2]">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
