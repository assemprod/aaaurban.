import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { siteUrl } from "@/lib/site-url";
import { siteSettings } from "./site-settings";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "AAA URBAN — управление недвижимостью", template: "%s | AAA URBAN" },
  description: "Комплексное управление и эксплуатация жилой и коммерческой недвижимости в Астане. Инженерия, безопасность, территория и сервис в единой системе.",
  alternates: { canonical: "/", languages: { "ru-KZ": "/", "kk-KZ": "/kz" } },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    alternateLocale: ["kk_KZ"],
    title: "AAA URBAN — весь объект под нашим контролем",
    description: "Комплексное управление и эксплуатация недвижимости в Астане.",
    siteName: "AAA URBAN",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#111314" };

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AAA URBAN",
  description: "Управление и эксплуатация жилой и коммерческой недвижимости",
  url: siteUrl,
  telephone: siteSettings.phone,
  email: siteSettings.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteSettings.city.ru,
    streetAddress: siteSettings.street.ru,
    addressCountry: "KZ",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = (await headers()).get("x-urban-language") === "kk" ? "kk" : "ru";
  const structured = {
    ...organization,
    description: language === "kk" ? "Жылжымайтын мүлікті басқару және пайдалану" : organization.description,
    address: {
      ...organization.address,
      addressLocality: language === "kk" ? siteSettings.city.kz : siteSettings.city.ru,
      streetAddress: language === "kk" ? siteSettings.street.kz : siteSettings.street.ru,
    },
  };
  return (
    <html lang={language}>
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
