import { ResourceArticle } from "@/components/marketing/ResourceArticle";

export default function BillOfLadingWorkflow() {
  return (
    <ResourceArticle
      eyebrow="Shipment document workflow"
      title="How freight teams validate a bill of lading against invoice and packing list"
      description="A bill of lading matters operationally when it is tied to the same shipment record as the commercial invoice, packing list and milestone history. This is how teams keep that process traceable."
      steps={[
        "Bill of lading received",
        "Shipment references extracted",
        "Invoice and packing list matched",
        "Operations review completed",
      ]}
      sections={[
        {
          title: "Start with one shipment record",
          body: "The bill of lading should not live as an isolated PDF in email. Freight teams move faster when the document is attached to the same shipment record that already holds the container reference, client, route and current milestone. That removes guesswork before validation even begins.",
        },
        {
          title: "Check the references that drive operations",
          body: "Teams usually need to confirm core references first: shipper or consignee details, bill of lading number, container identifiers, ports and shipment dates. Those details are not useful on their own. They become useful when compared against the invoice and packing list already linked to the same record.",
        },
        {
          title: "Match document sets before updating status",
          body: "A bill of lading can look complete while the commercial invoice or packing list still contains a mismatch. Good operations practice is to validate the full document set before the shipment is treated as cleared for the next step. That reduces client confusion and internal rework later in the process.",
        },
        {
          title: "Keep the review outcome visible",
          body: "Once the bill of lading has been checked, the result should stay attached to the shipment: validated, needs follow-up or waiting on another document. That review outcome gives operations teams and client-facing staff one reliable version of the truth when they communicate the next cargo update.",
        },
      ]}
    />
  );
}
