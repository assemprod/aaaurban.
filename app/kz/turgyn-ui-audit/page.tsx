import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("residential-audit", "kz");

export default function Page() {
  return <ServicePage pageKey="residential-audit" lang="kz" />;
}
