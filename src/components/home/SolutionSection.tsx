import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { X, ChevronLeft, ChevronRight, Archive, CheckCircle2, Clock3, Eye, FileCheck2, ShieldCheck, UserX, Waypoints } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const internalFeatures = [
  { label: "Complete cargo lifecycle control", icon: Waypoints },
  { label: "Document validation and verification", icon: FileCheck2 },
  { label: "Milestone tracking with timestamps", icon: Clock3 },
  { label: "Full activity and audit trail", icon: Archive },
];

const clientFeatures = [
  { label: "Real-time shipment visibility", icon: Eye },
  { label: "Secure document upload portal", icon: ShieldCheck },
  { label: "Transparent status updates", icon: CheckCircle2 },
  { label: "Fewer calls, fewer disputes", icon: UserX },
];

const cycleScreens = ["/internal_dashboard2.png", "/VIEWDOC.png", "/SECONDTRY.png"];

const internalScreens = [
  { title: "Dashboard Overview", description: "Track all active shipments with real-time status updates" },
  { title: "Document Management", description: "Upload, validate, and organize all cargo documentation" },
  { title: "Milestone Tracking", description: "Monitor every step of the cargo lifecycle with timestamps" },
  { title: "Activity Log", description: "Complete audit trail of all operations and changes" },
];

const clientScreens = [
  { title: "Shipment Status", description: "Real-time visibility into your cargo's journey" },
  { title: "Document Portal", description: "Securely upload and access all shipment documents" },
  { title: "Timeline View", description: "Visual progress tracking from origin to destination" },
  { title: "Notifications", description: "Stay updated with automatic status alerts" },
];

export function SolutionSection() {
  const [openModal, setOpenModal] = useState<"internal" | "client" | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [clientCycleIndex, setClientCycleIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cycleScreens.length);
      setClientCycleIndex((prev) => (prev + 1) % cycleScreens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentScreens = openModal === "internal" ? internalScreens : clientScreens;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? currentScreens.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === currentScreens.length - 1 ? 0 : prev + 1));
  };

  const handleOpen = (type: "internal" | "client") => {
    setOpenModal(type);
    setActiveIndex(0);
  };

  return (
    <section className="section-padding bg-[#010102]">
      <div className="container-wide">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 tracking-[-0.02em]">
              One system for internal operations and client visibility.
            </h2>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
              A shared source of truth across your entire cargo operation without exposing internal complexity.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
          {/* Internal Operations */}
          <ScrollAnimation className="flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-6">Internal Operations Dashboard</h3>
            
            <button
              onClick={() => handleOpen("internal")}
              className="w-full rounded-[16px] overflow-hidden border border-white/08 mb-6 group cursor-pointer transition-all hover:border-[#5E6AD2]/50"
            >
              <div className="relative aspect-[16/10] bg-[#0A0A0B]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={cycleScreens[cycleIndex]}
                    src={cycleScreens[cycleIndex]}
                    alt="Internal operations dashboard preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </button>
            
            <ul className="grid sm:grid-cols-2 gap-3 flex-grow">
              {internalFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="group flex items-start gap-3 bg-[#0F1011] rounded-[10px] p-3.5 border border-white/08 hover:border-white/20 transition-all duration-300">
                    <div className="w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <span className="text-[15px] text-white/75 leading-[1.45] font-medium">{feature.label}</span>
                  </li>
                );
              })}
            </ul>
          </ScrollAnimation>

          {/* Client Dashboard */}
          <ScrollAnimation delay={100} className="flex flex-col h-full">
            <h3 className="text-xl font-bold text-white mb-6">Client Dashboard</h3>
            
            <button
              onClick={() => handleOpen("client")}
              className="w-full rounded-[16px] overflow-hidden border border-white/08 mb-6 group cursor-pointer transition-all hover:border-[#5E6AD2]/50"
            >
              <div className="relative aspect-[16/10] bg-[#0A0A0B]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={cycleScreens[clientCycleIndex]}
                    src={cycleScreens[clientCycleIndex]}
                    alt="Client dashboard preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </AnimatePresence>
              </div>
            </button>
            
            <ul className="grid sm:grid-cols-2 gap-3 flex-grow">
              {clientFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.label} className="group flex items-start gap-3 bg-[#0F1011] rounded-[10px] p-3.5 border border-white/08 hover:border-white/20 transition-all duration-300">
                    <div className="w-8 h-8 rounded-[8px] border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#5E6AD2] group-hover:text-white group-hover:border-[#5E6AD2]/40 transition-colors duration-300 shrink-0">
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <span className="text-[15px] text-white/75 leading-[1.45] font-medium">{feature.label}</span>
                  </li>
                );
              })}
            </ul>
          </ScrollAnimation>
        </div>
      </div>

      {/* Expanded Modal */}
      <Dialog open={openModal !== null} onOpenChange={() => setOpenModal(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-[#010102] border border-white/08 overflow-hidden [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>
              {openModal === "internal" ? "Internal Operations Dashboard" : "Client Dashboard"} Preview
            </DialogTitle>
          </VisuallyHidden>
          
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-white/08">
              <div>
                <h3 className="font-bold text-white">
                  {openModal === "internal" ? "Internal Operations" : "Client Dashboard"}
                </h3>
                <p className="text-sm text-white/50">{currentScreens[activeIndex]?.title}</p>
              </div>
              <button
                onClick={() => setOpenModal(null)}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6 bg-[#010102] relative overflow-hidden">
              <button
                onClick={handlePrev}
                className="absolute left-4 z-10 p-3 rounded-full bg-[#0F1011]/80 border border-white/12 hover:bg-white/10 hover:border-white/25 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              
              <div className="w-full max-w-3xl rounded-[12px] overflow-hidden border border-white/08 bg-[#0F1011]">
                {openModal === "internal" ? (
                  <ExpandedInternalMockup screenIndex={activeIndex} />
                ) : (
                  <ExpandedClientMockup screenIndex={activeIndex} />
                )}
              </div>

              <button
                onClick={handleNext}
                className="absolute right-4 z-10 p-3 rounded-full bg-[#0F1011]/80 border border-white/12 hover:bg-white/10 hover:border-white/25 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4 border-t border-white/08">
              <p className="text-center text-white/50 mb-4">{currentScreens[activeIndex]?.description}</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xs text-white/30 font-mono tabular-nums">
                  {activeIndex + 1} / {currentScreens.length}
                </span>
                <div className="flex gap-2">
                  {currentScreens.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeIndex ? "bg-[#5E6AD2] w-5" : "bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ExpandedInternalMockup({ screenIndex }: { screenIndex: number }) {
  const screens = [
    <img key="viewdoc" src="/VIEWDOC.png" alt="Document review screen" className="w-full h-full object-cover" />,
    <img key="update" src="/UPDATE.png" alt="Update screen" className="w-full h-full object-cover" />,
    <img key="timeline" src="/TIMELINE.png" alt="Timeline screen" className="w-full h-full object-cover" />,
    <img key="audit" src="/AUDIT.png" alt="Audit log screen" className="w-full h-full object-cover" />,
  ];
  return screens[screenIndex] || screens[0];
}

function ExpandedClientMockup({ screenIndex }: { screenIndex: number }) {
  const screens = [
    <img key="c1" src="/C_1.png" alt="Client dashboard view 1" className="w-full h-full object-cover" />,
    <img key="c2" src="/C_2.png" alt="Client dashboard view 2" className="w-full h-full object-cover" />,
    <img key="c3" src="/C_3.png" alt="Client dashboard view 3" className="w-full h-full object-cover" />,
    <img key="c4" src="/C_4.png" alt="Client dashboard view 4" className="w-full h-full object-cover" />,
  ];
  return screens[screenIndex] || screens[0];
}
