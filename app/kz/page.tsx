import UrbanSite from "../urban-site";
import HomeStructuredData from "../home-structured-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Астанада жылжымайтын мүлікті басқару және пайдалану",
  description:
    "AAA URBAN — Астанадағы тұрғын үй және коммерциялық жылжымайтын мүлікті кешенді басқару және пайдалану: инженерлік жүйелер, мердігерлер, қауіпсіздік және аумақ.",
  alternates: {
    canonical: "/kz",
    languages: { "ru-KZ": "/", "kk-KZ": "/kz", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "AAA URBAN",
    locale: "kk_KZ",
    alternateLocale: ["ru_KZ"],
    title: "Астанада жылжымайтын мүлікті басқару және пайдалану | AAA URBAN",
    description: "Жылжымайтын мүлікті кешенді басқару және пайдалану. Астана.",
    url: "/kz",
  },
};

export default function KazakhHome() {
  return <><UrbanSite lang="kz" /><HomeStructuredData lang="kz" /></>;
}
