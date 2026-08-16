import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, ClipboardCheck, Clock3, FileCheck2, FolderOpen, MessageCircleQuestion, Quote, Route, ShieldCheck, TimerOff, UploadCloud, Users } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const beforeIssues = [
  { icon: ClipboardCheck, label: "Cargo status tracked in spreadsheets shared via email" },
  { icon: MessageCircleQuestion, label: "Clients calling daily to ask 'where is my shipment?'" },
  { icon: FolderOpen, label: "Documents scattered across WhatsApp, email, and local folders" },
  { icon: TimerOff, label: "No visibility into which milestone was delayed and why" },
  { icon: ShieldCheck, label: "Disputes with clients over timelines and responsibilities" },
];

const outcomes = [
  { icon: MessageCircleQuestion, metric: "70%", title: "Client communication reduced", description: "Clients access the portal instead of calling or messaging for updates." },
  { icon: UploadCloud, metric: "50%", title: "Document collection time cut", description: "Clients upload required documents directly through the portal with clear requirements." },
  { icon: ShieldCheck, metric: "~0", title: "Disputes nearly eliminated", description: "Timestamped milestone tracking provides clear accountability and evidence." },
  { icon: Users, metric: "Days", title: "New staff onboarded faster", description: "Clear workflows and centralized information make training faster and more effective." },
];

const afterOutcomes = [
  { icon: CheckCircle2, label: "Single source of truth for all active cargo" },
  { icon: BadgeCheck, label: "Clients check status themselves through their portal" },
  { icon: FileCheck2, label: "All documents uploaded, validated, and linked to cargo" },
  { icon: Clock3, label: "Clear milestone tracking with timestamps and accountability" },
  { icon: Route, label: "Transparent audit trail reduces disputes to near zero" },
];

export default function CaseStudy() {
  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation>
              <div className="inline-flex items-center gap-2 text-[#5E6AD2] text-sm font-medium px-4 py-2 rounded-full border border-[#5E6AD2]/35 bg-[#5E6AD2]/10 mb-6">
                Case Study
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={100}>
              <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
                Running real cargo operations with InDataFlow
              </h1>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto">
                How a clearing and forwarding agent transformed their operation from fragmented chaos to controlled transparency.
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 tracking-[-0.02em]">The Operation</h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                  A mid-sized clearing and forwarding agent operating in West Africa, handling cargo from port arrival through customs clearance to final warehouse delivery. The team of 12 manages approximately 150-200 shipments per month across multiple clients.
                </p>
              </div>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: BriefcaseBusiness, value: "150+", label: "Shipments/month" },
                { icon: Users, value: "12", label: "Team members" },
                { icon: BadgeCheck, value: "20+", label: "Active clients" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                <ScrollAnimation key={stat.label} animation="fade-up" delay={index * 100}>
                  <div className="bg-[#0F1011] rounded-[16px] p-6 sm:p-8 border border-white/08 text-center h-full hover:border-white/18 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 tabular-nums">{stat.value}</div>
                    <div className="text-sm text-white/55">{stat.label}</div>
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
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">The Transformation</h2>
                <p className="text-lg text-white/70 max-w-xl mx-auto">See the dramatic shift from manual chaos to streamlined operations</p>
              </div>
            </ScrollAnimation>
            <div className="grid sm:grid-cols-2 gap-6 items-stretch">
              <ScrollAnimation>
                <div className="bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-white/08 h-full">
                  <h3 className="text-xl font-bold text-white mb-5">Before InDataFlow</h3>
                  <ul className="space-y-3">
                    {beforeIssues.map((issue) => {
                      const Icon = issue.icon;
                      return (
                        <li key={issue.label} className="group flex items-start gap-3 rounded-[10px] border border-white/06 bg-white/[0.015] p-3.5 transition-colors hover:border-white/14">
                          <span className="w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] text-white/40 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-[15px] text-white/62 leading-[1.5]">{issue.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-up" delay={100}>
                <div className="bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-[#5E6AD2]/35 h-full shadow-lg shadow-[#5E6AD2]/5">
                  <h3 className="text-xl font-bold text-white mb-5">After InDataFlow</h3>
                  <ul className="space-y-3">
                    {afterOutcomes.map((outcome) => {
                      const Icon = outcome.icon;
                      return (
                        <li key={outcome.label} className="group flex items-start gap-3 rounded-[10px] border border-[#5E6AD2]/12 bg-[#5E6AD2]/[0.035] p-3.5 transition-colors hover:border-[#5E6AD2]/30">
                          <span className="w-8 h-8 rounded-[8px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-[15px] text-white/76 leading-[1.5] font-medium">{outcome.label}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <div className="rounded-[16px] p-8 sm:p-12 border border-white/08 bg-[#0F1011] text-center relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/45 to-transparent" />
                <div className="w-11 h-11 rounded-[12px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center mx-auto mb-6">
                  <Quote className="w-5 h-5" />
                </div>
                <blockquote className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
                  "We used to spend half our day answering 'where is my cargo?' calls. Now clients check the portal themselves. Our team focuses on actually moving cargo, not reporting on it."
                </blockquote>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#0F1011] border border-white/08 flex items-center justify-center overflow-hidden">
                    <img src="/galaxy-logistics-logo.png" alt="Galaxy Logistics" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white">Operations Director</div>
                    <div className="text-sm text-white/50">Galaxy clearing and forwarding, East Africa</div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <ScrollAnimation>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">Operational Outcomes</h2>
                <p className="text-white/50 text-lg">Measurable improvements within the first month</p>
              </div>
            </ScrollAnimation>
            <div className="grid sm:grid-cols-2 gap-6">
              {outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <ScrollAnimation key={outcome.title} animation="fade-up" delay={index * 100}>
                    <div className="bg-[#0F1011] rounded-[16px] p-7 sm:p-8 border border-white/08 h-full hover:border-white/18 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden">
                      <div className="absolute right-5 top-5 w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] text-[#5E6AD2] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="text-3xl font-bold text-[#5E6AD2] mb-2 pr-14 tabular-nums">{outcome.metric}</div>
                      <h3 className="text-xl font-bold text-white mb-2 pr-10">{outcome.title}</h3>
                      <p className="text-[15px] text-white/62 leading-relaxed">{outcome.description}</p>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
            <ScrollAnimation animation="fade-up" delay={400}>
              <div className="mt-8 p-7 sm:p-8 border border-[#5E6AD2]/30 rounded-[16px] bg-[#0F1011] text-center flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-[10px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <p className="text-white/86 font-medium text-lg max-w-2xl mx-auto">
                  The operational improvements translated into faster cargo clearance, fewer disputes, and measurable cost savings within the first month.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <ScrollAnimation>
              <Link to="/case-study" className="block bg-[#0F1011] border border-white/08 rounded-[16px] p-8 text-center hover:border-[#5E6AD2]/50 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Explore More Success Stories</h3>
                <p className="text-white/50 mb-5">
                  See how other logistics operators transformed their operations with InDataFlow.
                </p>
                <span className="inline-flex items-center gap-2 text-[#5E6AD2] font-bold">
                  View all case studies
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6 tracking-[-0.02em]">
            Ready to transform your operation?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            See how this would run inside your operation.
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
