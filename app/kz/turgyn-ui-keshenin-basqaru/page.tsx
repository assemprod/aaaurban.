import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("residential-complex", "kz");

export default function Page() {
  return <ServicePage pageKey="residential-complex" lang="kz" />;
}
