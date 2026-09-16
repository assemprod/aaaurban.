import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../dist/server/index.js";

const origin = "https://aaaurban.aaaurban.workers.dev";
async function request(path, options) {
  const pending = [];
  const context = { waitUntil(promise) { pending.push(promise); }, passThroughOnException() {} };
  const response = await worker.fetch(new Request(origin + path, options), {}, context);
  const html = await response.text();
  await Promise.all(pending);
  return { response, html, visible: html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "") };
}

for (const [path, language, title, audit] of [
  ["/", "ru", "ВЕСЬ ОБЪЕКТ", "Заказать бесплатный аудит"],
  ["/kz", "kk", "БҮКІЛ НЫСАН", "Тегін аудитке өтінім беру"],
]) {
  test(`${path}: content and language are present before JavaScript`, async () => {
    const { response, html, visible } = await request(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /text\/html/);
    assert.ok(html.includes(`<html lang="${language}"`));
    assert.equal((visible.match(/<h1\b/g) || []).length, 1);
    assert.ok(visible.includes(title));
    assert.ok(visible.includes(audit));
    assert.doesNotMatch(visible, /AAA SERVICE|AAA Service|PROF STROY|Prof Stroy|your-domain|\.example/);
    assert.ok(visible.includes('href="tel:+77012200112"'));
    assert.ok(visible.includes('href="mailto:info@aaaservice.kz"'));
    assert.ok(visible.includes('name="name"'));
    assert.ok(visible.includes('name="phone"'));
    assert.ok(visible.includes('id="consent"'));
  });

  test(`${path}: navigation targets and local images resolve`, async () => {
    const { visible } = await request(path);
    const ids = [...visible.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, "Element IDs must be unique");
    for (const [, target] of visible.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(ids.includes(target), `Missing section #${target}`);
    }
    for (const [, source] of visible.matchAll(/<img\b[^>]*\bsrc="(\/[^"?]+)"/g)) {
      await access(new URL(`../public${source}`, import.meta.url));
    }
    for (const [image] of visible.matchAll(/<img\b[^>]*>/g)) {
      assert.match(image, /\balt="[^"]*"/, "Every image needs an alt attribute");
    }
  });

  test(`${path}: WhatsApp calls to action reach the configured number`, async () => {
    const { visible } = await request(path);
    const links = [...visible.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)];
    assert.ok(links.length >= 3);
    for (const [, href] of links) {
      const url = new URL(href.replaceAll("&amp;", "&"));
      assert.equal(url.pathname, "/77012200112");
      const message = url.searchParams.get("text");
      assert.ok(message && !message.includes("undefined"));
      assert.ok(message.includes(language === "ru" ? "Здравствуйте" : "Сәлеметсіз"));
    }
  });

  test(`${path}: canonical, language alternatives and structured contacts are correct`, async () => {
    const { html } = await request(path);
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.equal(canonical?.[1], origin + (path === "/" ? "/" : path));
    assert.match(html, /hrefLang="ru-KZ"|hreflang="ru-KZ"/);
    assert.match(html, /hrefLang="kk-KZ"|hreflang="kk-KZ"/);
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(json);
    const data = JSON.parse(json);
    assert.equal(data.name, "AAA URBAN");
    assert.equal(data.telephone, "+77012200112");
    assert.equal(data.email, "info@aaaservice.kz");
    assert.equal(data.address.addressCountry, "KZ");
  });
}

test("privacy pages describe the actual WhatsApp handoff in both languages", async () => {
  for (const [path, language, home] of [["/privacy", "ru", "/#contact"], ["/kz/privacy", "kk", "/kz#contact"]]) {
    const { response, html, visible } = await request(path);
    assert.equal(response.status, 200);
    assert.ok(html.includes(`<html lang="${language}"`));
    assert.match(visible, /WhatsApp/);
    assert.ok(visible.includes(`href="${home}"`));
    assert.match(html, /noindex/);
  }
});

test("language middleware overrides an incorrect client-supplied locale", async () => {
  const { html } = await request("/", { headers: { "x-urban-language": "kk" } });
  assert.ok(html.includes('<html lang="ru"'));
});

test("robots and sitemap point to the public website", async () => {
  const robots = await request("/robots.txt");
  const sitemap = await request("/sitemap.xml");
  assert.equal(robots.response.status, 200);
  assert.equal(sitemap.response.status, 200);
  assert.ok(robots.html.includes(origin + "/sitemap.xml"));
  assert.ok(sitemap.html.includes(`<loc>${origin}/</loc>`));
  assert.ok(sitemap.html.includes(`<loc>${origin}/kz</loc>`));
  assert.doesNotMatch(sitemap.html, /\.example|your-domain/);
});

test("retired D1 endpoint returns an error without requesting a database", async () => {
  const { response, html } = await request("/api/inquiries", { method: "POST", body: "invalid body" });
  assert.equal(response.status, 410);
  const result = JSON.parse(html);
  assert.ok(result.error);
  assert.equal(result.success, undefined);
});
