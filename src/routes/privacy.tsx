import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ABA" },
      { name: "description", content: "How the Asia Basketball Association collects and uses your information." },
      { property: "og:title", content: "Privacy Policy — ABA" },
      { property: "og:description", content: "How the ABA collects and uses your information." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  { title: "Information Collection", body: "The ABA collects information you provide directly (account details, contact form entries) and information gathered automatically as you use our sites, apps, and services (device, browser, and usage data)." },
  { title: "Cookies", body: "We use first-party and third-party cookies to remember preferences, measure audience, and improve the fan experience. You can control cookies through your browser settings at any time." },
  { title: "Data Usage", body: "Your data helps us operate the league's digital properties, personalize content, deliver relevant communications, and analyze performance. We do not sell personal information." },
  { title: "Third-party Services", body: "We work with trusted analytics, hosting, and communication providers under strict data-processing agreements. Broadcast partners may access aggregate viewership data." },
  { title: "Security", body: "We apply industry-standard technical and organizational safeguards, including encryption in transit, access controls, and continuous monitoring." },
  { title: "Contact Information", body: "Questions about this policy? Reach us at privacy@aba-basketball.asia or write to our Singapore office listed on the Contact page." },
];

function PrivacyPage() {
  return (
    <PageShell>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Legal</div>
        <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">Privacy Policy</h1>
        <div className="mt-2 text-sm text-muted-foreground">Last updated: July 27, 2026</div>

        <div className="mt-10 space-y-6">
          {sections.map((s, i) => (
            <article key={i} className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold flex items-baseline gap-3">
                <span className="text-primary tabular-nums text-sm">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}