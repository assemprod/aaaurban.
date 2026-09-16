import type { Metadata } from "next";
import PrivacyContent from "../../privacy-content";
export const metadata: Metadata = {
  title: "Өтінішіңіздің деректері",
  description: "AAA URBAN өтініш нысанындағы ақпарат қалай пайдаланылады.",
  alternates: { canonical: "/kz/privacy", languages: { "ru-KZ": "/privacy", "kk-KZ": "/kz/privacy" } },
  openGraph: { title: "Өтінішіңіздің деректері | AAA URBAN", description: "Өтініш нысанындағы ақпаратты пайдалану.", locale: "kk_KZ", url: "/kz/privacy" },
  robots: { index: false, follow: true },
};
export default function PrivacyPage() { return <PrivacyContent lang="kz" />; }
