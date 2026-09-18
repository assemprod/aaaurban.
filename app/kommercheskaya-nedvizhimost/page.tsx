import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("commercial-property", "ru");

export default function Page() {
  return <ServicePage pageKey="commercial-property" lang="ru" />;
}
