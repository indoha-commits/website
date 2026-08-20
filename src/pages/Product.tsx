import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const statusSteps = [
  { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Validating", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { label: "Validated", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Approved", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" },
];

const docFlowSteps = [
  { label: "Uploaded", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { label: "Validating", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { label: "Verified", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Notified", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" },
];

const integrationSteps = [
  { label: "Email", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "WhatsApp", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Documents", status: "Connected", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { label: "Dashboard", status: "Live", color: "bg-[#5E6AD2]/20 text-[#5E6AD2] border-[#5E6AD2]/30" },
];

function SectionFade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContentSection({
  eyebrow,
  title,
  description,
  tilt = false,
  imageSrc,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tilt?: boolean;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <SectionFade>
      <section className="section-padding bg-[#010102] overflow-hidden">
        <div className="container-wide">
          <div className="mx-auto max-w-5xl text-center mb-8 sm:mb-10 lg:mb-12">
            <p className="text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4 leading-[1.5]">
              {eyebrow}
            </p>
            <h2 className="text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white mb-4 sm:mb-5 tracking-[-0.02em]">
              {title}
            </h2>
            <p className="text-[17px] sm:text-lg leading-[1.7] text-white/70 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          <div className="mx-auto w-full max-w-6xl">
            <BrowserMockup src={imageSrc} alt={imageAlt} tilt={tilt} />
          </div>
        </div>
      </section>
    </SectionFade>
  );
}

function StatusAnimation() {
  const finalStatus = statusSteps[statusSteps.length - 1];

  return (
    <div className="bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm sm:text-base text-white/50 font-mono leading-[1.5]">Cargo-2847</div>
        <div className="text-xs sm:text-sm text-white/30 font-mono leading-[1.5]">2 min ago</div>
      </div>
      <div className="space-y-3">
        {statusSteps.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 flex-none rounded-full bg-[#5E6AD2]" />
            <div className="flex-1 min-w-0 text-sm sm:text-base text-white/70 leading-[1.5]">
              Document {status.label.toLowerCase()}
            </div>
            <div className={`px-2.5 sm:px-3 py-1 rounded-[6px] border text-xs sm:text-sm font-mono leading-[1.4] ${status.color}`}>
              {status.label}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.55, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="mt-4 pt-4 border-t border-white/[0.06]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs sm:text-sm text-white/40 font-mono leading-[1.5]">Status updated</span>
          <div className={`px-3 py-1.5 rounded-[6px] border text-sm sm:text-base font-mono leading-[1.4] ${finalStatus.color}`}>
            {finalStatus.label}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function DocumentDemo() {
  const finalStatus = docFlowSteps[docFlowSteps.length - 1];

  return (
    <div className="bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5E6AD2]/20 border border-[#5E6AD2]/30 flex items-center justify-center">
            <span className="text-sm text-[#5E6AD2] font-bold">PDF</span>
          </div>
          <div>
            <div className="text-sm text-white font-medium leading-[1.4]">Bill of Lading #2847</div>
            <div className="text-xs text-white/40 font-mono leading-[1.4]">Client upload</div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {docFlowSteps.map((status, index) => (
          <motion.div
            key={status.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 flex-none rounded-full bg-[#5E6AD2]" />
            <div className="flex-1 min-w-0 text-xs sm:text-sm text-white/70 leading-[1.5]">
              {index === 0 && "Document received from client"}
              {index === 1 && "System validating contents"}
              {index === 2 && "All fields match requirements"}
              {index === 3 && "Client notified of approval"}
            </div>
            <div className={`px-2 sm:px-2.5 py-0.5 rounded-[6px] border text-[11px] sm:text-xs font-mono leading-[1.4] whitespace-nowrap ${status.color}`}>
              {status.label}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.55, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="mt-4 pt-4 border-t border-white/[0.06]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-white/40 font-mono leading-[1.5]">Last updated</span>
          <div className={`px-3 py-1 rounded-[6px] border text-xs sm:text-sm font-mono leading-[1.4] ${finalStatus.color}`}>
            {finalStatus.label}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IntegrationDemo() {
  return (
    <div className="bg-[#0F1011] rounded-[12px] border border-white/[0.12] p-5 sm:p-6 max-w-[500px] mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-white/40 font-mono leading-[1.4]">System Status</span>
      </div>
      <div className="space-y-3">
        {integrationSteps.map((integration, index) => (
          <motion.div
            key={integration.label}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 + index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.8 }}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.22, delay: 0.14 + index * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.8 }}
                className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
              >
                <span className="text-[10px] text-green-400">&#10003;</span>
              </motion.div>
              <span className="text-sm text-white/80 leading-[1.5]">{integration.label}</span>
            </div>
            <div className={`px-2 sm:px-2.5 py-0.5 rounded-[6px] border text-[11px] sm:text-xs font-mono leading-[1.4] ${integration.color}`}>
              {integration.status}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.55, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.8 }}
        className="mt-4 pt-4 border-t border-white/[0.06]"
      >
        <div className="text-xs text-white/50 font-mono leading-[1.5]">All systems operational</div>
      </motion.div>
    </div>
  );
}

function MicroDemoHub() {
  return (
    <>
      <section className="section-padding pb-0 bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-[#5E6AD2] uppercase tracking-[0.15em] font-mono mb-4 leading-[1.5]">
              Live system
            </p>
            <h2 className="text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white tracking-[-0.02em]">
              See the operation run in real time.
            </h2>
          </div>
        </div>
      </section>

      <section className="relative bg-[#010102]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/15231603_3840_2160_25fps-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010102]/20 via-transparent to-[#010102]/40" />
        </div>

        <div className="container-wide relative z-10 -mt-[100svh] py-[18vh] sm:py-[20vh]">
          <div className="ml-auto w-full max-w-[540px] space-y-[28vh] sm:space-y-[32vh]">
            <SectionFade>
              <StatusAnimation />
            </SectionFade>
            <SectionFade>
              <DocumentDemo />
            </SectionFade>
            <SectionFade>
              <IntegrationDemo />
            </SectionFade>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Product() {
  return (
    <Layout className="product-page overflow-x-clip">
      <section className="relative min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)] flex items-center bg-[#010102]">
        <div className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/15231603_3840_2160_25fps-loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010102]/10 via-[#010102]/20 to-[#010102]/40" />
        </div>
        <PageHeader
          title="The control layer for modern logistics operations."
          description="Connect your messages, documents, and operational systems. InDataFlow gives your team one live view of what is happening and what needs to happen next."
          className="bg-transparent relative z-10 w-full py-24 sm:py-28 md:py-32 lg:py-36 [&_h1]:mb-7 [&_p]:max-w-4xl [&_p]:text-white/75 [&_p]:leading-[1.7] [&_.mt-8]:mt-10"
        >
          <Button asChild className="w-full sm:w-auto">
            <Link to="/contact">Book a walkthrough</Link>
          </Button>
        </PageHeader>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010102] to-transparent pointer-events-none z-10" />
      </section>

      <ContentSection
        eyebrow="Operations"
        title="Your operation, finally under control."
        description="Your command center for daily operations. See what is happening, what needs attention, and what happens next without chasing updates across WhatsApp, email, and spreadsheets."
        tilt
        imageSrc="/indataflow_product_page_video_v2_longer_transitions.mp4"
        imageAlt="Internal operations dashboard showing cargo timeline, active shipments, and exception alerts"
      />

      <ContentSection
        eyebrow="AI connected"
        title="Information comes from everywhere. Control lives in one place."
        description="AI agents connect the messages, documents, and systems your operation already depends on, turning fragmented information into structured operational context."
        imageSrc="/indataflow_product_page_video_2_v2_richer.mp4"
        imageAlt="Operational timeline showing aggregated events from WhatsApp, email, documents, and connected systems into a single feed"
      />

      <MicroDemoHub />

      <section className="section-padding bg-[#010102]">
        <div className="container-wide text-center">
          <h2 className="text-2xl leading-[1.2] sm:text-3xl font-serif font-bold text-white mb-5 tracking-[-0.02em]">
            Ready to see InDataFlow in action?
          </h2>
          <p className="text-[17px] sm:text-lg leading-[1.7] text-white/70 mb-8">
            Book a walkthrough and see how it fits your operation.
          </p>
          <Button asChild className="inline-flex w-full sm:w-auto items-center gap-2">
            <Link to="/contact">
              Book a walkthrough
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
