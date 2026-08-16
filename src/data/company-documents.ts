export type CompanyDocument = {
  slug: string;
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  effectiveDate: string;
  icon: "terms" | "privacy" | "contact" | "security";
  summary: string;
  points: string[];
  sections: Array<{
    id: string;
    heading: string;
    paragraphs?: string[];
    bullets?: string[];
  }>;
};

export const companyDocuments: CompanyDocument[] = [
  {
    slug: "terms-of-service",
    id: "terms-of-service",
    title: "Terms of Service",
    eyebrow: "Business terms",
    description: "Business terms governing access to and use of the InDataFlow platform.",
    effectiveDate: "11 August 2026",
    icon: "terms",
    summary: "Business terms governing access to and use of the InDataFlow platform, including accounts, customer data, document processing, acceptable use, third-party services, fees, intellectual property, confidentiality, data protection and service availability.",
    points: [
      "Customers retain rights in data and documents submitted to the service.",
      "Automated OCR, classification and workflow outputs require human review where accuracy matters.",
      "InDataFlow is a technology workflow service, not a customs, tax or legal adviser.",
    ],
    sections: [
      { id: "agreement", heading: "1. Agreement", paragraphs: ["These Terms of Service ('Terms') govern access to and use of services provided by INDATAFLOW LTD ('InDataFlow', 'we', 'us'). By creating an account, accepting an order or service agreement, or using the service, the customer agrees to these Terms. If you use the service for an organization, you represent that you have authority to bind that organization."] },
      { id: "the-service", heading: "2. The service", paragraphs: ["InDataFlow provides software for trade-document intake, organization, document processing, workflow coordination, cargo records, operational visibility, notifications and related logistics functions. Features may evolve over time."] },
      { id: "accounts-and-authorized-users", heading: "3. Accounts and authorized users", paragraphs: ["Customers are responsible for their accounts, authorized users and credentials, and for ensuring that access is granted only to appropriate persons. Customers must promptly notify InDataFlow of suspected unauthorized access."] },
      { id: "customer-data-and-documents", heading: "4. Customer data and documents", paragraphs: ["Customers retain their rights in data and documents submitted to the service. The customer authorizes InDataFlow to host, process, transmit, reproduce and otherwise use Customer Data only as reasonably necessary to provide, secure and support the service and as otherwise permitted by the Agreement.", "The customer is responsible for ensuring that it has the rights, permissions and lawful basis necessary to provide Customer Data to InDataFlow and that its instructions and use of the service comply with applicable law."] },
      { id: "document-processing-and-accuracy", heading: "5. Document processing and accuracy", paragraphs: ["The service may use OCR, automated classification, rules, heuristics and machine-assisted processing. Outputs may contain errors or omissions. Customers and their authorized operators remain responsible for reviewing information where accuracy is operationally, legally or commercially important."] },
      { id: "no-customs-tax-or-legal-advice", heading: "6. No customs, tax or legal advice", paragraphs: ["InDataFlow is a technology and workflow service. Unless expressly agreed otherwise in writing, InDataFlow does not act as a customs authority, customs agent, tax adviser or legal adviser and does not guarantee customs clearance, regulatory approval, shipment delivery times, document acceptance, classification outcomes or other governmental decisions."] },
      { id: "acceptable-use", heading: "7. Acceptable use", bullets: ["Do not use the service unlawfully or to infringe the rights of others.", "Do not submit data or documents that you are not authorized to process or disclose.", "Do not attempt to bypass access controls, probe the service for unauthorized purposes, interfere with availability, introduce malicious code or access another customer's data.", "Do not use automated outputs as the sole basis for a consequential decision where independent review is reasonably required."] },
      { id: "third-party-services", heading: "8. Third-party services", paragraphs: ["The service may interoperate with third-party communications, infrastructure, authentication, storage and payment services. Third-party services may be governed by their own terms. InDataFlow is not responsible for third-party services outside its reasonable control."] },
      { id: "fees-billing-and-taxes", heading: "9. Fees, billing and taxes", paragraphs: ["Fees, billing periods, plan limits and payment terms are those presented at purchase or stated in an applicable order or service agreement. Unless stated otherwise, the customer is responsible for applicable taxes, duties and charges. Failure to pay amounts when due may result in suspension or termination, subject to applicable law and any agreed cure period."] },
      { id: "intellectual-property", heading: "10. Intellectual property", paragraphs: ["InDataFlow and its licensors retain all rights in the service, software, designs, documentation and related intellectual property. Except for the limited right to use the service during the subscription, no rights are transferred to the customer. Customer Data remains subject to the customer's rights."] },
      { id: "confidentiality", heading: "11. Confidentiality", paragraphs: ["Each party must use reasonable care to protect non-public confidential information received from the other and may use it only for purposes connected with the Agreement, except where disclosure is required by law or the information is lawfully public or independently obtained."] },
      { id: "data-protection-and-dpa", heading: "12. Data protection and DPA", paragraphs: ["Each party is responsible for its obligations under applicable data-protection law. Where InDataFlow processes Personal Data on behalf of the customer, the InDataFlow Data Processing Addendum forms part of the Agreement. The customer authorizes the engagement of subprocessors in accordance with that DPA."] },
      { id: "service-availability-and-changes", heading: "13. Service availability and changes", paragraphs: ["We aim to provide a reliable service but do not promise uninterrupted or error-free availability unless a separate service-level agreement expressly provides otherwise. We may modify features for security, legal, operational or product reasons while seeking to avoid materially reducing the core paid service without reasonable notice."] },
      { id: "suspension-and-termination", heading: "14. Suspension and termination", paragraphs: ["InDataFlow may suspend access where reasonably necessary to address security threats, unlawful use, material breach, non-payment or risks to the service or other customers. Either party may terminate as provided by the applicable subscription, order or service agreement."] },
      { id: "data-after-termination", heading: "15. Data after termination", paragraphs: ["Following termination, Customer Data will be handled in accordance with the Agreement and DPA. Data may be deleted or returned, subject to applicable legal retention requirements and reasonable backup cycles."] },
      { id: "disclaimers", heading: "16. Disclaimers", paragraphs: ["To the extent permitted by applicable law, the service is provided on an 'as available' basis. InDataFlow does not warranty that automated extraction, document classification, cargo matching, third-party communications or external data will always be complete, accurate or uninterrupted."] },
      { id: "limitation-of-liability", heading: "17. Limitation of liability", paragraphs: ["To the maximum extent permitted by applicable law, neither party will be liable for indirect, incidental, special, punitive or consequential damages, or for loss of profits, revenue, goodwill or anticipated savings arising from the Agreement. Any aggregate liability cap, exclusions that cannot lawfully be limited, and any exceptions for confidentiality, data protection, fraud or wilful misconduct will be governed by the applicable order, service agreement or mandatory law. Customers requiring a negotiated liability structure should enter into a written service agreement with InDataFlow."] },
      { id: "indemnity", heading: "18. Indemnity", paragraphs: ["To the extent permitted by applicable law, the customer is responsible for claims arising from Customer Data, unlawful instructions, or use of the service in violation of these Terms or applicable law, except to the extent caused by InDataFlow's own breach or unlawful conduct."] },
      { id: "governing-law-and-disputes", heading: "19. Governing law and disputes", paragraphs: ["These Terms are governed by the laws of the Republic of Rwanda, without prejudice to mandatory rights that cannot lawfully be excluded. The parties should first attempt in good faith to resolve disputes directly. Any forum, court jurisdiction or additional dispute procedure stated in an applicable signed service agreement will prevail for that agreement."] },
      { id: "changes", heading: "20. Changes", paragraphs: ["We may update these Terms from time to time. For material changes affecting an active paid service, we will provide reasonable notice where practicable or required by law. Continued use after the effective date of updated Terms constitutes acceptance where permitted by law."] },
      { id: "contact", heading: "21. Contact", paragraphs: ["INDATAFLOW Ltd", "Rwanda", "Privacy: indoha@indataflow.com", "Phone: +250 795619627"] },
    ],
  },
  {
    slug: "privacy-notice",
    id: "privacy-notice",
    title: "Privacy Notice",
    eyebrow: "Personal data",
    description: "This notice explains how InDataFlow handles personal data when providing its trade-document and logistics workflow platform.",
    effectiveDate: "11 August 2026",
    icon: "privacy",
    summary: "Explains how InDataFlow handles personal data across the website, accounts, platform, support, communications, document-intake channels and related services.",
    points: [
      "Covers account, business contact, trade, logistics, document, communication, payment, technical and security information.",
      "Describes OCR and automated document processing used for classification, extraction, matching and workflows.",
      "States that InDataFlow does not sell customer personal data.",
    ],
    sections: [
      { id: "who-we-are-and-scope", heading: "1. Who we are and scope", paragraphs: ["INDATAFLOW LTD is established in Rwanda. This Privacy Notice applies to personal data processed in connection with the InDataFlow website, accounts, platform, support, communications, document-intake channels and related services. We process personal data in accordance with applicable law, including Rwanda Law No. 058/2021 relating to the protection of personal data and privacy.", "For customer-submitted operational data, the customer organization generally determines why the data is processed and InDataFlow processes it on the customer's behalf. For account administration, security, billing, support and our own legal obligations, InDataFlow may determine the purposes of processing."] },
      { id: "information-we-process", heading: "2. Information we process", bullets: ["Account and business contact information, such as names, work email addresses, phone numbers, company details, roles and user/account identifiers.", "Trade and logistics information, such as shipment references, bills of lading, container references, invoices, packing lists, cargo records, shipment contacts and related operational information.", "Documents and communications submitted through the platform, including PDFs, images, WhatsApp messages, email messages, attachments, captions and support communications.", "Information extracted or generated from documents, including OCR text, document classifications, identifiers, matching results, workflow status and validation records.", "Payment and subscription information, such as transaction references and payment-confirmation information. Payment providers may process additional payment data under their own terms.", "Technical and security information, such as IP addresses, authentication events, access logs, browser/device information and system-security records."], paragraphs: ["InDataFlow is not designed for the routine submission of sensitive personal data unrelated to trade and logistics operations. Customers should avoid submitting unnecessary sensitive information and remain responsible for ensuring that data submitted to the service may lawfully be processed."] },
      { id: "how-we-receive-information", heading: "3. How we receive information", paragraphs: ["We may receive information directly from users; from the organization that provides a user with access to InDataFlow; through documents uploaded to the platform; through authorized WhatsApp or email intake channels; from payment and authentication providers; and automatically through normal use of the service."] },
      { id: "why-we-process-information", heading: "4. Why we process information", bullets: ["To provide, operate and administer the InDataFlow service.", "To receive, organize, classify, extract and match trade documents and operational records.", "To authenticate users and manage access to customer workspaces.", "To maintain cargo/document workflows, dashboards, audit trails and operational notifications.", "To process subscriptions and confirm payments.", "To provide customer support, maintain the service and improve reliability.", "To protect the platform, investigate misuse and maintain security.", "To comply with applicable legal and regulatory obligations."] },
      { id: "legal-bases", heading: "5. Legal bases", paragraphs: ["Depending on the context, processing may be based on performance of a contract, legitimate interests such as security and service administration, compliance with legal obligations, consent where required, or processing carried out on documented instructions from a customer acting as Data Controller."] },
      { id: "ocr-and-automated-document-processing", heading: "6. OCR and automated document processing", paragraphs: ["InDataFlow uses optical character recognition (OCR), rules, heuristics and automated software to assist with document classification, information extraction, identifier detection, document-to-cargo matching and operational workflows. Automated outputs may be incomplete or inaccurate and are intended to support, not replace, appropriate human review. InDataFlow does not make governmental or customs decisions and does not guarantee customs clearance or regulatory outcomes."] },
      { id: "sharing-and-subprocessors", heading: "7. Sharing and subprocessors", paragraphs: ["Personal data may be made available to authorized users of the relevant customer organization, service providers and subprocessors used to operate the platform, payment or communications providers where applicable, professional advisers where necessary, and regulators, courts or public authorities where disclosure is required by law. InDataFlow does not sell customer personal data.", "A current public list of relevant subprocessors may be maintained on the InDataFlow website."] },
      { id: "international-storage-and-transfers", heading: "8. International storage and transfers", paragraphs: ["InDataFlow uses cloud and communications infrastructure that may involve processing or storage outside Rwanda. Where required, InDataFlow applies appropriate safeguards and seeks or maintains the authorizations required under applicable Rwandan data-protection law. Specific hosting and processing locations may depend on the services and regions configured for the platform."] },
      { id: "retention-and-deletion", heading: "9. Retention and deletion", paragraphs: ["We retain personal data only for as long as reasonably necessary for the purposes for which it is processed, to provide the service, to meet contractual or legal obligations, to resolve disputes and to maintain appropriate security and business records. Customer data is deleted or returned following termination where required by the applicable agreement, subject to lawful retention requirements and reasonable backup cycles."] },
      { id: "security", heading: "10. Security", paragraphs: ["InDataFlow uses technical and organizational safeguards designed to protect personal data, including authenticated access, role-based permissions, encrypted network transport and controls intended to reduce unauthorized access, alteration, disclosure or loss. No system can guarantee absolute security."] },
      { id: "your-rights", heading: "11. Your rights", paragraphs: ["Individuals may have rights under applicable data-protection law, including rights to request access, correction or deletion of personal data and to object to certain unlawful processing. Where InDataFlow processes data on behalf of a customer organization, we may refer the request to that organization or assist it in responding.", "Privacy requests may be sent to indoha@indataflow.com."] },
      { id: "cookies-and-website-technologies", heading: "12. Cookies and website technologies", paragraphs: ["InDataFlow may use cookies or similar technologies that are necessary for authentication, security, session management and operation of the website or platform. If optional analytics or marketing technologies are introduced, InDataFlow will provide additional information and consent controls where required."] },
      { id: "changes-to-this-notice", heading: "13. Changes to this notice", paragraphs: ["We may update this Privacy Notice to reflect changes to the service, law or our processing practices. The current version will identify its effective or last-updated date."] },
      { id: "contact", heading: "14. Contact", paragraphs: ["Data Protection Contact", "INDATAFLOW LTD", "Rwanda", "Email: indoha@indataflow.com", "Phone: +250 788 324 982"] },
    ],
  },
  {
    slug: "contact",
    id: "contact",
    title: "Contact InDataFlow",
    eyebrow: "Public contact",
    description: "Public contact information for customers, users and privacy enquiries.",
    effectiveDate: "11 August 2026",
    icon: "contact",
    summary: "Public contact information for customers, users, privacy enquiries and security reports related to InDataFlow.",
    points: ["General and customer enquiries: indoha@indataflow.com.", "Privacy requests and data-subject requests may be sent to the same contact address.", "Security concerns may be reported through the published contact until a dedicated mailbox is available."],
    sections: [
      { id: "general-and-customer-enquiries", heading: "General and customer enquiries", paragraphs: ["INDATAFLOW LTD", "Rwanda", "Email: indoha@indataflow.com", "Phone: +250 795619627"] },
      { id: "privacy-and-data-protection", heading: "Privacy and data protection", paragraphs: ["Privacy requests, questions about personal data, or data-subject requests may be sent to: indoha@indataflow.com"] },
      { id: "security-reports", heading: "Security reports", paragraphs: ["Until a dedicated security mailbox is published, suspected security issues may be reported to: indoha@indataflow.com"] },
      { id: "customer-specific-requests", heading: "Customer-specific requests", paragraphs: ["Where a request concerns data submitted by an InDataFlow customer organization, InDataFlow may need to coordinate with or refer the request to that organization."] },
    ],
  },
  {
    slug: "security",
    id: "security",
    title: "Security at InDataFlow",
    eyebrow: "Platform safeguards",
    description: "A public overview of InDataFlow's approach to protecting operational and trade data.",
    effectiveDate: "11 August 2026",
    icon: "security",
    summary: "A public overview of InDataFlow's approach to protecting operational and trade data through technical and organizational safeguards.",
    points: ["Platform access uses authenticated accounts and role-based permissions.", "Supported web services use encrypted HTTPS/TLS transport.", "Security is shared: customers should manage credentials, access and suspected compromise promptly."],
    sections: [
      { id: "overview", heading: "Overview", paragraphs: ["InDataFlow processes operational and trade documentation for logistics organizations. We use technical and organizational safeguards designed to protect information while recognizing that no internet-connected service can guarantee absolute security."] },
      { id: "access-and-authentication", heading: "Access and authentication", paragraphs: ["Platform access is restricted through authenticated accounts and role-based permissions. Customers are responsible for managing their authorized users and protecting account credentials."] },
      { id: "network-and-integration-security", heading: "Network and integration security", paragraphs: ["InDataFlow uses encrypted HTTPS/TLS transport for supported web services. External integrations may use provider authentication, signature verification or other verification mechanisms where applicable."] },
      { id: "document-processing", heading: "Document processing", paragraphs: ["Documents may pass through controlled application services for classification, OCR, extraction, matching and workflow processing. Access to operational information is intended to be limited to authorized users and services."] },
      { id: "application-and-infrastructure-safeguards", heading: "Application and infrastructure safeguards", paragraphs: ["InDataFlow applies security controls across its application and infrastructure, including authentication controls, access restrictions and protective infrastructure services. Controls are reviewed and may evolve as the platform changes."] },
      { id: "incident-response", heading: "Incident response", paragraphs: ["InDataFlow maintains procedures for investigating, containing and responding to suspected security incidents and personal-data breaches, including customer and regulatory notification where required by applicable law or contract."] },
      { id: "customer-responsibilities", heading: "Customer responsibilities", paragraphs: ["Security is shared. Customers should use strong credentials, limit access to appropriate personnel, promptly remove access for departing users, avoid submitting unnecessary sensitive information and report suspected compromise promptly."] },
      { id: "security-claims-and-certifications", heading: "Security claims and certifications", paragraphs: ["Unless expressly stated in a current written InDataFlow document, this page should not be interpreted as a claim of a particular third-party certification, penetration-test status, uninterrupted monitoring service or regulatory endorsement."] },
      { id: "report-a-security-issue", heading: "Report a security issue", paragraphs: ["Security concerns may currently be reported to indoha@indataflow.com. InDataFlow may publish a dedicated security contact as the service matures."] },
    ],
  },
];

export function getCompanyDocument(slug: string | undefined) {
  return companyDocuments.find((document) => document.slug === slug);
}
