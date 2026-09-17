import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("business-center", "kz");

export default function Page() {
  return <ServicePage pageKey="business-center" lang="kz" />;
}
