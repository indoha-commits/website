import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileBox, Files, FileStack, MapPinned, Route, ScanText, Ship, Waypoints } from "lucide-react";

const corridorResources = [
  {
    title: "Rwanda import clearance",
    description: "From a declaration-ready file through ReSW assessment, customs control, release and physical exit.",
    href: "/resources/eac/rwanda-import-clearance-workflow/",
    icon: MapPinned,
    label: "Rwanda",
  },
  {
    title: "Mombasa to Rwanda",
    description: "Control port release, Northern Corridor transit, border handoffs and destination closure as separate states.",
    href: "/resources/eac/mombasa-rwanda-freight-workflow/",
    icon: Ship,
    label: "Northern Corridor",
  },
  {
    title: "Dar es Salaam to Rwanda",
    description: "A detailed TANCIS, TePP, port gate, Rusumo and Rwanda destination workflow.",
    href: "/resources/eac/dar-es-salaam-rwanda-freight-workflow/",
    icon: Route,
    label: "Central Corridor",
  },
  {
    title: "Northern or Central Corridor?",
    description: "A shipment-level route decision framework built around readiness, handoffs, cost at risk and recovery.",
    href: "/resources/eac/northern-central-corridor-guide/",
    icon: Waypoints,
    label: "Route control",
  },
  {
    title: "EAC customs document handoffs",
    description: "Control declaration, carrier, port, transit, border and destination-release evidence without collapsing them into one status.",
    href: "/resources/eac/eac-customs-document-handoff-workflow/",
    icon: FileStack,
    label: "Customs controls",
  },
];

const documentResources = [
  {
    title: "Bill of Lading workflow",
    description: "How freight teams validate a bill of lading against invoice and packing list before cargo status is shared.",
    href: "/resources/bill-of-lading-workflow/",
    icon: FileBox,
  },
  {
    title: "Commercial invoice workflow",
    description: "How invoice data is checked, matched and tied back to one shipment record across operations.",
    href: "/resources/commercial-invoice-workflow/",
    icon: ScanText,
  },
  {
    title: "Packing list workflow",
    description: "How packing list details support cargo validation, operations review and client visibility.",
    href: "/resources/packing-list-workflow/",
    icon: Files,
  },
];

export default function Resources() {
  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4">Resource hub</p>
            <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
              East African corridor and customs workflows for freight operators.
            </h1>
            <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto">
              Operator playbooks for Rwanda-bound cargo through Mombasa and Dar es Salaam—plus the document controls needed to keep every customs, port, border and delivery handoff traceable.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0 bg-[#010102]">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-[#5E6AD2]">Corridor playbooks</p>
            <h2 className="text-3xl font-serif font-bold tracking-[-0.02em] text-white sm:text-4xl">Run the route, not just the shipment status</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {corridorResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} to={resource.href} className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5E6AD2]/35">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mb-2 text-xs font-mono uppercase tracking-[0.13em] text-white/35">{resource.label}</p>
                  <h2 className="text-2xl font-serif font-bold text-white mb-3 tracking-[-0.02em]">{resource.title}</h2>
                  <p className="text-white/65 leading-[1.7] mb-5">{resource.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#5E6AD2]">
                    Read resource
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-mono uppercase tracking-[0.15em] text-[#5E6AD2]">Document controls</p>
            <h2 className="text-3xl font-serif font-bold tracking-[-0.02em] text-white sm:text-4xl">Make the shipment file declaration-ready</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {documentResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Link key={resource.href} to={resource.href} className="rounded-[18px] border border-white/[0.08] bg-[#0F1011] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5E6AD2]/35">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[12px] border border-[#5E6AD2]/20 bg-[#5E6AD2]/10 text-[#5E6AD2]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white mb-3 tracking-[-0.02em]">{resource.title}</h2>
                  <p className="text-white/65 leading-[1.7] mb-5">{resource.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#5E6AD2]">Read resource <ArrowRight className="h-4 w-4" /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl rounded-[18px] border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-transparent p-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              See how the workflow fits your operation
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Explore the product or book a walkthrough to see how InDataFlow turns document intake into a traceable shipment record.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/product/">Explore the product</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact/">Book a walkthrough</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
