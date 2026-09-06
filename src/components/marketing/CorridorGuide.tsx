import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ExternalLink, FileCheck2, Route, ShieldAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";

export type CorridorStage = {
  phase: string;
  title: string;
  owner: string;
  trigger: string;
  actions: string[];
  evidence: string[];
  handoff: string;
};

export type CorridorGuideData = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  route: string[];
  scope: string;
  operatingRule: string;
  stages: CorridorStage[];
  documents: Array<{ name: string; control: string; evidence: string }>;
  exceptions: Array<{ signal: string; response: string; release: string }>;
  sources: Array<{ title: string; organisation: string; href: string; use: string }>;
  related: Array<{ title: string; href: string }>;
};

export function CorridorGuide({ guide }: { guide: CorridorGuideData }) {
  return (
    <Layout>
      <article className="bg-[#010102]">
        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl">
              <p className="mb-4 text-sm font-mono uppercase tracking-[0.15em] text-[#5E6AD2]">{guide.eyebrow}</p>
              <h1 className="mb-6 max-w-4xl text-4xl font-bold font-serif leading-[1.15] tracking-[-0.03em] text-white md:text-6xl">
                {guide.title}
              </h1>
              <p className="max-w-3xl text-lg leading-[1.7] text-white/70 sm:text-xl">{guide.description}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/55">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">Operator playbook</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">Import workflow</span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">Reviewed 4 September 2026</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-wide">
            <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-[18px] border border-[#5E6AD2]/25 bg-[#0F1011] p-7 sm:p-8">
                <div className="mb-5 flex items-center gap-3 text-[#5E6AD2]">
                  <Route className="h-5 w-5" />
                  <p className="text-sm font-mono uppercase tracking-[0.15em]">Route control points</p>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2">
                  {guide.route.map((point, index) => (
                    <li key={point} className="flex items-start gap-3 rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5E6AD2]/12 text-xs font-bold text-[#5E6AD2]">
                        {index + 1}
                      </span>
                      <span className="pt-0.5 text-white/78">{point}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="space-y-5">
                <div className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.15em] text-white/40">Scope</p>
                  <p className="leading-[1.7] text-white/72">{guide.scope}</p>
                </div>
                <div className="rounded-[18px] border border-[#5E6AD2]/25 bg-[#5E6AD2]/[0.055] p-7">
                  <p className="mb-3 text-xs font-mono uppercase tracking-[0.15em] text-[#8B94FF]">Operating rule</p>
                  <p className="font-medium leading-[1.7] text-white/86">{guide.operatingRule}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl">
              <div className="mb-10 max-w-3xl">
                <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-[#5E6AD2]">End-to-end workflow</p>
                <h2 className="text-3xl font-bold font-serif tracking-[-0.02em] text-white sm:text-4xl">What must happen, who owns it, and what proves completion</h2>
              </div>
              <div className="space-y-5">
                {guide.stages.map((stage, index) => (
                  <section key={stage.phase} className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 sm:p-8">
                    <div className="grid gap-7 lg:grid-cols-[190px_1fr]">
                      <div>
                        <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#5E6AD2]/12 text-sm font-bold text-[#5E6AD2]">{index + 1}</span>
                        <p className="mb-2 text-xs font-mono uppercase tracking-[0.14em] text-white/35">{stage.phase}</p>
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                        <div className="mt-5 flex items-start gap-2 text-sm text-white/55">
                          <Users className="mt-0.5 h-4 w-4 shrink-0 text-[#5E6AD2]" />
                          <span>Owner: {stage.owner}</span>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <p className="mb-2 text-xs font-mono uppercase tracking-[0.14em] text-white/35">Start condition</p>
                          <p className="leading-[1.7] text-white/72">{stage.trigger}</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                          <div>
                            <p className="mb-3 text-xs font-mono uppercase tracking-[0.14em] text-white/35">Actions</p>
                            <ul className="space-y-2.5">
                              {stage.actions.map((action) => (
                                <li key={action} className="flex gap-2.5 text-[15px] leading-[1.65] text-white/68">
                                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#5E6AD2]" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="mb-3 text-xs font-mono uppercase tracking-[0.14em] text-white/35">Evidence to retain</p>
                            <ul className="space-y-2.5">
                              {stage.evidence.map((item) => (
                                <li key={item} className="flex gap-2.5 text-[15px] leading-[1.65] text-white/68">
                                  <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-[#5E6AD2]" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="rounded-[12px] border border-[#5E6AD2]/18 bg-[#5E6AD2]/[0.045] p-4">
                          <span className="text-xs font-mono uppercase tracking-[0.12em] text-[#8B94FF]">Handoff gate · </span>
                          <span className="text-[15px] leading-[1.65] text-white/78">{stage.handoff}</span>
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-3xl font-bold font-serif tracking-[-0.02em] text-white sm:text-4xl">Shipment file control matrix</h2>
              <div className="overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0F1011]">
                <div className="hidden grid-cols-[0.8fr_1.25fr_1fr] gap-5 border-b border-white/[0.06] px-6 py-4 text-xs font-mono uppercase tracking-[0.12em] text-white/35 md:grid">
                  <span>Record</span><span>Control</span><span>Completion evidence</span>
                </div>
                {guide.documents.map((document) => (
                  <div key={document.name} className="grid gap-3 border-b border-white/[0.06] px-6 py-5 last:border-0 md:grid-cols-[0.8fr_1.25fr_1fr] md:gap-5">
                    <p className="font-semibold text-white">{document.name}</p>
                    <p className="text-[15px] leading-[1.65] text-white/65">{document.control}</p>
                    <p className="text-[15px] leading-[1.65] text-white/65">{document.evidence}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-[#5E6AD2]" />
                <h2 className="text-3xl font-bold font-serif tracking-[-0.02em] text-white sm:text-4xl">Exception playbook</h2>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                {guide.exceptions.map((item) => (
                  <section key={item.signal} className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-6">
                    <p className="mb-3 text-xs font-mono uppercase tracking-[0.13em] text-[#8B94FF]">Signal</p>
                    <h3 className="mb-5 text-lg font-bold text-white">{item.signal}</h3>
                    <p className="mb-2 text-xs font-mono uppercase tracking-[0.13em] text-white/35">Response</p>
                    <p className="mb-5 text-[15px] leading-[1.65] text-white/65">{item.response}</p>
                    <p className="mb-2 text-xs font-mono uppercase tracking-[0.13em] text-white/35">Release condition</p>
                    <p className="text-[15px] leading-[1.65] text-white/75">{item.release}</p>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 sm:p-9">
              <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-[#5E6AD2]">Primary sources</p>
              <h2 className="mb-3 text-3xl font-bold font-serif tracking-[-0.02em] text-white">Verify the live requirement before filing</h2>
              <p className="mb-8 max-w-3xl leading-[1.7] text-white/62">
                This is an operations-control guide, not a substitute for a licensed clearing agent or a commodity-specific ruling. Procedures, tariffs and permits can change; use the linked authority for the current legal requirement.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {guide.sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="rounded-[14px] border border-white/[0.07] bg-white/[0.02] p-5 transition-colors hover:border-[#5E6AD2]/35">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="font-bold text-white">{source.title}</h3>
                      <ExternalLink className="h-4 w-4 shrink-0 text-[#5E6AD2]" />
                    </div>
                    <p className="mb-3 text-sm text-white/42">{source.organisation}</p>
                    <p className="text-sm leading-[1.6] text-white/62">{source.use}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <div className="mx-auto max-w-5xl rounded-[18px] border border-[#5E6AD2]/25 bg-gradient-to-b from-[#5E6AD2]/[0.08] to-transparent p-8">
              <h2 className="mb-4 text-3xl font-bold font-serif text-white">Make every handoff traceable</h2>
              <p className="mb-7 max-w-3xl text-lg leading-[1.7] text-white/68">InDataFlow keeps documents, reviews, releases, corridor events and client updates tied to the same shipment record.</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild><Link to="/contact/">Book a workflow review <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline"><Link to="/resources/">Browse all resources</Link></Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {guide.related.map((item) => <Link key={item.href} to={item.href} className="text-sm text-[#8B94FF] hover:text-white">{item.title} →</Link>)}
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
