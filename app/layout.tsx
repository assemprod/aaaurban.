import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { siteUrl } from "@/lib/site-url";
import { siteSettings } from "./site-settings";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Управление и эксплуатация недвижимости в Астане | AAA URBAN",
    template: "%s | AAA URBAN",
  },
  description:
    "AAA URBAN — комплексное управление и эксплуатация жилой и коммерческой недвижимости в Астане: инженерные системы, подрядчики, безопасность, территория и сервис.",
  alternates: {
    canonical: "/",
    languages: { "ru-KZ": "/", "kk-KZ": "/kz", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "ru_KZ",
    alternateLocale: ["kk_KZ"],
    title: "Управление и эксплуатация недвижимости в Астане | AAA URBAN",
    description: "Комплексное управление и эксплуатация жилой и коммерческой недвижимости в Астане.",
    siteName: "AAA URBAN",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111314" };

function getSiteStructuredData(language: "ru" | "kk") {
  const kz = language === "kk";
  const languageKey = kz ? "kz" : "ru";
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "AAA URBAN",
        url: siteUrl,
        logo: `${siteUrl}/brand-logo.jpeg`,
        description: kz
          ? "Астанадағы тұрғын үй және коммерциялық жылжымайтын мүлікті басқару және пайдалану"
          : "Управление и эксплуатация жилой и коммерческой недвижимости в Астане",
        telephone: siteSettings.phone,
        email: siteSettings.email,
        areaServed: { "@type": "City", name: siteSettings.city[languageKey] },
        address: {
          "@type": "PostalAddress",
          addressLocality: siteSettings.city[languageKey],
          streetAddress: siteSettings.street[languageKey],
          addressCountry: "KZ",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteSettings.phone,
          contactType: kz ? "сату бөлімі" : "отдел продаж",
          availableLanguage: ["ru", "kk"],
        },
        knowsAbout: kz
          ? ["Жылжымайтын мүлікті басқару", "Ғимараттарды пайдалану", "Инженерлік жүйелер", "МИБ-пен жұмыс"]
          : ["Управление недвижимостью", "Эксплуатация зданий", "Инженерные системы", "Работа с ОСИ"],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: "AAA URBAN",
        publisher: { "@id": organizationId },
        inLanguage: ["ru-KZ", "kk-KZ"],
      },
    ],
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const language = (await headers()).get("x-urban-language") === "kk" ? "kk" : "ru";
  const structured = getSiteStructuredData(language);

  return (
    <html lang={language}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
