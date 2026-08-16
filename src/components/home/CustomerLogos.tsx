import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const customers = [
  { name: "Kigali Mining Corp", logo: "KMC" },
  { name: "Rwanda Tea Importers", logo: "RTI" },
  { name: "East Africa Freight", logo: "EAF" },
  { name: "Butare Electronics", logo: "BE" },
  { name: "Gisenyi Coffee", logo: "GC" },
];

export function CustomerLogos() {
  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <p className="text-center text-xs text-white/50 uppercase tracking-[0.15em] font-mono mb-8">
            Trusted by logistics operators across East Africa
          </p>
        </ScrollAnimation>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {customers.map((customer, index) => (
            <ScrollAnimation key={customer.name} animation="fade-up" delay={index * 80}>
              <div className="w-32 h-16 flex items-center justify-center bg-[#0F1011] rounded-[12px] border border-white/08">
                <span className="text-xl font-bold text-white/35 font-mono">
                  {customer.logo}
                </span>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
