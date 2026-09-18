import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("residential-complex", "ru");

export default function Page() {
  return <ServicePage pageKey="residential-complex" lang="ru" />;
}
