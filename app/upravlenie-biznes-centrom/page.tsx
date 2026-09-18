import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("business-center", "ru");

export default function Page() {
  return <ServicePage pageKey="business-center" lang="ru" />;
}
