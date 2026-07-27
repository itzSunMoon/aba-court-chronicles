import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ABA" },
      { name: "description", content: "Get in touch with the Asia Basketball Association front office." },
      { property: "og:title", content: "Contact Us — ABA" },
      { property: "og:description", content: "Get in touch with the Asia Basketball Association." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Required").max(150),
  message: z.string().trim().min(10, "Min 10 characters").max(1000),
});
type FormData = z.infer<typeof schema>;

function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent — we'll get back to you soon.");
    reset();
    void data;
  };

  return (
    <PageShell>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-[11px] uppercase tracking-[0.3em] text-primary font-bold">Get in touch</div>
        <h1 className="mt-2 text-4xl md:text-6xl font-black tracking-tight">Contact Us</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Media, partnerships, or fan inquiries — we'd love to hear from you.</p>

        <div className="mt-12 grid lg:grid-cols-5 gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 glass-strong rounded-2xl p-8 space-y-5">
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name")} className={inputCls} placeholder="Your name" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input {...register("email")} type="email" className={inputCls} placeholder="you@example.com" />
            </Field>
            <Field label="Subject" error={errors.subject?.message}>
              <input {...register("subject")} className={inputCls} placeholder="How can we help?" />
            </Field>
            <Field label="Message" error={errors.message?.message}>
              <textarea {...register("message")} rows={6} className={inputCls} placeholder="Tell us more..." />
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-white font-semibold shadow-glow hover:scale-105 transition-transform disabled:opacity-50"
            >
              <Send className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <InfoRow icon={Mail} label="Email" value="league@aba-basketball.asia" />
            <InfoRow icon={Phone} label="Phone" value="+65 6812 4400" />
            <InfoRow icon={MapPin} label="Office" value="88 Marina Boulevard, Singapore 018985" />
            <div className="glass rounded-2xl overflow-hidden aspect-[4/3]">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=103.8,1.28,103.87,1.31&layer=mapnik"
                className="w-full h-full grayscale contrast-125"
                loading="lazy"
                title="Office map"
              />
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

const inputCls = "w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">{label}</label>
      {children}
      {error && <div className="mt-1 text-xs text-red-400">{error}</div>}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-5 flex items-start gap-4">
      <div className="p-2.5 rounded-lg bg-primary/20 text-primary"><Icon className="w-4 h-4" /></div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
        <div className="font-semibold mt-0.5">{value}</div>
      </div>
    </div>
  );
}