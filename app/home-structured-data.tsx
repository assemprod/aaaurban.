import { siteUrl } from "@/lib/site-url";
import { seoFaq } from "./seo-content";

export default function HomeStructuredData({ lang }: { lang: "ru" | "kz" }) {
  const kz = lang === "kz";
  const pageUrl = `${siteUrl}${kz ? "/kz" : "/"}`;
  const languageKey = kz ? "kz" : "ru";
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: kz
          ? "Астанада жылжымайтын мүлікті басқару және пайдалану"
          : "Управление и эксплуатация недвижимости в Астане",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        inLanguage: kz ? "kk-KZ" : "ru-KZ",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: seoFaq.map((item) => ({
          "@type": "Question",
          name: item.question[languageKey],
          acceptedAnswer: { "@type": "Answer", text: item.answer[languageKey] },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />;
}
