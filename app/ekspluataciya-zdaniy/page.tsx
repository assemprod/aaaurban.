import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("building-operation", "ru");

export default function Page() {
  return <ServicePage pageKey="building-operation" lang="ru" />;
}
