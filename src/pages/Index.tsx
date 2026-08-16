import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { DashboardGallery } from "@/components/home/DashboardGallery";
import { LiveMetrics } from "@/components/home/LiveMetrics";
import { CustomerLogos } from "@/components/home/CustomerLogos";
import { ProblemSection } from "@/components/home/ProblemSection";
import { SolutionSection } from "@/components/home/SolutionSection";
import { ProofSection } from "@/components/home/ProofSection";
import { MiniDemo } from "@/components/home/MiniDemo";
import { CTASection } from "@/components/home/CTASection";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DashboardGallery />
      <ScrollAnimation>
        <ProblemSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <SolutionSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <ProofSection />
      </ScrollAnimation>
      <ScrollAnimation>
        <CTASection />
      </ScrollAnimation>
    </Layout>
  );
};

export default Index;
