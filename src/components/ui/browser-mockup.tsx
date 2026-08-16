import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useRef } from "react";

interface BrowserMockupProps {
  src: string;
  alt: string;
  tilt?: boolean;
  className?: string;
}

export function BrowserMockup({ src, alt, tilt = false, className = "" }: BrowserMockupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={tilt ? { rotateX, rotateY, perspective: 1000 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`relative w-full rounded-[12px] overflow-hidden border border-white/[0.12] bg-[#0A0A0B] shadow-[0_0_60px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="absolute -top-24 -left-24 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top,rgba(94,106,210,0.08),transparent_70%)] pointer-events-none" />
      <div className="flex items-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3 border-b border-white/[0.08] relative z-[1]">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
      </div>
      <motion.img
        src={src}
        alt={alt}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.3, delay: 0.08, ease: "easeOut" }}
        className="w-full h-auto block relative z-[1] transition-transform duration-300 ease-out hover:scale-[1.01]"
      />
    </motion.div>
  );
}
