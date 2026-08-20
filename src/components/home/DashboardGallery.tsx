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
        className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8"
      >
        <div className="relative overflow-hidden rounded-[18px] border border-white/[0.14] bg-[#050506] shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
          <div className="relative aspect-[16/9] min-h-[260px] sm:min-h-[400px] lg:min-h-[600px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full scale-[1.012] object-cover object-center contrast-[1.08] saturate-[1.06] brightness-[1.03] [backface-visibility:hidden] [transform:translateZ(0)_scale(1.012)]"
            >
              <source src="/homepage_The_full_picture_hd.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_16%,rgba(0,0,0,0)_72%,rgba(0,0,0,0.30))]" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.08]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
