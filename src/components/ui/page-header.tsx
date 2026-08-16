import { ReactNode } from "react";
import { AnimatedWords } from "@/components/ui/animated-text";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <section className={`section-padding bg-[#010102] ${className ?? ""}`}>
      <div className="container-wide">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
            <AnimatedWords text={title} staggerDelay={80} />
          </h1>
          {description && (
            <p className="text-lg sm:text-xl leading-[1.6] text-white/70 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8 flex justify-center">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
