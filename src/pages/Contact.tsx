import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      <section className="section-padding bg-[#010102]">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="text-4xl md:text-5xl leading-[1.2] font-serif font-bold text-white tracking-[-0.03em] mb-6">
                  Book a walkthrough
                </h1>
                <p className="text-lg sm:text-xl leading-[1.6] text-white/70 mb-8">
                  See how InDataFlow can transform your logistics operation. Fill out the form and we'll schedule a personalized demo.
                </p>

                <div className="space-y-6">
                  {[
                    { title: "30-minute walkthrough", desc: "See the platform in action with real workflows relevant to your operation." },
                    { title: "Custom configuration preview", desc: "We'll show you how InDataFlow would look for your specific cargo types." },
                    { title: "No commitment required", desc: "Just a conversation about whether InDataFlow is right for you." },
                  ].map((item, index) => (
                    <ScrollAnimation key={item.title} animation="fade-up" delay={index * 100}>
                      <div>
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-white/70">{item.desc}</p>
                      </div>
                    </ScrollAnimation>
                  ))}
                </div>

                <ScrollAnimation animation="fade-up" delay={300}>
                  <div className="mt-12">
                    <h3 className="font-bold text-white mb-4">Other ways to reach us</h3>
                    <a href="mailto:hello@indataflow.com" className="text-white/50 hover:text-white transition-colors">
                      hello@indataflow.com
                    </a>
                  </div>
                </ScrollAnimation>
              </div>

              <ScrollAnimation animation="fade-up" delay={200}>
                <div className="bg-[#0F1011] rounded-[16px] border border-white/08 p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">Thank you!</h2>
                      <p className="text-white/50">
                        We'll be in touch within 24 hours to schedule your walkthrough.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input id="name" placeholder="Your name" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">Company</Label>
                        <Input id="company" placeholder="Your company name" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-white">Country</Label>
                        <Input id="country" placeholder="Where are you based?" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volume" className="text-white">Monthly cargo volume (optional)</Label>
                        <Input id="volume" placeholder="e.g., 100-200 shipments" className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <Button type="submit" className="w-full">
                        Book a walkthrough
                      </Button>
                      <p className="text-xs text-center text-white/35">
                        We'll respond within 24 hours. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
