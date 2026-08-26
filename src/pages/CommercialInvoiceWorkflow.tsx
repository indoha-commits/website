import { ResourceArticle } from "@/components/marketing/ResourceArticle";

export default function CommercialInvoiceWorkflow() {
  return (
    <ResourceArticle
      eyebrow="Shipment document workflow"
      title="How freight teams validate a commercial invoice inside shipment operations"
      description="Commercial invoices shape how a shipment is understood operationally. The workflow becomes stronger when invoice data is checked against the rest of the shipment record instead of being processed in isolation."
      steps={[
        "Invoice received",
        "Key fields extracted",
        "Shipment and cargo references matched",
        "Validation outcome recorded",
      ]}
      sections={[
        {
          title: "Treat invoice data as part of the shipment history",
          body: "Commercial invoice details should enter the same operational record used for cargo status, document readiness and client updates. When invoice data sits outside that workflow, teams end up re-entering information or checking the same shipment twice.",
        },
        {
          title: "Validate the fields that affect downstream work",
          body: "Amounts, parties, shipment references, ports and item descriptions matter because they influence how the shipment is reviewed and communicated. Teams should confirm those fields against the cargo record and supporting documents before they advance the shipment to the next operational step.",
        },
        {
          title: "Use the invoice to cross-check the document set",
          body: "The invoice becomes more valuable when it is used to confirm the logic of the full shipment file. If references on the bill of lading, packing list and invoice do not align, the discrepancy should be resolved before client status or internal approvals change.",
        },
        {
          title: "Make the decision traceable",
          body: "Operations teams benefit when each review produces an explicit result: validated, follow-up required or blocked pending another document. That decision needs to remain attached to the shipment record so later staff members do not repeat work or communicate uncertain information.",
        },
      ]}
    />
  );
}
