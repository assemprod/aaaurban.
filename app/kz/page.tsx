import UrbanSite from "../urban-site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Жылжымайтын мүлікті басқару және пайдалану",
  description: "Астанадағы тұрғын үй және коммерциялық жылжымайтын мүлікті кешенді басқару. Инженерлік жүйелер, өтінімдер, мердігерлер және бюджет.",
  alternates: { canonical: "/kz", languages: { "ru-KZ": "/", "kk-KZ": "/kz" } },
  openGraph: {
    type: "website", siteName: "AAA URBAN", locale: "kk_KZ", alternateLocale: ["ru_KZ"],
    title: "AAA URBAN — бүкіл нысан біздің бақылауымызда",
    description: "Жылжымайтын мүлікті кешенді басқару және пайдалану. Астана.",
    url: "/kz",
  },
};

export default function KazakhHome() {
  return <UrbanSite lang="kz" />;
}
