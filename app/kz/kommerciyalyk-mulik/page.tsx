import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("commercial-property", "kz");

export default function Page() {
  return <ServicePage pageKey="commercial-property" lang="kz" />;
}
