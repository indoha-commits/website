import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Clock3, Database, FileText, UserCheck } from "lucide-react";

const problems = [
  {
    title: "No authoritative cargo record",
    description: "Cargo data scattered across spreadsheets, emails, and chat threads.",
    icon: Database,
  },
  {
    title: "Client disputes over timelines",
    description: "No shared, timestamped view of where cargo stands.",
    icon: Clock3,
  },
  {
    title: "Documents lost between teams",
    description: "Compliance paperwork delayed or misplaced across handoffs.",
    icon: FileText,
  },
  {
    title: "No accountability per milestone",
    description: "It's unclear who did what, when, and why delays happened.",
    icon: UserCheck,
  },
];

export function ProblemSection() {
  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              Cargo operations still live across WhatsApp and Excel.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              Most logistics operations rely on spreadsheets, messages, and emails to track critical cargo information creating confusion, delays, and accountability gaps.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((problem, index) => (
            <ScrollAnimation key={problem.title} animation="fade-up" delay={index * 100} className="flex">
              <div className="group relative overflow-hidden bg-[#0F1011] rounded-[12px] border border-white/12 p-5 flex flex-col h-full hover:border-white/25 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-10 h-10 rounded-[10px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300">
                    <problem.icon className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-xs text-white/40 tabular-nums">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg leading-snug font-bold text-white mb-3">{problem.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{problem.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
