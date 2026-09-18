import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
} from "lucide-react";
import { siteUrl } from "@/lib/site-url";
import { siteSettings, whatsappUrl } from "./site-settings";
import ServiceMotion from "./service-motion";
import {
  localizedText,
  servicePageKeys,
  servicePages,
  servicePath,
  type ServiceLang,
  type ServicePageKey,
} from "./service-pages";

export function buildServiceMetadata(key: ServicePageKey, lang: ServiceLang): Metadata {
  const page = servicePages[key];
  const canonical = servicePath(key, lang);
  const ruPath = servicePath(key, "ru");
  const kzPath = servicePath(key, "kz");
  const title = localizedText(page.metaTitle, lang);
  const description = localizedText(page.metaDescription, lang);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "ru-KZ": ruPath,
        "kk-KZ": kzPath,
        "x-default": ruPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: "AAA URBAN",
      locale: lang === "kz" ? "kk_KZ" : "ru_KZ",
      alternateLocale: [lang === "kz" ? "ru_KZ" : "kk_KZ"],
      title: `${title} | AAA URBAN`,
      description,
      url: canonical,
    },
    robots: { index: true, follow: true },
  };
}

function serviceStructuredData(key: ServicePageKey, lang: ServiceLang) {
  const page = servicePages[key];
  const path = servicePath(key, lang);
  const pageUrl = `${siteUrl}${path}`;
  const homeUrl = `${siteUrl}${lang === "kz" ? "/kz" : "/"}`;
  const title = localizedText(page.title, lang);
  const description = localizedText(page.metaDescription, lang);
  const homeName = lang === "kz" ? "Басты бет" : "Главная";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: lang === "kz" ? "kk-KZ" : "ru-KZ",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: title,
        description,
        url: pageUrl,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed: { "@type": "City", name: "Астана" },
        serviceType: title,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeName, item: homeUrl },
          { "@type": "ListItem", position: 2, name: title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: localizedText(item.question, lang),
          acceptedAnswer: {
            "@type": "Answer",
            text: localizedText(item.answer, lang),
          },
        })),
      },
    ],
  };
}

function Brand({ lang }: { lang: ServiceLang }) {
  return (
    <a className="brand" href={lang === "kz" ? "/kz" : "/"} aria-label="AAA URBAN">
      <img src="/brand-logo.jpeg" alt="" width="48" height="62" />
      <span className="wordmark">AAA<span>URBAN</span></span>
    </a>
  );
}

const titleAccents: Record<ServicePageKey, { ru: [string, string]; kz: [string, string] }> = {
  "property-management": {
    ru: ["Управление", "недвижимостью"],
    kz: ["Жылжымайтын мүлікті", "басқару"],
  },
  "building-operation": {
    ru: ["Эксплуатация", "зданий"],
    kz: ["Ғимараттарды", "пайдалану"],
  },
  "engineering-systems": {
    ru: ["Инженерные", "системы"],
    kz: ["Инженерлік", "жүйелер"],
  },
  "osi-management": {
    ru: ["Управление", "для ОСИ"],
    kz: ["МИБ үшін", "басқару"],
  },
  "residential-complex": {
    ru: ["Управление", "жилым комплексом"],
    kz: ["Тұрғын үй кешенін", "басқару"],
  },
  "business-center": {
    ru: ["Управление", "бизнес-центром"],
    kz: ["Бизнес-орталықты", "басқару"],
  },
  "commercial-property": {
    ru: ["Коммерческая", "недвижимость"],
    kz: ["Коммерциялық", "жылжымайтын мүлік"],
  },
  "residential-audit": {
    ru: ["Аудит", "жилого комплекса"],
    kz: ["Тұрғын үй кешенінің", "аудиті"],
  },
};

function AccentTitle({ pageKey, lang }: { pageKey: ServicePageKey; lang: ServiceLang }) {
  const [lead, accent] = titleAccents[pageKey][lang];
  return <>{lead}<br /><em>{accent}<span>.</span></em></>;
}

export default function ServicePage({ pageKey, lang }: { pageKey: ServicePageKey; lang: ServiceLang }) {
  const page = servicePages[pageKey];
  const t = <T extends { ru: string; kz: string }>(value: T) => localizedText(value, lang);
  const home = lang === "kz" ? "/kz" : "/";
  const ruPath = servicePath(pageKey, "ru");
  const kzPath = servicePath(pageKey, "kz");
  const wa = whatsappUrl(t(page.whatsappMessage));
  const pageIndex = servicePageKeys.indexOf(pageKey);
  const related = [...servicePageKeys.slice(pageIndex + 1), ...servicePageKeys.slice(0, pageIndex)]
    .filter((key) => key !== pageKey)
    .slice(0, 4);
  const jsonLd = serviceStructuredData(pageKey, lang);
  const variantClass = `service-variant-${pageKey}`;

  return (
    <ServiceMotion>
      <main className={`service-page-shell ${variantClass}`}>
        <a className="skip-link" href="#service-content">{lang === "kz" ? "Мазмұнға өту" : "Перейти к содержанию"}</a>

        <header className="site-header service-site-header">
          <Brand lang={lang} />
          <nav aria-label={lang === "kz" ? "Қызмет бетінің навигациясы" : "Навигация страницы услуги"}>
            <a href="#service-content">{lang === "kz" ? "Қызмет" : "Услуга"}</a>
            <a href="#service-process">{lang === "kz" ? "Үдеріс" : "Процесс"}</a>
            <a href="#service-faq">FAQ</a>
            <a href="#service-contact">{lang === "kz" ? "Байланыс" : "Контакты"}</a>
          </nav>
          <div className="header-actions">
            <div className="languages">
              <a href={ruPath} lang="ru" aria-current={lang === "ru" ? "page" : undefined}>RU</a><span>/</span>
              <a href={kzPath} lang="kk" aria-current={lang === "kz" ? "page" : undefined}>KZ</a>
            </div>
            <a className="header-cta" href={wa} target="_blank" rel="noopener noreferrer">
              {lang === "kz" ? "Нысанды талқылау" : "Обсудить объект"}<ArrowUpRight size={16} />
            </a>
          </div>
        </header>

        <section className="service-landing-hero" data-service-reveal>
          <img className="service-landing-photo" src={page.image} alt={t(page.imageAlt)} width="1536" height="1024" fetchPriority="high" />
          <div className="service-landing-shade" />
          <div className="service-hero-geometry" aria-hidden="true"><i /><i /><i /></div>
          <div className="service-landing-content">
            <a className="service-back" href={home}><ArrowLeft size={17} />{lang === "kz" ? "Артқа" : "Назад"}</a>
            <p className="eyebrow"><span className="section-number">AAA /</span>{t(page.eyebrow)}</p>
            <h1><span className="sr-only">{t(page.title)}</span><span aria-hidden="true"><AccentTitle pageKey={pageKey} lang={lang} /></span></h1>
            <p className="service-landing-lead">{t(page.lead)}</p>
            <div className="hero-buttons">
              <a className="button primary" href={wa} target="_blank" rel="noopener noreferrer">
                {lang === "kz" ? "WhatsApp-та талқылау" : "Обсудить в WhatsApp"}<ArrowUpRight size={19} />
              </a>
              <a className="text-button" href="#service-content">
                {lang === "kz" ? "Қызмет құрамы" : "Что входит"}<ArrowRight size={19} />
              </a>
            </div>
          </div>
          <div className="service-hero-index" aria-hidden="true">
            <span>{String(pageIndex + 1).padStart(2, "0")}</span><i /><span>08 · AAA URBAN</span>
          </div>
        </section>

        <section className="service-audience" aria-labelledby="audience-title" data-service-reveal>
          <div>
            <p className="eyebrow"><span className="section-number">01 /</span>{lang === "kz" ? "Контекст" : "Контекст"}</p>
            <h2 id="audience-title">{t(page.audienceTitle)}</h2>
          </div>
          <ul>
            {page.audience.map((item, index) => <li key={index} data-service-reveal><span>0{index + 1}</span><Check size={17} />{t(item)}</li>)}
          </ul>
        </section>

        <section className="service-content-section" id="service-content" data-service-reveal>
          <div className="service-section-heading">
            <p className="eyebrow"><span className="section-number">02 /</span>{lang === "kz" ? "Қызмет құрамы" : "Состав услуги"}</p>
            <h2>{t(page.scopeTitle)}</h2>
            <p>{t(page.scopeIntro)}</p>
          </div>
          <div className="service-detail-grid">
            {page.scope.map((item, index) => (
              <article key={index} data-service-reveal>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="service-process-section" id="service-process" data-service-reveal>
          <div className="service-process-copy">
            <p className="eyebrow"><span className="section-number">03 /</span>{lang === "kz" ? "Жұмыс логикасы" : "Логика работы"}</p>
            <h2>{t(page.processTitle)}</h2>
            <p>{t(page.processIntro)}</p>
          </div>
          <ol className="service-process-list">
            {page.process.map((item, index) => (
              <li key={index} data-service-reveal>
                <span className="process-number">{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{t(item.title)}</h3><p>{t(item.text)}</p></div>
                <ArrowRight size={18} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>

        <section className="service-faq-section" id="service-faq" data-service-reveal>
          <div className="service-section-heading compact">
            <p className="eyebrow"><span className="section-number">04 /</span>FAQ</p>
            <h2>{t(page.faqTitle)}</h2>
          </div>
          <div className="faq-list service-faq-list">
            {page.faq.map((item, index) => (
              <details className="faq-item" key={index} data-service-reveal>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{t(item.question)}<Plus size={18} /></summary>
                <p>{t(item.answer)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="service-related-section" data-service-reveal>
          <div className="service-section-heading compact">
            <p className="eyebrow"><span className="section-number">05 /</span>{lang === "kz" ? "Байланысты бағыттар" : "Связанные направления"}</p>
            <h2>{lang === "kz" ? "Нысанның басқа міндеттері" : "Другие задачи объекта"}</h2>
          </div>
          <div className="service-related-grid">
            {related.map((key, index) => {
              const relatedPage = servicePages[key];
              return (
                <a href={servicePath(key, lang)} key={key} data-service-reveal>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{t(relatedPage.title)}</h3>
                  <p>{t(relatedPage.lead)}</p>
                  <ArrowUpRight size={20} />
                </a>
              );
            })}
          </div>
        </section>

        <section className="service-contact-section" id="service-contact" data-service-reveal>
          <div>
            <p className="eyebrow"><span className="section-number">06 /</span>{lang === "kz" ? "Келесі қадам" : "Следующий шаг"}</p>
            <h2>{t(page.ctaTitle)}</h2>
            <p>{t(page.ctaText)}</p>
            <a className="button service-contact-button" href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />{lang === "kz" ? "WhatsApp-та жазу" : "Написать в WhatsApp"}<ArrowUpRight size={18} />
            </a>
          </div>
          <address>
            <a href={`tel:${siteSettings.phone}`}><Phone size={18} /><span>{siteSettings.phoneDisplay}</span></a>
            <a href={`mailto:${siteSettings.email}`}><Mail size={18} /><span>{siteSettings.email}</span></a>
            <span><MapPin size={18} /><span>{siteSettings.address[lang]}</span></span>
          </address>
        </section>

        <footer className="service-footer">
          <Brand lang={lang} />
          <p>© AAA URBAN · {lang === "kz" ? "Жылжымайтын мүлікті басқару және пайдалану" : "Управление и эксплуатация недвижимости"}</p>
          <a href={home}><ArrowLeft size={16} />{lang === "kz" ? "Басты бетке" : "На главную"}</a>
        </footer>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
    </ServiceMotion>
  );
}
