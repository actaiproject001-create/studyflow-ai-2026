import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — StudyFlow AI" },
      { name: "description", content: "Get in touch with the StudyFlow AI team." },
      { property: "og:title", content: "Contact — StudyFlow AI" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <MarketingLayout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Contact</span>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Let's talk
            </h1>
            <p className="mt-4 text-muted-foreground">
              Have a question, feedback, or partnership idea? We'd love to hear from you.
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                { icon: Mail, label: "hello@studyflow.ai" },
                { icon: MessageCircle, label: "Chat with us anytime" },
                { icon: MapPin, label: "Remote-first, worldwide" },
              ].map((c) => (
                <li key={c.label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                    <c.icon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-foreground">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-border bg-card p-8 shadow-elegant"
          >
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input className="mt-1.5" placeholder="Jane Student" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input type="email" className="mt-1.5" placeholder="you@school.edu" />
              </div>
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea className="mt-1.5" rows={5} placeholder="How can we help?" />
              </div>
              <Button className="bg-gradient-primary text-white shadow-glow hover:opacity-95">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </MarketingLayout>
  );
}
