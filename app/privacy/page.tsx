import type { Metadata } from "next";
import PrivacyContent from "../privacy-content";
export const metadata: Metadata = {
  title: "Данные вашего обращения",
  description: "Как используется информация из формы обращения AAA URBAN.",
  alternates: { canonical: "/privacy", languages: { "ru-KZ": "/privacy", "kk-KZ": "/kz/privacy" } },
  robots: { index: false, follow: true },
};
export default function PrivacyPage() { return <PrivacyContent lang="ru" />; }
