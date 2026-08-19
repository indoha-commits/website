import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { submitLead, validateLead, type LeadPayload } from "@/lib/lead";
import { useState } from "react";
import { Link } from "react-router-dom";

type FormState = "idle" | "submitting" | "success" | "error";

function utmParams(): Pick<LeadPayload, "utm_source" | "utm_medium" | "utm_campaign"> {
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => params.get(key)?.trim() || undefined;
  return {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
  };
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState === "submitting" || formState === "success") return;

    const form = e.currentTarget;
    const payload: LeadPayload = {
      name: new FormData(form).get("name")?.toString().trim() ?? "",
      company: new FormData(form).get("company")?.toString().trim() ?? "",
      country: new FormData(form).get("country")?.toString().trim() ?? undefined,
      email: new FormData(form).get("email")?.toString().trim() ?? "",
      phone: new FormData(form).get("phone")?.toString().trim() || undefined,
      volume: new FormData(form).get("volume")?.toString().trim() || undefined,
      pricing_tier: (new FormData(form).get("pricing_tier")?.toString().trim() || undefined) as LeadPayload["pricing_tier"],
      message: new FormData(form).get("message")?.toString().trim() || undefined,
      source_page: window.location.pathname,
      ...utmParams(),
    };

    const clientError = validateLead(payload);
    if (clientError) {
      setFormError(clientError);
      return;
    }
    setFormError(null);

    setFormState("submitting");
    setError(null);

    const result = await submitLead(payload);
    if (result.ok === true) {
      setFormState("success");
    } else {
      setFormState("error");
      setError(result.error);
    }
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
                  {formState === "success" ? (
                    <div className="text-center py-8" role="status">
                      <h2 className="text-2xl font-serif font-bold text-white mb-2">Thank you!</h2>
                      <p className="text-white/50">
                        We've received your request and will be in touch within 24 hours to schedule your walkthrough.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-white">Company</Label>
                        <Input id="company" name="company" placeholder="Your company name" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@company.com" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">Phone <span className="text-white/35 font-normal">(optional)</span></Label>
                        <Input id="phone" name="phone" type="tel" placeholder="+250 ..." className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-white">Country</Label>
                        <Input id="country" name="country" placeholder="Where are you based?" required className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pricing_tier" className="text-white">Plan</Label>
                        <select
                          id="pricing_tier"
                          name="pricing_tier"
                          defaultValue="starter"
                          className="h-12 w-full bg-[#010102] border border-white/08 text-white rounded-lg px-4 text-sm focus:outline-none focus:ring-1 focus:ring-white/20 [&>option]:text-gray-900"
                        >
                          <option value="starter">Starter — $250/mo</option>
                          <option value="growth">Growth — $500/mo</option>
                          <option value="custom">Custom</option>
                        </select>
                        <p className="text-xs text-white/35">
                          <Link to="/pricing" className="underline hover:text-white">
                            See what's included in each plan
                          </Link>
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="volume" className="text-white">Monthly cargo volume (optional)</Label>
                        <Input id="volume" name="volume" placeholder="e.g., 100-200 shipments" className="h-12 bg-[#010102] border-white/08 text-white" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">Message</Label>
                        <Textarea id="message" name="message" placeholder="Tell us about your operation, cargo types, or what you'd like to see" className="min-h-[110px] bg-[#010102] border-white/08 text-white" />
                      </div>

                      {formError && (
                        <p role="alert" className="text-sm text-red-400">{formError}</p>
                      )}
                      {formState === "error" && error && (
                        <p role="alert" className="text-sm text-red-400">{error}</p>
                      )}

                      <Button type="submit" className="w-full" disabled={formState === "submitting"}>
                        {formState === "submitting" ? "Submitting..." : "Book a walkthrough"}
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
