// Совместимость оставшихся примеров D1. В текущей версии binding DB не используется.
declare module "cloudflare:workers" {
  export const env: {
    DB?: Parameters<typeof import("drizzle-orm/d1").drizzle>[0];
  };
}
