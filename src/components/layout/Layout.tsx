import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const layoutClassName = ["min-h-screen", "flex", "flex-col", "home-theme", className].filter(Boolean).join(" ");

  return (
    <div className={layoutClassName}>
      <Header />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
