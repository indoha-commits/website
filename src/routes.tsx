import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Product from "./pages/Product";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import CaseStudy from "./pages/CaseStudy";
import Contact from "./pages/Contact";
import CompanyDocumentation from "./pages/CompanyDocumentation";
import CompanyDocumentTranscript from "./pages/CompanyDocumentTranscript";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FreightForwarders from "./pages/FreightForwarders";
import ClearingAgents from "./pages/ClearingAgents";
import Resources from "./pages/Resources";
import BillOfLadingWorkflow from "./pages/BillOfLadingWorkflow";
import CommercialInvoiceWorkflow from "./pages/CommercialInvoiceWorkflow";
import PackingListWorkflow from "./pages/PackingListWorkflow";

export function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product" element={<Product />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/case-study" element={<CaseStudy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/company-documentation" element={<CompanyDocumentation />} />
      <Route path="/company-documentation/:slug" element={<CompanyDocumentTranscript />} />
      <Route path="/solutions/freight-forwarders" element={<FreightForwarders />} />
      <Route path="/solutions/clearing-agents" element={<ClearingAgents />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/resources/bill-of-lading-workflow" element={<BillOfLadingWorkflow />} />
      <Route path="/resources/commercial-invoice-workflow" element={<CommercialInvoiceWorkflow />} />
      <Route path="/resources/packing-list-workflow" element={<PackingListWorkflow />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
