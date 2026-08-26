import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

export function CTASection() {
  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              One shipment record from document intake to verified cargo status.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Explore the product, solution pages and workflow guides that show how InDataFlow connects cargo operations, document validation and client visibility.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact">
                <Button className="bg-[#5E6AD2] h-[44px] rounded-[10px] px-8 text-white hover:bg-[#5E6AD2]/90 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2 group shadow-lg shadow-[#5E6AD2]/0 hover:shadow-[#5E6AD2]/20">
                  Book a walkthrough
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </Link>
              <Link to="/solutions/freight-forwarders">
                <Button variant="outline" className="h-[44px] rounded-[10px] px-8 inline-flex items-center gap-2">
                  View solutions
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" className="h-[44px] rounded-[10px] px-8 inline-flex items-center gap-2">
                  Read resources
                </Button>
              </Link>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
