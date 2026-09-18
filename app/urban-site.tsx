"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowDownRight, Menu, X, Check, Plus, Wind, Zap, Droplets, Flame, ShieldCheck, Cctv, KeyRound, Radio, Building2, Users, Settings2, Leaf, Phone, Mail, MapPin, MessageCircle, ClipboardList } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { systems, objectTypes, seasons, advantages, type Lang } from "./content";
import { seoFaq } from "./seo-content";
import { teamMembers, caseStudies } from "./portfolio";
import { siteSettings, whatsappUrl } from "./site-settings";
import { track } from "./analytics";
import { servicePath, type ServicePageKey } from "./service-pages";

const systemIcons = [Zap, Wind, Wind, Flame, Droplets, Settings2, ShieldCheck, Cctv, KeyRound, Radio];
const media = ["/media/engineering.webp", "/media/management.webp", "/media/security.webp", "/architecture.webp"];
const objectMedia: Record<string, string> = {
  residential: "/architecture.webp", business: "/media/business.webp", hotel: "/media/hotel.webp",
  retail: "/media/retail.webp", residence: "/media/residence.webp", warehouse: "/media/warehouse.webp",
};

function Brand({ lang }: { lang: Lang }) {
  return <a className="brand" href={lang === "kz" ? "/kz" : "/"} aria-label="AAA URBAN">
    <img src="/brand-logo.jpeg" alt="" width="58" height="70" />
    <span className="wordmark">AAA<span>URBAN</span></span>
  </a>;
}

function Heading({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h2 className={"reveal-title " + className} data-reveal>{children}</h2>;
}

function Eyebrow({ number, children }: { number?: string; children: ReactNode }) {
  return <p className="eyebrow">{number && <span className="section-number">{number} /</span>}{children}</p>;
}

export default function UrbanSite({ lang = "ru" }: { lang?: Lang }) {
  const kz = lang === "kz";
  const t = (ru: string, kk: string) => kz ? kk : ru;
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState("0");
  const [season, setSeason] = useState("summer");
  const [kind, setKind] = useState("residential");
  const [managed, setManaged] = useState(false);
  const [caseFilter, setCaseFilter] = useState("all");
  const [objectType, setObjectType] = useState("residential");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [preparedUrl, setPreparedUrl] = useState("");
  const publishedCases = caseStudies.filter(item => item.published);
  const people = teamMembers.filter(person => person.published && person.photo);
  const hasResidential = publishedCases.some(item => item.category === "residential");
  const nav = [
    ["advantages", t("Преимущества", "Артықшылықтар")],
    ["objects", t("Объекты", "Нысандар")],
    ["osi", t("Для ОСИ", "МИБ үшін")],
    ["team", t("Команда", "Команда")],
    ["contact", t("Контакты", "Байланыс")],
  ];
  const serviceLinks: { key: ServicePageKey; label: string }[] = [
    { key: "property-management", label: t("Управление недвижимостью", "Жылжымайтын мүлікті басқару") },
    { key: "building-operation", label: t("Эксплуатация зданий", "Ғимараттарды пайдалану") },
    { key: "engineering-systems", label: t("Инженерные системы", "Инженерлік жүйелер") },
    { key: "osi-management", label: t("Управление для ОСИ", "МИБ үшін басқару") },
    { key: "residential-complex", label: t("Управление ЖК", "Тұрғын үй кешенін басқару") },
    { key: "business-center", label: t("Управление бизнес-центром", "Бизнес-орталықты басқару") },
    { key: "commercial-property", label: t("Коммерческая недвижимость", "Коммерциялық жылжымайтын мүлік") },
    { key: "residential-audit", label: t("Бесплатный аудит ЖК", "Тұрғын үй кешенінің тегін аудиті") },
  ];
  const stageLabels = [t("Инженерия", "Инженерия"), t("Управление", "Басқару"), t("Безопасность", "Қауіпсіздік"), t("Территория", "Аумақ")];
  const waMessage = t("Здравствуйте! Хочу обсудить управление объектом с AAA URBAN.", "Сәлеметсіз бе! AAA URBAN компаниясымен нысанды басқаруды талқылағым келеді.");
  const auditMessage = t("Здравствуйте! Хочу заказать бесплатный аудит ЖК. Название и адрес объекта: ", "Сәлеметсіз бе! Тұрғын үй кешеніне тегін аудитке өтінім бергім келеді. Нысанның атауы мен мекенжайы: ");
  const privacyPath = kz ? "/kz/privacy" : "/privacy";
  const stageServiceLinks = [
    servicePath("engineering-systems", lang),
    servicePath("property-management", lang),
    servicePath("building-operation", lang),
    servicePath("building-operation", lang),
  ];
  const objectServiceLinks: Record<string, string> = {
    residential: servicePath("residential-complex", lang),
    business: servicePath("business-center", lang),
    hotel: servicePath("commercial-property", lang),
    retail: servicePath("commercial-property", lang),
    residence: servicePath("property-management", lang),
    warehouse: servicePath("commercial-property", lang),
  };

  useEffect(() => {
    document.documentElement.lang = kz ? "kk" : "ru";
    const seen = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.hasAttribute("data-reveal")) entry.target.classList.add("is-visible");
        if (entry.target.id && !seen.has(entry.target.id)) {
          seen.add(entry.target.id);
          track("section_view", { section: entry.target.id, language: lang });
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal], section[id]").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [kz, lang]);

  function cta(source: string) { track("cta_click", { source, language: lang }); }
  function whatsappClick(source: string) { cta(source); track("whatsapp_click", { source, language: lang }); }
  function proposal(source: string, type?: string) {
    cta(source); setPreparedUrl(""); if (type) setObjectType(type);
  }

  function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") || "").trim();
    const phone = String(values.get("phone") || "").trim();
    if (name.length < 2) {
      setError(t("Укажите имя: минимум 2 символа.", "Атыңызды жазыңыз: кемінде 2 таңба.")); return;
    }
    if (!/^[+\d\s()\-]+$/.test(phone) || phone.replace(/\D/g, "").length < 10 || phone.replace(/\D/g, "").length > 15) {
      setError(t("Проверьте номер телефона: от 10 до 15 цифр.", "Телефон нөмірін тексеріңіз: 10–15 сан.")); return;
    }
    if (!consent) { setError(t("Подтвердите согласие на обработку обращения.", "Өтінішті өңдеуге келісіміңізді растаңыз.")); return; }
    if (String(values.get("website") || "")) return;
    const type = objectTypes.find(item => item.id === objectType) || objectTypes[0];
    const area = String(values.get("area") || "").trim();
    const comment = String(values.get("comment") || "").trim();
    const message = [
      waMessage, t("Имя: ", "Аты: ") + name, t("Телефон: ", "Телефон: ") + phone,
      t("Тип объекта: ", "Нысан түрі: ") + (kz ? type.kz : type.ru),
      area ? t("Площадь, м²: ", "Ауданы, м²: ") + area : "",
      comment ? t("Задача: ", "Міндет: ") + comment : "",
    ].filter(Boolean).join("\n");
    setPreparedUrl(whatsappUrl(message));
    track("inquiry_prepared", { object_type: objectType, language: lang });
  }

  return <MotionConfig reducedMotion="user"><main className="urban-site">
    <a className="skip-link" href="#inside">{t("Перейти к содержанию", "Мазмұнға өту")}</a>
    <header className="site-header">
      <Brand lang={lang} />
      <nav className="desktop-nav" aria-label={t("Главная навигация", "Негізгі навигация")}>
        <div className="services-menu">
          <button className="services-menu-trigger" type="button" aria-haspopup="true">
            {t("Услуги", "Қызметтер")}<ArrowDown size={14} aria-hidden="true" />
          </button>
          <div className="services-dropdown" aria-label={t("Страницы услуг", "Қызмет беттері")}>
            {serviceLinks.map((item) => (
              <a key={item.key} href={servicePath(item.key, lang)}>
                <span>{item.label}</span><ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        {nav.map(([id, label]) => <a key={id} href={"#" + id}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <div className="languages">
          <a href="/" lang="ru" aria-current={!kz ? "page" : undefined}>RU</a><span>/</span>
          <a href="/kz" lang="kk" aria-current={kz ? "page" : undefined}>KZ</a>
        </div>
        <a className="header-cta" href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" onClick={() => whatsappClick("header")}>{t("Обсудить объект", "Нысанды талқылау")}<ArrowUpRight size={16} /></a>
        <Sheet>
          <SheetTrigger className="menu-button" aria-label={t("Открыть меню", "Мәзірді ашу")}><Menu /></SheetTrigger>
          <SheetContent className="mobile-sheet" showCloseButton={false}>
            <div className="sheet-heading"><SheetTitle>AAA URBAN</SheetTitle><SheetClose aria-label={t("Закрыть меню", "Мәзірді жабу")}><X /></SheetClose></div>
            <SheetDescription className="sr-only">{t("Навигация по сайту", "Сайт бойынша навигация")}</SheetDescription>
            <nav>
              <details className="mobile-services-submenu">
                <summary>{t("Услуги", "Қызметтер")}<ArrowDown size={18} aria-hidden="true" /></summary>
                <div className="mobile-services-list">
                  {serviceLinks.map((item) => <SheetClose asChild key={item.key}><a href={servicePath(item.key, lang)}>{item.label}<ArrowUpRight size={18} /></a></SheetClose>)}
                </div>
              </details>
              <div className="mobile-primary-nav">
                {nav.map(([id, label]) => <SheetClose asChild key={id}><a href={"#" + id}>{label}<ArrowUpRight size={20} /></a></SheetClose>)}
              </div>
            </nav>
            <SheetClose asChild><a className="button primary" href="#audit">{t("Бесплатный аудит ЖК", "Тұрғын үй кешенінің тегін аудиті")}<ArrowUpRight size={18} /></a></SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>

    <section className="hero" id="home">
      <img className="hero-photo" src="/architecture.webp" alt={t("Архитектурная концепция современного жилого комплекса вечером", "Кешкі уақыттағы заманауи тұрғын үй кешенінің сәулеттік тұжырымдамасы")} width="1536" height="1024" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <Eyebrow>{t("AAA URBAN · УПРАВЛЕНИЕ И ЭКСПЛУАТАЦИЯ НЕДВИЖИМОСТИ", "AAA URBAN · ЖЫЛЖЫМАЙТЫН МҮЛІКТІ БАСҚАРУ ЖӘНЕ ПАЙДАЛАНУ")}</Eyebrow>
        <h1 className={kz ? "hero-title kazakh-title" : "hero-title"}>
          <span>{t("ВЕСЬ ОБЪЕКТ —", "БҮКІЛ НЫСАН —")}</span>
          <span>{t("ПОД НАШИМ", "БІЗДІҢ")}</span>
          <span className="hero-emphasis">{t("КОНТРОЛЕМ.", "БАҚЫЛАУЫМЫЗДА.")}</span>
        </h1>
        <p className="hero-description">{t("Управляем инженерными системами, заявками, подрядчиками и бюджетом. Один оператор — комплексная эксплуатация объекта.", "Инженерлік жүйелерді, өтінімдерді, мердігерлерді және бюджетті басқарамыз. Бір оператор — нысанды кешенді пайдалану.")}</p>
        <div className="hero-buttons">
          <a className="button primary" href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" onClick={() => whatsappClick("hero")}>{t("Обсудить объект в WhatsApp", "WhatsApp-та талқылау")}<ArrowUpRight size={19} /></a>
          <a className="text-button" href="#contact" onClick={() => proposal("hero_form")}>{t("Получить предложение", "Ұсыныс алу")}<ArrowRight size={19} /></a>
        </div>
        <p className="hero-sectors">{t("Жилые комплексы · Бизнес-центры · Отели · Коммерческие объекты", "Тұрғын үй кешендері · Бизнес-орталықтар · Қонақүйлер · Коммерциялық нысандар")}</p>
      </div>
      <div className="hero-side-note" aria-hidden="true"><span>AAA / URBAN</span><i /><span>{t("АРХИТЕКТУРА КОМФОРТА", "ЖАЙЛЫЛЫҚ СӘУЛЕТІ")}</span></div>
      <a className="hero-scroll" href="#responsibility"><ArrowDown size={18} />{t("Посмотрите, что входит в управление", "Басқару құрамымен танысыңыз")}</a>
    </section>

    <section className="section responsibility" id="responsibility">
      <div className="responsibility-heading">
        <Eyebrow number="01">{t("ЕДИНАЯ СИСТЕМА", "БІРТҰТАС ЖҮЙЕ")}</Eyebrow>
        <Heading><span>{t("Один объект.", "Бір нысан.")}</span><span>{t("Одна система.", "Бір жүйе.")}</span><em>{t("Одна ответственность.", "Бір жауапкершілік.")}</em></Heading>
        <p>{t("Здание — это люди, оборудование и сотни ежедневных задач. Мы связываем их в единую систему: от обращения собственника до работы инженерных коммуникаций.", "Ғимарат — адамдар, жабдық және жүздеген күнделікті міндет. Біз оларды меншік иесінің өтінішінен инженерлік желілердің жұмысына дейін бір жүйеге біріктіреміз.")}</p>
      </div>
      <div className="operator-panel" data-reveal>
        <div className="operator-top"><span>{t("ВАШ УПРАВЛЯЮЩИЙ ОПЕРАТОР", "СІЗДІҢ БАСҚАРУШЫ ОПЕРАТОРЫҢЫЗ")}</span><div className="orbit" aria-hidden="true"><i /><b>360°</b></div></div>
        <strong className="operator-wordmark">AAA URBAN<span>.</span></strong>
        <div className="operator-lines">
          {[
            [ClipboardList, t("Управление", "Басқару"), t("Заявки, подрядчики, бюджет", "Өтінімдер, мердігерлер, бюджет")],
            [Settings2, t("Эксплуатация", "Пайдалану"), t("Системы, контроль, ремонты", "Жүйелер, бақылау, жөндеу")],
            [Leaf, t("Обслуживание", "Қызмет көрсету"), t("Чистота, территория, сезоны", "Тазалық, аумақ, маусымдар")],
          ].map(([Icon, title, desc], i) => { const Symbol = Icon as typeof Leaf; return <div key={i}><Symbol size={22} /><span><strong>{title as string}</strong><small>{desc as string}</small></span><ArrowDownRight size={18} /></div>; })}
        </div>
      </div>
    </section>

    <section className="section inside" id="inside">
      <div className="section-head">
        <div><Eyebrow number="02">{t("ВНУТРИ ОБЪЕКТА", "НЫСАННЫҢ ІШІНДЕ")}</Eyebrow><Heading>{t("Снаружи — архитектура.", "Сыртында — сәулет.")}<br /><em>{t("Внутри — целая жизнь.", "Ішінде — тұтас өмір.")}</em></Heading></div>
        <p>{t("Четыре направления. У каждого своя задача, у всех — один объект.", "Төрт бағыт. Әрқайсысының міндеті бөлек, ал нысан — ортақ.")}</p>
      </div>
      <Tabs value={stage} onValueChange={value => { setStage(value); track("service_select", { service: value, language: lang }); }} className="service-tabs">
        <TabsList className="tab-rail" aria-label={t("Направления работы", "Жұмыс бағыттары")}>
          {stageLabels.map((label, i) => <TabsTrigger value={String(i)} key={label}><span>0{i + 1}</span>{label}<ArrowUpRight size={16} /></TabsTrigger>)}
        </TabsList>
        {stageLabels.map((label, index) => <TabsContent key={index} value={String(index)} forceMount hidden={stage !== String(index)} className="service-panel">
          <div className="service-copy">
            <span className="chapter-label">{label}</span>
            {index === 0 && <>
              <h3>{t("Комфорт начинается", "Жайлылық жарамды")}<br /><em>{t("с исправных систем.", "жүйелерден басталады.")}</em></h3>
              <p>{t("Регулярное обслуживание и технический контроль оборудования внутри здания.", "Ғимарат ішіндегі жабдыққа тұрақты қызмет көрсету және техникалық бақылау.")}</p>
              <div className="system-details">
                {systems.slice(0, 6).map((item, i) => { const Icon = systemIcons[i]; return <details key={item.id}><summary><Icon size={17} /><span>{kz ? item.kz : item.ru}</span><Plus size={16} /></summary><p>{kz ? item.textKz : item.textRu}</p></details>; })}
              </div>
            </>}
            {index === 1 && <>
              <h3>{t("Каждой задаче —", "Әр міндетке —")}<br /><em>{t("своё решение.", "өз шешімі.")}</em></h3>
              <p>{t("От первого обращения до отчёта собственнику. Координируем людей, работы и документы.", "Алғашқы өтініштен меншік иесіне берілетін есепке дейін. Адамдарды, жұмыстарды және құжаттарды үйлестіреміз.")}</p>
              <ol className="process-list">{[
                t("Заявки и взаимодействие с ОСИ", "Өтінімдер және МИБ-пен өзара жұмыс"),
                t("Контроль подрядчиков", "Мердігерлерді бақылау"),
                t("Бюджет и отчётность", "Бюджет және есептілік"),
                t("Документация и планирование ремонтов", "Құжаттама және жөндеуді жоспарлау"),
              ].map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ol>
            </>}
            {index === 2 && <>
              <h3>{t("Внимание к тому,", "Көзге көріне бермейтін")}<br /><em>{t("что защищает.", "қорғанысқа назар.")}</em></h3>
              <p>{t("Системам безопасности нужны обслуживание, технический контроль и готовность к нештатным ситуациям.", "Қауіпсіздік жүйелері қызмет көрсетуді, техникалық бақылауды және төтенше жағдайларға дайындықты қажет етеді.")}</p>
              <div className="system-details">{systems.slice(6).map((item, i) => { const Icon = systemIcons[i + 6]; return <details key={item.id}><summary><Icon size={17} /><span>{kz ? item.kz : item.ru}</span><Plus size={16} /></summary><p>{kz ? item.textKz : item.textRu}</p></details>; })}</div>
              <p className="service-footnote">{t("Технический контроль и аварийная служба.", "Техникалық бақылау және апаттық қызмет.")}</p>
            </>}
            {index === 3 && <>
              <h3>{t("Порядок продолжается", "Тәртіп ғимарат")}<br /><em>{t("за пределами здания.", "сыртында да жалғасады.")}</em></h3>
              <p>{t("Чистота, озеленение и освещение. Территория требует внимания в каждом сезоне.", "Тазалық, көгалдандыру және жарықтандыру. Аумақ әр маусымда күтімді қажет етеді.")}</p>
              <Tabs value={season} onValueChange={setSeason} className="season-selector">
                <TabsList aria-label={t("Время года", "Жыл мезгілі")}>{seasons.map(item => <TabsTrigger value={item.id} key={item.id}>{kz ? item.kz : item.ru}</TabsTrigger>)}</TabsList>
                {seasons.map(item => <TabsContent forceMount hidden={season !== item.id} key={item.id} value={item.id}><Leaf size={23} /><p>{kz ? item.descKz : item.descRu}</p></TabsContent>)}
              </Tabs>
            </>}
            <div className="service-copy-actions">
              <a className="service-learn-link" href={stageServiceLinks[index]}>{t("Подробнее об услуге", "Қызмет туралы толығырақ")}<ArrowRight size={17} /></a>
              <a className="text-button dark-link" href="#contact" onClick={() => proposal("service_" + index)}>{t("Обсудить задачи объекта", "Нысан міндеттерін талқылау")}<ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className={"service-photo photo-" + index}>
            <motion.img key={stage === String(index) ? stage : "idle"} src={media[index]} alt={t("Иллюстрация направления: ", "Бағытты бейнелейтін сурет: ") + label} loading="lazy" width="1100" height="1000" initial={false} animate={{ scale: stage === String(index) && !reducedMotion ? 1.025 : 1 }} transition={{ duration: 1.4 }} />
            <div className="photo-callout"><span>0{index + 1}</span><strong>{[
              t("Инженерная основа комфорта", "Жайлылықтың инженерлік негізі"),
              t("Процессы связаны между собой", "Үдерістер өзара байланысты"),
              t("Контроль систем безопасности", "Қауіпсіздік жүйелерін бақылау"),
              t("Забота в каждом сезоне", "Әр маусымдағы қамқорлық"),
            ][index]}</strong><ArrowDownRight size={26} /></div>
            <span className="photo-caption">{label}<ArrowRight size={20} /></span>
          </div>
        </TabsContent>)}
      </Tabs>
    </section>

    <section className="section advantages" id="advantages">
      <div className="section-head"><div><Eyebrow number="03">{t("ДЛЯ СОБСТВЕННИКА", "МЕНШІК ИЕСІ ҮШІН")}</Eyebrow><Heading>{t("Управление,", "Түсінікті")}<br /><em>{t("которое понятно.", "басқару.")}</em></Heading></div><p>{t("За каждым вопросом собственника — конкретная задача управления.", "Меншік иесінің әр сұрағының артында нақты басқару міндеті тұр.")}</p></div>
      <div className="advantage-grid">{advantages.map((item, i) => <article key={item.ru} data-reveal>
        <div className="advantage-index"><span>0{i + 1}</span><ArrowDownRight size={22} /></div>
        <p className="advantage-question">{kz ? item.questionKz : item.questionRu}</p>
        <h3>{kz ? item.kz : item.ru}</h3><p>{kz ? item.descKz : item.descRu}</p>
      </article>)}</div>
    </section>

    <section className="section objects" id="objects">
      <div className="section-head"><div><Eyebrow number="04">{t("СФЕРЫ УПРАВЛЕНИЯ", "БАСҚАРУ САЛАЛАРЫ")}</Eyebrow><Heading>{t("Ваш объект.", "Сіздің нысаныңыз.")}<br /><em>{t("Наша ответственность.", "Біздің жауапкершілігіміз.")}</em></Heading></div><p>{t("От жилого дома до коммерческого здания. Учитываем назначение и особенности недвижимости.", "Тұрғын үйден коммерциялық ғимаратқа дейін. Жылжымайтын мүліктің мақсаты мен ерекшеліктерін ескереміз.")}</p></div>
      <Tabs value={kind} onValueChange={value => { setKind(value); track("object_select", { object_type: value }); }} className="object-tabs">
        <TabsList className="tab-rail" aria-label={t("Типы недвижимости", "Жылжымайтын мүлік түрлері")}>{objectTypes.map((item, i) => <TabsTrigger key={item.id} value={item.id}><span>0{i + 1}</span>{kz ? item.kz : item.ru}</TabsTrigger>)}</TabsList>
        {objectTypes.map((item, i) => <TabsContent key={item.id} value={item.id} forceMount hidden={kind !== item.id} className="object-panel">
          <div className="object-info"><span className="object-count">0{i + 1}<small>/ 06</small></span><h3>{kz ? item.kz : item.ru}</h3><p>{kz ? item.descKz : item.descRu}</p><ul>{(kz ? item.tagsKz : item.tagsRu).map(tag => <li key={tag}><Check size={17} />{tag}</li>)}</ul><div className="object-actions"><a className="service-learn-link" href={objectServiceLinks[item.id]}>{t("Подробнее", "Толығырақ")}<ArrowRight size={17} /></a><a className="text-button" href="#contact" onClick={() => proposal("object", item.id)}>{t("Обсудить такой объект", "Осындай нысанды талқылау")}<ArrowUpRight size={19} /></a></div></div>
          <figure className="object-visual"><img src={objectMedia[item.id]} alt={t("Иллюстрация типа недвижимости: ", "Жылжымайтын мүлік түрінің суреті: ") + (kz ? item.kz : item.ru)} width="1000" height="800" loading="lazy" /><figcaption><span>AAA URBAN / 0{i + 1}</span><span>{kz ? item.kz : item.ru}</span></figcaption></figure>
        </TabsContent>)}
      </Tabs>
    </section>

    <section className="commercial" id="commercial">
      <img src="/media/business.webp" alt={t("Архитектура современного бизнес-центра", "Заманауи бизнес-орталық сәулеті")} width="1200" height="900" loading="lazy" />
      <div className="commercial-copy">
        <Eyebrow number="05">{t("КОММЕРЧЕСКАЯ НЕДВИЖИМОСТЬ", "КОММЕРЦИЯЛЫҚ ЖЫЛЖЫМАЙТЫН МҮЛІК")}</Eyebrow>
        <Heading>{t("От инженерных систем —", "Инженерлік жүйелерден —")}<br /><em>{t("до бюджета объекта.", "нысан бюджетіне дейін.")}</em></Heading>
        <p>{t("Техническое обслуживание, подрядчики, документация и ремонты требуют постоянной координации. Объединяем эти задачи в рамках комплексной эксплуатации.", "Техникалық қызмет көрсету, мердігерлер, құжаттама және жөндеу тұрақты үйлестіруді қажет етеді. Бұл міндеттерді кешенді пайдалану аясында біріктіреміз.")}</p>
        <div className="commercial-processes">{[t("Инженерия", "Инженерия"), t("Подрядчики", "Мердігерлер"), t("Бюджет", "Бюджет"), t("Документация", "Құжаттама")].map((label, i) => <span key={label} data-reveal><small>0{i + 1}</small>{label}<ArrowUpRight size={17} /></span>)}</div>
        <div className="commercial-actions"><a className="service-learn-link light" href={servicePath("commercial-property", lang)}>{t("Подробнее об управлении коммерческой недвижимостью", "Коммерциялық жылжымайтын мүлікті басқару туралы")}<ArrowRight size={17} /></a><a className="button primary" href="#contact" onClick={() => proposal("commercial", "business")}>{t("Получить предложение", "Ұсыныс алу")}<ArrowUpRight size={18} /></a></div>
      </div>
    </section>

    <section className={"section osi " + (managed ? "is-managed" : "")} id="osi">
      <div className="osi-copy"><Eyebrow number="06">{t("ДЛЯ СОБСТВЕННИКОВ И ОСИ", "МЕНШІК ИЕЛЕРІ МЕН МИБ ҮШІН")}</Eyebrow><Heading>{t("Дом — для жизни.", "Үй — өмір сүру үшін.")}<br /><em>{t("Не для проблем.", "Мәселелер үшін емес.")}</em></Heading><p>{t("Обращения жителей, расходы, подрядчики и состояние дома. Берём ежедневные задачи в единую систему управления.", "Тұрғындардың өтініштері, шығындар, мердігерлер және үйдің жай-күйі. Күнделікті міндеттерді біртұтас басқару жүйесіне біріктіреміз.")}</p><div className="osi-actions"><a className="service-learn-link" href={servicePath("osi-management", lang)}>{t("Управление для ОСИ", "МИБ үшін басқару")}<ArrowRight size={17} /></a><a href="#contact" className="button primary" onClick={() => proposal("osi", "residential")}>{t("Предложение для вашего ЖК", "Тұрғын үй кешеніне ұсыныс")}<ArrowUpRight size={18} /></a></div></div>
      <div className="osi-life"><div className="osi-photo" /><div className="osi-photo-shade" /><div className="osi-state">
        <span>{managed ? t("СИСТЕМНЫЙ ПОДХОД", "ЖҮЙЕЛІ ТӘСІЛ") : t("ЗНАКОМАЯ СИТУАЦИЯ?", "ТАНЫС ЖАҒДАЙ МА?")}</span>
        <div className="problems">{[
          [t("Непонятные расходы", "Түсініксіз шығындар"), t("Бюджет и отчётность", "Бюджет және есептілік")],
          [t("Обращения без ответа", "Жауапсыз өтініштер"), t("Работа с заявками", "Өтінімдермен жұмыс")],
          [t("Разрозненные исполнители", "Бытыраңқы орындаушылар"), t("Контроль подрядчиков", "Мердігерлерді бақылау")],
          [t("Ремонт только после поломки", "Тек ақаудан кейінгі жөндеу"), t("Плановое обслуживание", "Жоспарлы қызмет көрсету")],
        ].map(([problem, solution], i) => <span key={i}>{managed ? <Check size={16} /> : <Plus size={16} />}{managed ? solution : problem}</span>)}</div>
        <button className="osi-toggle" onClick={() => setManaged(value => !value)} aria-pressed={managed}>{managed ? t("Вернуться к задачам", "Міндеттерге оралу") : t("Посмотреть подход", "Тәсілмен танысу")}<ArrowRight size={19} /></button>
      </div></div>
    </section>

    <section className="section audit" id="audit">
      <div className="audit-marker" aria-hidden="true"><ClipboardList size={34} /><span>AAA<br />URBAN</span><ArrowDownRight size={42} /></div>
      <div className="audit-copy"><Eyebrow>{t("БЕСПЛАТНЫЙ АУДИТ ЖИЛОГО КОМПЛЕКСА", "ТҰРҒЫН ҮЙ КЕШЕНІНІҢ ТЕГІН АУДИТІ")}</Eyebrow><Heading>{t("Что в вашем ЖК", "Тұрғын үй кешеніңізде")}<br /><em>{t("требует внимания?", "неге назар аудару керек?")}</em></Heading><p>{t("Проверим состояние жилого комплекса: что работает исправно, а какие вопросы требуют решения.", "Тұрғын үй кешенінің жай-күйін тексереміз: не дұрыс жұмыс істейді, қандай мәселелерді шешу қажет.")}</p><div className="audit-actions"><a className="service-learn-link audit-link" href={servicePath("residential-audit", lang)}>{t("Что входит в первичный аудит", "Бастапқы аудит нені қамтиды")}<ArrowRight size={17} /></a><a className="button audit-button" href={whatsappUrl(auditMessage)} target="_blank" rel="noopener noreferrer" onClick={() => whatsappClick("free_audit")}>{t("Заказать бесплатный аудит", "Тегін аудитке өтінім беру")}<ArrowUpRight size={19} /></a></div></div>
    </section>

    <section className="section team" id="team">
      <div className="section-head"><div><Eyebrow number="07">{t("ЛЮДИ AAA URBAN", "AAA URBAN МАМАНДАРЫ")}</Eyebrow><Heading>{t("За каждым объектом", "Әр нысанның артында")}<br /><em>{t("стоят люди.", "адамдар тұр.")}</em></Heading></div><p>{t("Инженеры, диспетчеры, электрики, сантехники и эксплуатационная команда. Разные компетенции — общий объект.", "Инженерлер, диспетчерлер, электриктер, сантехниктер және пайдалану тобы. Әртүрлі құзырет — ортақ нысан.")}</p></div>
      <div className="team-visuals">
        <figure data-reveal>
          <img src="/media/engineering.webp" alt={t("Инженерная работа на объекте AAA URBAN", "AAA URBAN нысанындағы инженерлік жұмыс")} width="1200" height="900" loading="lazy" />
          <figcaption><span>{t("Инженерная команда", "Инженерлік команда")}</span><span>{t("Системы · контроль · эксплуатация", "Жүйелер · бақылау · пайдалану")}</span></figcaption>
        </figure>
        <figure data-reveal>
          <img src="/media/team-operations.jpeg" alt={t("Специалист AAA URBAN на объекте", "AAA URBAN маманы нысанда")} width="1100" height="1376" loading="lazy" />
          <figcaption><span>{t("Команда на объекте", "Нысандағы команда")}</span><span>{t("Люди · здание · ответственность", "Адамдар · ғимарат · жауапкершілік")}</span></figcaption>
        </figure>
      </div>
      {people.length > 0 && <div className="team-gallery">{people.map(person => <figure key={person.id} data-reveal><img src={person.photo} alt={person.name[lang]} width="600" height="750" loading="lazy" style={{ objectPosition: person.position || "50% 30%" }} /><figcaption><strong>{person.name[lang]}</strong><span>{person.role[lang]}</span></figcaption></figure>)}</div>}
      <div className="team-specialties">{[
        [Settings2, t("Инженерия", "Инженерия"), t("Оборудование и системы здания", "Ғимарат жабдығы мен жүйелері")],
        [Radio, t("Диспетчеризация", "Диспетчерлік басқару"), t("Обращения и координация работ", "Өтініштер және жұмыстарды үйлестіру")],
        [Users, t("Эксплуатация", "Пайдалану"), t("Здание, территория и ежедневные задачи", "Ғимарат, аумақ және күнделікті міндеттер")],
      ].map(([Icon, label, desc], i) => { const Symbol = Icon as typeof Users; return <div key={i} data-reveal><Symbol size={26} /><h3>{label as string}</h3><p>{desc as string}</p></div>; })}</div>
    </section>

    <section className="section experience" id="experience">
      <div className="section-head"><div><Eyebrow number="08">{t("ПРОФЕССИОНАЛЬНЫЙ ОПЫТ", "КӘСІБИ ТӘЖІРИБЕ")}</Eyebrow><Heading>{t("Опыт, который", "Жүйеге айналған")}<br /><em>{t("стал системой.", "тәжірибе.")}</em></Heading></div><p>{t("Опыт группы — основа AAA URBAN. Корпоративные объекты ниже отражают этот опыт.", "Топ тәжірибесі — AAA URBAN негізі. Төмендегі корпоративтік нысандар осы тәжірибені көрсетеді.")}</p></div>
      <div className="experience-facts">
        <div><strong>2007<ArrowUpRight aria-hidden="true" /></strong><p>{t("Начало истории группы", "Топ тарихының басталуы")}</p></div>
        <div><strong>100<span>+</span></strong><p>{t("Специалистов в команде группы", "Топ құрамындағы мамандар")}</p></div>
        <div><strong>2026<ArrowUpRight aria-hidden="true" /></strong><p>{t("Запуск AAA URBAN", "AAA URBAN бағытының іске қосылуы")}</p></div>
      </div>
      {hasResidential && <div className="case-filters" role="group" aria-label={t("Категории кейсов", "Жоба санаттары")}>{[["all", t("Все объекты", "Барлық нысандар")], ["corporate", t("Корпоративные", "Корпоративтік")], ["residential", t("Жилые комплексы", "Тұрғын үй кешендері")]].map(([value, label]) => <button key={value} aria-pressed={caseFilter === value} onClick={() => setCaseFilter(value)}>{label}</button>)}</div>}
      <div className="case-grid">{publishedCases.filter(item => caseFilter === "all" || caseFilter === item.category).map(item => <article key={item.id} className={item.photo ? "case-card with-photo" : "case-card"}>
        {item.photo && <img className="case-photo" src={item.photo} alt={item.title[lang]} width="800" height="560" loading="lazy" />}
        <div className="case-content">{item.logo && <div className="client-logo"><img src={item.logo} alt={item.title[lang]} width="210" height="90" loading="lazy" /></div>}
          <p className="case-period">{item.period}<span>{item.attribution === "group" ? t("Опыт группы", "Топ тәжірибесі") : "AAA URBAN"}</span></p>
          <h3>{item.title[lang]}</h3><p>{item.scope[lang]}</p>
        </div>
      </article>)}</div>
    </section>

    <section className="section faq" id="faq">
      <div className="section-head">
        <div>
          <Eyebrow number="09">{t("ВОПРОСЫ ОБ УПРАВЛЕНИИ ОБЪЕКТОМ", "НЫСАНДЫ БАСҚАРУ ТУРАЛЫ СҰРАҚТАР")}</Eyebrow>
          <Heading>{t("Коротко о", "Қысқаша")}<br /><em>{t("главном.", "негізгісі.")}</em></Heading>
        </div>
        <p>{t("Прямые ответы о составе услуг, типах объектов и начале работы с AAA URBAN.", "Қызметтер құрамы, нысан түрлері және AAA URBAN-пен жұмысты бастау туралы нақты жауаптар.")}</p>
      </div>
      <div className="faq-list">
        {seoFaq.map((item, index) => <details key={item.question.ru} className="faq-item">
          <summary><span>{String(index + 1).padStart(2, "0")}</span>{item.question[lang]}<Plus size={18} aria-hidden="true" /></summary>
          <p>{item.answer[lang]}</p>
        </details>)}
      </div>
    </section>

    <section className="section contact" id="contact">
      <div className="contact-image" /><div className="contact-shade" />
      <div className="contact-copy"><Eyebrow number="10">{t("НАЧНЁМ С ВАШЕГО ОБЪЕКТА", "НЫСАНЫҢЫЗДАН БАСТАЙЫҚ")}</Eyebrow><Heading>{t("Давайте обсудим", "Нысаныңызды")}<br /><em>{t("ваш объект.", "талқылайық.")}</em></Heading><p>{t("Расскажите о недвижимости и задачах — подготовим предложение по управлению и эксплуатации.", "Жылжымайтын мүлік пен міндеттер туралы айтыңыз — басқару және пайдалану бойынша ұсыныс дайындаймыз.")}</p>
        <div className="contact-links">
          <a href={"tel:" + siteSettings.phone} onClick={() => track("phone_click", { language: lang })}><Phone size={18} /><span>{siteSettings.phoneDisplay}</span><ArrowUpRight size={16} /></a>
          <a href={"mailto:" + siteSettings.email} onClick={() => track("email_click", { language: lang })}><Mail size={18} /><span>{siteSettings.email}</span><ArrowUpRight size={16} /></a>
          <a href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" onClick={() => whatsappClick("contact")}><MessageCircle size={18} /><span>{t("Отдел продаж в WhatsApp", "WhatsApp-тағы сату бөлімі")}</span><ArrowUpRight size={16} /></a>
          <p><MapPin size={18} /><span><small>{t("ОФИС", "КЕҢСЕ")}</small>{siteSettings.address[lang]}</span></p>
        </div>
      </div>
      <div className="form-panel">{preparedUrl ? <div className="form-ready" role="status">
        <Check size={32} /><h3>{t("Сообщение подготовлено", "Хабарлама дайын")}</h3><p>{t("Откройте WhatsApp, проверьте данные и нажмите «Отправить». Пока сообщение не отправлено, отдел продаж его не получил.", "WhatsApp-ты ашып, деректерді тексеріңіз де, «Жіберу» түймесін басыңыз. Хабарлама жіберілмейінше, сату бөлімі оны алмайды.")}</p><a href={preparedUrl} target="_blank" rel="noopener noreferrer" className="button primary" onClick={() => whatsappClick("prepared_inquiry")}>{t("Открыть WhatsApp", "WhatsApp-ты ашу")}<ArrowUpRight size={18} /></a><button className="text-button" onClick={() => setPreparedUrl("")}>{t("Изменить данные", "Деректерді өзгерту")}<ArrowRight size={18} /></button>
      </div> : null}
        <form onSubmit={prepareInquiry} hidden={Boolean(preparedUrl)}>
          <h3>{t("Получить предложение", "Ұсыныс алу")}</h3><p className="form-intro">{t("Заполните данные — подготовим сообщение для отправки в WhatsApp.", "Деректерді толтырыңыз — WhatsApp-та жіберуге арналған хабарламаны дайындаймыз.")}</p>
          <div className="form-row"><label htmlFor="name">{t("Ваше имя", "Атыңыз")} *<input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder={t("Как к вам обращаться", "Сізге қалай жүгінуге болады")} /></label><label htmlFor="phone">{t("Телефон", "Телефон")} *<input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={25} placeholder="+7 (___) ___ __ __" /></label></div>
          <div className="form-row"><label htmlFor="object-type">{t("Тип объекта", "Нысан түрі")}<select id="object-type" name="type" value={objectType} onChange={event => setObjectType(event.target.value)}>{objectTypes.map(item => <option value={item.id} key={item.id}>{kz ? item.kz : item.ru}</option>)}</select></label><label htmlFor="area">{t("Площадь, м²", "Ауданы, м²")}<input id="area" name="area" type="number" min="1" max="1000000000" step="any" placeholder={t("Необязательно", "Міндетті емес")} /></label></div>
          <label htmlFor="comment">{t("Задачи объекта", "Нысан міндеттері")}<textarea id="comment" name="comment" rows={3} maxLength={1500} placeholder={t("Город, особенности и что нужно решить", "Қала, ерекшеліктер және шешілуі тиіс міндеттер")} /></label>
          <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="consent"><Checkbox id="consent" checked={consent} onCheckedChange={value => setConsent(value === true)} aria-required="true" /><label htmlFor="consent">{t("Согласен на обработку данных для ответа на обращение. ", "Өтінішке жауап беру үшін деректерді өңдеуге келісемін. ")}<a href={privacyPath} target="_blank" rel="noopener noreferrer">{t("Подробнее", "Толығырақ")}</a></label></div>
          {error && <p role="alert" className="form-error">{error}</p>}
          <button className="button primary submit-button" type="submit">{t("Продолжить в WhatsApp", "WhatsApp-та жалғастыру")}<ArrowUpRight size={19} /></button>
        </form>
      </div>
    </section>
    <footer className="site-footer">
      <Brand lang={lang} />
      <div className="footer-description"><p>{t("Управление и эксплуатация недвижимости.", "Жылжымайтын мүлікті басқару және пайдалану.")}</p><small>© 2026 AAA URBAN</small></div>
      <div className="footer-services">
        <strong>{t("Услуги", "Қызметтер")}</strong>
        <div>{serviceLinks.map((item) => <a key={item.key} href={servicePath(item.key, lang)}>{item.label}</a>)}</div>
      </div>
      <div className="footer-links"><a href={privacyPath}>{t("Обработка данных", "Деректерді өңдеу")}</a><a href="#home">{t("Наверх", "Жоғары")}<ArrowUpRight size={16} /></a></div>
    </footer>
    <a className="mobile-whatsapp" href={whatsappUrl(waMessage)} target="_blank" rel="noopener noreferrer" onClick={() => whatsappClick("mobile")} aria-label={t("Обсудить объект в WhatsApp", "Нысанды WhatsApp-та талқылау")}><MessageCircle size={21} /><span>{t("Обсудить объект", "Нысанды талқылау")}</span><ArrowUpRight size={18} /></a>
  </main></MotionConfig>;
}
