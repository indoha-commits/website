import { useEffect, useState } from "react";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const metrics = [
  { label: "Shipments Tracked", value: 2847, suffix: "+" },
  { label: "Documents Processed", value: 12459, suffix: "+" },
  { label: "Active Users", value: 156, suffix: "" },
  { label: "Avg. Time Saved", value: 68, suffix: "%" },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function LiveMetrics() {
  return (
    <section className="py-8 bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <p className="text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-2">Live Operations</p>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-[-0.02em]">Real logistics happening right now</h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <ScrollAnimation key={metric.label} animation="fade-up" delay={index * 100}>
              <div className="text-center p-6 rounded-[16px] bg-[#0F1011] border border-white/08">
                <div className="text-3xl md:text-4xl font-bold text-[#5E6AD2] mb-2 font-mono">
                  <CountUp end={metric.value} />
                  {metric.suffix}
                </div>
                <div className="text-sm text-white/50">{metric.label}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
