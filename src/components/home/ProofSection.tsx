import { BadgeCheck, GitBranch, MapPin, Quote, Route, UserRound } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const credibilitySignals = [
  { label: "Live cargo operations in East Africa", icon: MapPin },
  { label: "Active clearing and forwarding workflows", icon: GitBranch },
  { label: "Port-to-warehouse coverage", icon: Route },
  { label: "Paying clients using the system daily", icon: BadgeCheck },
];

export function ProofSection() {
  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollAnimation>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              Already running live cargo operations.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-10">
              InDataFlow is actively used in real logistics workflows tracking shipments, validating documents, and coordinating teams daily.
            </p>
          </ScrollAnimation>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {credibilitySignals.map((signal, index) => {
              const Icon = signal.icon;
              return (
                <ScrollAnimation key={signal.label} animation="fade-up" delay={index * 80}>
                  <div className="group relative overflow-hidden bg-[#0F1011] rounded-[12px] border border-white/08 p-5 flex items-start gap-4 h-full text-left hover:-translate-y-0.5 hover:border-white/20 transition-all duration-300">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-9 h-9 rounded-[9px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <span className="text-[15px] text-white/75 leading-[1.45] font-medium">{signal.label}</span>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>

          <ScrollAnimation animation="fade-up" delay={300}>
            <figure className="mt-12 max-w-2xl mx-auto bg-[#0F1011] rounded-[12px] p-6 sm:p-8 border border-white/08 text-left overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5E6AD2]/50 to-transparent" />
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div className="w-11 h-11 rounded-[10px] bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 text-[#5E6AD2]">
                  <Quote className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <blockquote className="text-base sm:text-lg text-white/80 leading-[1.65]">
                    "InDataFlow replaced three different systems. Now our team and clients see the same information in real-time."
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5E6AD2]/15 border border-[#5E6AD2]/25 flex items-center justify-center text-[#5E6AD2]">
                      <UserRound className="w-3.5 h-3.5" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm text-white/45 leading-[1.4]">
                      Operations Manager, Clearing & Forwarding, East Africa
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
