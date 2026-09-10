import { ContactForm } from "@/components/sections/ContactForm";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/ar.json";
import en from "@/i18n/en.json";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = locale === "ar" ? ar : en;

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <h1 className="text-3xl font-semibold">{t.contact.title}</h1>
      <ContactForm locale={locale} />
    </div>
  );
}
