import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, Search, Calendar, Gauge, Shield, Globe, Lock, Puzzle, Rocket } from "lucide-react";
import { useState, Fragment } from "react";

const plans = [
  {
    name: "Starter",
    description: "For teams getting started. Up to 3 clients, 1 ops number.",
    priceUSD: 250,
    capacity: "Up to 30 shipments/month",
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For growing operations. Up to 10 clients, 2 ops numbers, email intake.",
    priceUSD: 500,
    capacity: "Up to 100 shipments/month",
    highlighted: true,
  },
  {
    name: "Custom",
    description: "Unlimited shipments, clients, and dedicated support.",
    priceUSD: null,
    priceLabel: "Custom",
    capacity: "Unlimited",
    highlighted: false,
  },
];

type CheckState = "yes" | "no";

const tableSections = [
  {
    category: "Operations",
    rows: [
      { label: "Cargo timeline dashboard", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Clearing progress visibility", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Storage day counter", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Milestone tracking", starter: "yes", growth: "yes", volume: "yes" },
    ],
  },
  {
    category: "Documents",
    rows: [
      { label: "Document upload + validation", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Digital archive", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Bulk document management", starter: "no", growth: "no", volume: "yes" },
    ],
  },
  {
    category: "Notifications",
    rows: [
      { label: "Email notifications", starter: "yes", growth: "yes", volume: "yes" },
      { label: "Clearing progress alerts", starter: "no", growth: "yes", volume: "yes" },
      { label: "Weekly shipment summary", starter: "no", growth: "yes", volume: "yes" },
    ],
  },
  {
    category: "Support",
    rows: [
      { label: "Standard support", starter: "yes", growth: "no", volume: "no" },
      { label: "Priority response SLA", starter: "no", growth: "yes", volume: "no" },
      { label: "Dedicated support", starter: "no", growth: "no", volume: "yes" },
    ],
  },
  {
    category: "Access",
    rows: [
      { label: "Multi-user access", starter: "no", growth: "yes", volume: "yes" },
      { label: "Multi-department access", starter: "no", growth: "no", volume: "yes" },
      { label: "Custom reporting", starter: "no", growth: "no", volume: "yes" },
    ],
  },
];

function Check({ state }: { state: CheckState }) {
  if (state === "yes") return <span className="text-[#5E6AD2] text-lg">✓</span>;
  return <span className="text-white/[0.06] text-lg">—</span>;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    { q: "What counts as a cargo?", a: "Any shipment you create in InDataFlow, regardless of size or number of containers." },
    { q: "Can I upgrade or downgrade my plan?", a: "Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle." },
    { q: "What happens if I exceed my cargo limit?", a: "We'll notify you when you're approaching your limit. Extra shipments are billed at $6/shipment. Traffic overage (WhatsApp, OCR, AI) is billed at low per-unit rates." },
    { q: "Is there a contract?", a: "We offer monthly and annual billing. Annual plans come with a discount. No long-term contracts required." },
    { q: "How does billing work?", a: "You're billed monthly or annually based on your plan. Invoices are sent via email and can be paid by bank transfer or card." },
    { q: "Can I try before committing?", a: "Absolutely. We offer a 14-day trial with full access to all features. No credit card required." },
  ];

  return (
    <Layout>
      <PageHeader
        title="Simple, volume-based pricing"
        description="Pricing based on operational volume, not users. No per-seat pricing. No hidden fees."
        className="pb-4 md:pb-8"
      />

      <section className="section-padding pt-0 bg-[#010102]">
        <div className="container-wide">
          <div className="mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative inline-flex bg-[#0F1011] border border-[#1A1A1A] rounded-full p-[4px]">
                <div
                  className="absolute top-[4px] bottom-[4px] rounded-full bg-[#5E6AD2] transition-all duration-300 shadow-lg shadow-[#5E6AD2]/20"
                  style={{
                    width: "calc(50% - 4px)",
                    left: annual ? "calc(50% + 4px)" : "4px",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setAnnual(false)}
                  className={`relative z-10 px-7 py-2.5 text-sm font-medium text-center transition-colors duration-300 ${
                    !annual ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setAnnual(true)}
                  className={`relative z-10 px-7 py-2.5 text-sm font-medium text-center inline-flex items-center gap-1.5 transition-colors duration-300 ${
                    annual ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  Yearly
                  <span className="text-[10px] text-[#22c55e] font-semibold whitespace-nowrap">Save 10%</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-stretch mb-8">
              {plans.map((plan, i) => (
                <ScrollAnimation key={plan.name} animation="fade-up" delay={i * 80} className="flex">
                  <div className="relative flex-1">
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <span className="relative text-xs font-semibold text-white px-5 py-1.5 rounded-full bg-[#5E6AD2] shadow-sm shadow-[#5E6AD2]/10 whitespace-nowrap">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div
                      className={`rounded-[16px] border p-8 flex flex-col h-full relative ${
                        plan.highlighted
                          ? "border-[#5E6AD2]/40 bg-gradient-to-b from-white/[0.03] to-transparent shadow-lg shadow-[#5E6AD2]/5 z-10"
                          : "border-white/06 bg-gradient-to-b from-white/[0.03] to-transparent"
                      }`}
                    >
                      {plan.highlighted && (
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#5E6AD2] rounded-t-[16px]" />
                      )}
                      <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                      <p className="text-sm text-white/60 mb-5">{plan.description}</p>
                      <div className="mb-1">
                        {plan.priceUSD ? (
                          <>
                            <span className="text-4xl font-bold text-white font-mono tracking-tight">
                              ${annual ? Math.round(plan.priceUSD * 12 * 0.9).toLocaleString() : plan.priceUSD}
                            </span>
                            <span className="text-base text-white/40 font-mono ml-0.5">
                              {annual ? '/yr' : '/mo'}
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold text-white font-mono tracking-tight">
                            {plan.priceLabel}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-white/35 mb-8">{plan.capacity}</div>
                      <div className="mt-auto">
                        <Button asChild
                          className={`w-full h-[44px] rounded-[10px] text-base font-medium transition-all duration-300 ${
                            plan.highlighted
                              ? "bg-[#5E6AD2] text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#5E6AD2]/10"
                              : "bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:-translate-y-0.5"
                          }`}
                        >
                          <Link to="/contact">
                            {plan.priceUSD ? "Subscribe" : "Contact us"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <div className="bg-[#0F1011] rounded-[16px] border border-[#1A1A1A]">
              <div className="md:hidden p-4 space-y-4">
                {tableSections.map((section) => (
                  <div key={section.category} className="rounded-[14px] border border-white/[0.04] bg-black/20 p-4">
                    <div className="mb-3 text-[10px] uppercase tracking-[0.15em] font-medium text-white/25">
                      {section.category}
                    </div>
                    <div className="space-y-3">
                      {section.rows.map((row) => (
                        <div key={row.label} className="rounded-[12px] border border-white/[0.04] bg-white/[0.015] p-3">
                          <div className="mb-3 text-sm font-medium text-white/80">{row.label}</div>
                          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                            <div className="rounded-[8px] border border-white/[0.04] px-2 py-2">
                              <div className="mb-1 text-white/35">Starter</div>
                              <Check state={row.starter} />
                            </div>
                            <div className="rounded-[8px] border border-white/[0.04] px-2 py-2">
                              <div className="mb-1 text-white/35">Growth</div>
                              <Check state={row.growth} />
                            </div>
                            <div className="rounded-[8px] border border-white/[0.04] px-2 py-2">
                              <div className="mb-1 text-white/35">Custom</div>
                              <Check state={row.volume} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="sticky top-0 z-10 bg-[#0F1011]">
                    <tr className="border-b border-white/[0.04]">
                      <th className="text-left py-5 px-8 text-sm text-white/35 w-[44%] font-medium">
                        Feature
                      </th>
                      {plans.map((plan) => (
                        <th
                          key={plan.name}
                          className={`py-5 px-4 text-sm font-semibold text-center w-[18.67%] ${
                            plan.highlighted ? "text-[#5E6AD2]" : "text-white/50"
                          }`}
                        >
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableSections.map((section) => (
                      <Fragment key={section.category}>
                        <tr>
                          <td
                            colSpan={4}
                            className="py-3 px-8 text-[10px] text-white/15 uppercase tracking-[0.15em] font-medium"
                          >
                            {section.category}
                          </td>
                        </tr>
                        {section.rows.map((row) => (
                          <tr key={row.label} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-8 text-base text-white/80 font-medium">{row.label}</td>
                            <td className="py-4 px-4 text-center"><Check state={row.starter} /></td>
                            <td className="py-4 px-4 text-center"><Check state={row.growth} /></td>
                            <td className="py-4 px-4 text-center"><Check state={row.volume} /></td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-sm text-white/25 mt-6">
              Unlimited dashboard users and client portal accounts on all plans. Usage-based overage for traffic beyond plan limits.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="relative rounded-[16px] border border-white/[0.06] bg-gradient-to-br from-[#111216] via-[#0F1011] to-[#0D0E12] p-10 md:p-12 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-[#5E6AD2]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-8 left-8 flex gap-2 pointer-events-none">
              <div className="w-1.5 h-1.5 rounded-full bg-white/[0.04]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/[0.03]" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/[0.06]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Enterprise</h2>
              <p className="text-base text-white/70 max-w-[512px] mb-10">
                Custom deployment and dedicated support for organizations processing high volumes across multiple regions.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 mb-10">
                {[
                  { icon: Gauge, label: "Unlimited cargo volume", desc: "No monthly caps or overage fees" },
                  { icon: Shield, label: "SLA-backed support", desc: "Guaranteed response times with dedicated contacts" },
                  { icon: Globe, label: "Regional rollout", desc: "Multi-location deployment with localized workflows" },
                  { icon: Lock, label: "Security review", desc: "Compliance documentation and audit support" },
                  { icon: Puzzle, label: "Custom integrations", desc: "API access and third-party system connections" },
                  { icon: Rocket, label: "Dedicated onboarding", desc: "White-glove setup with your operations team" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-[8px] bg-[#5E6AD2]/10 border border-[#5E6AD2]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-[#5E6AD2]" />
                      </div>
                      <div>
                        <div className="text-base font-medium text-white">{item.label}</div>
                        <p className="text-sm text-white/60 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button asChild
                className="inline-flex items-center gap-3 h-[48px] px-6 bg-[#5E6AD2] rounded-[10px] text-base font-medium text-white hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#5E6AD2]/10 transition-all duration-300"
              >
                <Link to="/contact">
                  <Calendar className="w-4 h-4" />
                  Talk to our team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-[768px] mx-auto">
            <h2 className="text-3xl font-serif font-bold text-white text-center mb-10">Common questions</h2>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenFaq(null);
                }}
                className="w-full h-[44px] pl-11 pr-4 rounded-[12px] bg-[#0F1011] border border-[#1A1A1A] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#5E6AD2]/50 transition-colors"
              />
            </div>

            <div className="space-y-3">
              {faqs
                .filter((item) =>
                  item.q.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={item.q}
                      className="rounded-[16px] border border-[#1A1A1A] bg-[#0F1011] relative overflow-hidden"
                    >
                      {isOpen && (
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#5E6AD2]" />
                      )}
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-6 pl-7 text-left"
                      >
                        <h3
                          className={`text-xl font-bold transition-colors duration-300 ${
                            isOpen ? "text-[#5E6AD2]" : "text-white"
                          }`}
                        >
                          {item.q}
                        </h3>
                        <ChevronDown
                          className={`w-5 h-5 text-white/35 shrink-0 ml-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm text-white/70 px-6 pb-6">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {searchQuery &&
              faqs.filter((item) =>
                item.q.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <p className="text-center text-sm text-white/35 mt-6">
                  No questions match your search.
                </p>
              )}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-base text-white/70 mb-6">
            Book a call to discuss your needs and get a personalized quote.
          </p>
          <Button asChild
            className="inline-flex items-center gap-2 h-[40px] px-4 bg-[#5E6AD2] rounded-[10px] text-base font-medium text-white hover:bg-[#5E6AD2]/90 transition-all"
          >
            <Link to="/contact">
              Book a walkthrough
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
