import { Boxes, FileCheck2, MessageSquareShare, Milestone, ScanSearch, Users } from "lucide-react";
import { SolutionPage } from "@/components/marketing/SolutionPage";

export default function FreightForwarders() {
  return (
    <SolutionPage
      eyebrow="Solutions for freight forwarders"
      title="Manage documents, milestones and client updates without fragmented shipment records."
      description="InDataFlow gives freight forwarding teams one traceable shipment record from document intake to validated cargo status, so daily operations move faster and clients stop chasing updates."
      highlights={[
        "Shipment documents in one record",
        "Validation before status updates",
        "Client visibility without extra calls",
      ]}
      painPoints={[
        "Bills of lading, invoices and packing lists arrive through different channels and have to be matched manually.",
        "Operations teams lose time checking whether each document is complete before moving cargo to the next step.",
        "Clients ask for updates before the team has verified what actually changed in the shipment.",
      ]}
      outcomes={[
        "Every shipment has one operational record with documents, milestones, approvals and updates connected.",
        "Validation happens inside the workflow before inaccurate cargo status reaches clients.",
        "Operations teams can answer questions from a shared timeline instead of chasing messages across tools.",
      ]}
      featurePoints={[
        {
          title: "Document intake that stays linked to the shipment",
          description: "Bills of lading, commercial invoices and packing lists are attached to the same cargo record as soon as they arrive from email, upload or WhatsApp.",
          icon: Boxes,
        },
        {
          title: "Validation before the next operational step",
          description: "Teams review extracted fields, compare key shipment references and confirm readiness before milestones or client updates move forward.",
          icon: ScanSearch,
        },
        {
          title: "Traceable client communication",
          description: "Shipment updates reflect the same validated record that operations uses internally, reducing back-and-forth calls and message confusion.",
          icon: MessageSquareShare,
        },
        {
          title: "Milestones with operational context",
          description: "Port, customs, inland transport and warehouse events stay attached to supporting documents, review notes and approvals.",
          icon: Milestone,
        },
        {
          title: "Document readiness at a glance",
          description: "Teams can quickly see what is missing, what is being checked and what has already been cleared for action.",
          icon: FileCheck2,
        },
        {
          title: "Shared visibility for the whole forwarding team",
          description: "Ops leads, coordinators and customer-facing staff reference the same shipment timeline instead of rebuilding status from memory.",
          icon: Users,
        },
      ]}
    />
  );
}
