import ServicePage, { buildServiceMetadata } from "../service-page";

export const metadata = buildServiceMetadata("osi-management", "ru");

export default function Page() {
  return <ServicePage pageKey="osi-management" lang="ru" />;
}
