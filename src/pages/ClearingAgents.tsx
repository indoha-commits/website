import { BadgeCheck, FileSearch, Landmark, ShieldCheck, TimerReset, Warehouse } from "lucide-react";
import { SolutionPage } from "@/components/marketing/SolutionPage";

export default function ClearingAgents() {
  return (
    <SolutionPage
      eyebrow="Solutions for clearing agents"
      title="Keep shipment documents, approvals and cargo milestones connected across customs workflows."
      description="InDataFlow helps clearing teams keep document readiness, operational reviews and shipment visibility tied to the same cargo record from port arrival to warehouse release."
      highlights={[
        "Document readiness before submission",
        "Approvals tied to shipment history",
        "Clear handoffs from port to warehouse",
      ]}
      painPoints={[
        "Teams waste time confirming whether the latest invoice, packing list or bill of lading is the one used for the shipment.",
        "Approvals and review comments live in chat threads that are hard to reconstruct during client or customs follow-up.",
        "Port, clearance and warehouse handoffs happen without one shared operational history.",
      ]}
      outcomes={[
        "Shipment documents and validation steps stay attached to the same cargo record used across the clearance workflow.",
        "Approvals, status changes and follow-up notes become traceable instead of scattered across channels.",
        "Each operational handoff has the supporting context needed for faster, cleaner execution.",
      ]}
      featurePoints={[
        {
          title: "Document validation tied to customs readiness",
          description: "Commercial invoices, bills of lading and packing lists can be checked against one another before the team advances the shipment.",
          icon: FileSearch,
        },
        {
          title: "Approvals that stay with the shipment record",
          description: "Review outcomes, operational notes and next actions remain attached to the same shipment instead of disappearing into chat history.",
          icon: BadgeCheck,
        },
        {
          title: "Shared timeline from port to release",
          description: "Port arrival, customs handling, release status and warehouse delivery milestones live in one operational history.",
          icon: TimerReset,
        },
        {
          title: "Operational accountability across teams",
          description: "Supervisors can see what was received, what was checked and what was approved without rebuilding the story manually.",
          icon: ShieldCheck,
        },
        {
          title: "Customs and transport coordination in one place",
          description: "Clearing activities can stay connected to inland movement planning so downstream teams act on verified shipment data.",
          icon: Landmark,
        },
        {
          title: "Warehouse handoff with full context",
          description: "Final release and delivery teams inherit the same validated record, documents and milestone history used earlier in the process.",
          icon: Warehouse,
        },
      ]}
    />
  );
}
