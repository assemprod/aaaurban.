import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("property-management", "ru");

export default function Page() {
  return <ServicePage pageKey="property-management" lang="ru" />;
}
