import { Link } from "react-router-dom";
import logoImage from "@/assets/indataflow-logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#010102] border-t border-white/[0.06]">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4">
              <img src={logoImage} alt="InDataFlow" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-base text-white/60 leading-[1.75] max-w-md mb-4">
              InDataFlow is a cargo operations platform that connects shipment documents, validation, events, approvals and client updates into one traceable shipment record.
            </p>
            <p className="text-sm text-white/38 font-mono">Built for freight forwarders, clearing agents and logistics teams operating across East Africa.</p>
          </div>

          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">Product</h4>
            <ul className="space-y-3">
              {[
                { name: "Product", href: "/product/" },
                { name: "How It Works", href: "/how-it-works/" },
                { name: "Pricing", href: "/pricing/" },
                { name: "Case Study", href: "/case-study/" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">Solutions</h4>
            <ul className="space-y-3">
              {[
                { name: "Freight Forwarders", href: "/solutions/freight-forwarders/" },
                { name: "Clearing Agents", href: "/solutions/clearing-agents/" },
                { name: "Resources", href: "/resources/" },
                { name: "Contact", href: "/contact/" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">Resources</h4>
            <ul className="space-y-3 mb-8">
              {[
                { name: "Bill of Lading Workflow", href: "/resources/bill-of-lading-workflow/" },
                { name: "Commercial Invoice Workflow", href: "/resources/commercial-invoice-workflow/" },
                { name: "Packing List Workflow", href: "/resources/packing-list-workflow/" },
                { name: "Company Documents", href: "/company-documentation/" },
              ].map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-3 leading-[1.4]">Contact</h4>
            <a href="mailto:hello@indataflow.com" className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]">
              hello@indataflow.com
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35 font-mono leading-[1.5]">&copy; {currentYear} InDataFlow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/company-documentation/privacy-notice/" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Privacy
            </Link>
            <Link to="/company-documentation/terms-of-service/" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Terms
            </Link>
            <Link to="/company-documentation/security/" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
