# InDataFlow — Product & Pricing

AI-powered operations platform for freight forwarders in East Africa. Handles document extraction, cargo tracking, client communication, and billing.

---

## Core Platform

### Jarvis AI — Document Processing Pipeline

1. **Document received** — via email, WhatsApp, Google Drive, or direct upload
2. **OCR + LLM extraction** — Google Vision OCR reads scans; LLM extracts B/L, containers, HS codes, ports, dates
3. **Human validation** — team approves in one review screen
4. **Cargo created automatically** — entry created, sibling docs linked, client notified

Supports: Bills of Lading, Commercial Invoices, Packing Lists, and 5+ document types.

Metrics: 80% less manual entry, ~2 min per document.

---

### Operations Dashboard

| Feature | Description |
|---------|------------|
| Cargo registry | Searchable database with status filters |
| Timeline & milestones | Per-container event timeline (port → warehouse) |
| Validation queue | Human-in-the-loop review of AI-extracted data |
| Activity log | Complete audit trail of every action |

Dashboard stats: Pending validation, Awaiting docs, In transit, Cleared, Overdue, Failed.

---

### Client Portal

| Feature | Description |
|---------|------------|
| Real-time tracking | Live status, ETA, latest milestone |
| Document upload | Clients upload required docs directly |
| Proof & audit trail | Timestamped records, transparent to clients |
| WhatsApp alerts | Milestone notifications — no app, no login |

---

### WhatsApp & Communication

- **Per-milestone alerts** — departed port, arrived warehouse
- **Two-way document intake** — clients forward docs via WhatsApp, Jarvis ingests
- **Email intake** — per-tenant aliases, attachments parsed and routed

---

### Finance & Billing

| Feature | Description |
|---------|------------|
| Auto-invoicing | Daily cron generates invoices per cycle with per-shipment line items |
| MTN MoMo & M-Pesa | Native mobile money collection |
| Payment tracking | Status, partial payments, overdue accounts |

---

### Integrations (6)

Google Drive, Dropbox, OneDrive, WhatsApp, Email, Supabase Storage.

---

### Scale / Enterprise Features

| Feature | Description |
|---------|------------|
| Multi-tenant | Serve multiple clients with full data isolation |
| Secure access | Role-based access control (team + clients) |
| SLA-ready | Built-in SLA tracking and alerting per shipment |
| Audit-grade logs | Compliance-ready logging |

---

## Pricing

All plans include: cargo timeline dashboard, document upload + validation, clearing progress visibility, storage day counter, digital archive, email notifications. Unlimited dashboard users and client portal accounts on all plans.

| Plan | Price | Volume | Key differentiators |
|------|-------|--------|-------------------|
| **Starter** | $250/mo | Up to 30 shipments, 3 clients, 1 ops number | 500 WhatsApp msgs, 90 OCR docs, 30 AI extractions/mo |
| **Growth** | $500/mo | Up to 100 shipments, 10 clients, 2 ops numbers | 2,000 WhatsApp msgs, 400 OCR docs, 100 AI extractions/mo, email intake |
| **Custom** | Custom | Unlimited | Dedicated support, unlimited usage, SLA priority |

Overage: $6/extra shipment, plus low per-unit rates for WhatsApp, OCR, and AI overage. Annual discount: 15% off, billed yearly. One-time setup: $1,000.

### Pricing philosophy

- Volume-based (not per-seat)
- No per-user pricing
- No hidden fees

---

## Case Study Outcomes

From a real freight forwarder deployment:

- **70%** reduction in client communication (calls → portal)
- **50%** faster document collection
- **~0** disputes (timestamped audit trail)
- Days to onboard new staff (vs weeks)

---

## Routes

| Path | Page |
|------|------|
| `/` | Home (Index) |
| `/product` | Product features |
| `/how-it-works` | How it works |
| `/pricing` | Pricing plans |
| `/case-study` | Case study |
| `/contact` | Contact / demo request |
| `/login` | Client login |
