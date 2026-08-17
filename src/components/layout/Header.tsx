import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/indataflow-logo.png";

const navigation = [
  { name: "Product", href: "/product" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Case Study", href: "/case-study" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Lock body scroll while the mobile menu is open so the page behind does not
  // move under the overlay. Restored when closed or on navigation.
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close the menu after navigating so it never stays stuck on a route change.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled || mobileMenuOpen ? "fixed top-0 left-0 right-0 z-50 border-b bg-[#010102]/95 border-white/[0.08] backdrop-blur-[12px] transition-[background-color,border-color] duration-200" : "fixed top-0 left-0 right-0 z-50 border-b bg-[#010102]/40 border-transparent backdrop-blur-[8px] transition-[background-color,border-color] duration-200"}>
      <nav className="container-wide flex items-center justify-between h-16 lg:h-20" aria-label="Primary navigation">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="InDataFlow" className="h-16 w-auto brightness-0 invert" />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="px-4 py-2 text-sm font-medium transition-colors text-white/50 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/contact">Get started</Link>
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-3 -mr-1 text-white/50 hover:text-white transition-colors duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-[#010102] border-t border-white/[0.08] animate-fade-in max-h-[calc(100svh-4rem)] overflow-y-auto">
          <div className="container-wide py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-3 text-white/50 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
