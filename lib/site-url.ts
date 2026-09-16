import { siteSettings } from "@/app/site-settings";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = (configuredUrl || siteSettings.siteUrl).replace(/\/$/, "");
