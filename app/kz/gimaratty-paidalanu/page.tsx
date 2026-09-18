import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("building-operation", "kz");

export default function Page() {
  return <ServicePage pageKey="building-operation" lang="kz" />;
}
