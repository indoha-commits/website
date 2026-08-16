import { motion } from "framer-motion";

export function DashboardGallery() {
  return (
    <section className="section-padding pt-0 bg-[#010102] overflow-hidden">
      <div className="container-wide mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-3">The full picture</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-[-0.02em]">
            Every dashboard. One platform.
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="container-wide"
      >
        <div className="relative rounded-[16px] overflow-hidden border border-white/[0.12]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/14294690_3840_2160_24fps.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
    </section>
  );
}
