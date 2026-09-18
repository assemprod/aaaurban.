import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("engineering-systems", "ru");

export default function Page() {
  return <ServicePage pageKey="engineering-systems" lang="ru" />;
}
