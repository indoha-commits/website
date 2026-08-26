import { ResourceArticle } from "@/components/marketing/ResourceArticle";

export default function PackingListWorkflow() {
  return (
    <ResourceArticle
      eyebrow="Shipment document workflow"
      title="How freight teams use packing lists to verify cargo records"
      description="Packing lists help operations teams confirm what is moving, how it is grouped and whether the rest of the shipment file stays consistent. That value shows up when the packing list is connected to one shipment record and review workflow."
      steps={[
        "Packing list received",
        "Shipment contents checked",
        "Invoice and bill of lading compared",
        "Client-ready status confirmed",
      ]}
      sections={[
        {
          title: "Keep cargo detail connected to the shipment",
          body: "A packing list provides structure around what the cargo contains and how it is organized. Operations teams work more reliably when those details are stored against the same shipment record used for milestones, validation outcomes and document history.",
        },
        {
          title: "Use the packing list to support consistency checks",
          body: "Teams can compare item-level or package-level details against the invoice and bill of lading to confirm the shipment file makes sense as a whole. This is often where document mismatches surface before they create bigger delays in the workflow.",
        },
        {
          title: "Tie the review to operational readiness",
          body: "The review is not only about whether a packing list exists. It is about whether the information is complete enough for the next stage of handling, whether additional follow-up is needed and whether the client-facing status should move forward.",
        },
        {
          title: "Preserve the outcome for later handoffs",
          body: "Once checked, the packing list should remain part of the traceable shipment record. That allows warehouse, transport or customer-facing teams to inherit the same validated context instead of reopening the document trail from scratch.",
        },
      ]}
    />
  );
}
