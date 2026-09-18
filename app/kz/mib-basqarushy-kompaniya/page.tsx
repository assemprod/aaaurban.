import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("osi-management", "kz");

export default function Page() {
  return <ServicePage pageKey="osi-management" lang="kz" />;
}
