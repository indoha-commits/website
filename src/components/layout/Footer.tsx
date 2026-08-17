import { Link } from "react-router-dom";
import logoImage from "@/assets/indataflow-logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#010102] border-t border-white/[0.06]">
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4">
              <img src={logoImage} alt="InDataFlow" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-base text-white/60 leading-[1.75] max-w-md">
              The operating system for port-to-warehouse logistics. Track cargo, manage documents, and give clients visibility from first entry to final delivery.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Product", href: "/product" },
                { name: "How It Works", href: "/how-it-works" },
                { name: "Pricing", href: "/pricing" },
                { name: "Case Study", href: "/case-study" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Contact", href: "/contact" },
                { name: "Case Study", href: "/case-study" },
                { name: "Company Documents", href: "/company-documentation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Social */}
          <div>
            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">
              Legal
            </h4>
            <ul className="space-y-3 mb-8">
              {[
                { name: "Privacy Policy", href: "/company-documentation/privacy-notice" },
                { name: "Terms of Service", href: "/company-documentation/terms-of-service" },
                { name: "Cookie Policy", href: "/company-documentation/privacy-notice#cookies-and-website-technologies" },
                { name: "Data Processing", href: "/company-documentation/terms-of-service#data-protection-and-dpa" },
                { name: "Company Documents", href: "/company-documentation" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base text-white/58 hover:text-white transition-colors leading-[1.55]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-xs text-white/30 uppercase tracking-[0.15em] font-mono mb-5 leading-[1.4]">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/[0.12] bg-[#0F1011] flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all group"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/50 group-hover:text-white transition-colors">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/[0.12] bg-[#0F1011] flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all group"
                aria-label="X (Twitter)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/50 group-hover:text-white transition-colors">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                </svg>
              </a>
              <a
                href="mailto:hello@indataflow.com"
                className="w-10 h-10 rounded-lg border border-white/[0.12] bg-[#0F1011] flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-all group"
                aria-label="Email"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/50 group-hover:text-white transition-colors">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/35 font-mono leading-[1.5]">
            &copy; {currentYear} InDataFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/company-documentation/privacy-notice" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Privacy
            </Link>
            <Link to="/company-documentation/terms-of-service" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Terms
            </Link>
            <Link to="/company-documentation/privacy-notice#cookies-and-website-technologies" className="text-sm text-white/35 hover:text-white/65 transition-colors font-mono leading-[1.5]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
