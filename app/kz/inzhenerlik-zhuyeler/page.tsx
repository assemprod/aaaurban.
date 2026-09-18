import ServicePage, { buildServiceMetadata } from "../../service-page";

export const metadata = buildServiceMetadata("engineering-systems", "kz");

export default function Page() {
  return <ServicePage pageKey="engineering-systems" lang="kz" />;
}
