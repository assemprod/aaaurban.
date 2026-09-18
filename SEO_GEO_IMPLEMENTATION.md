# AAA URBAN — SEO + GEO implementation notes

Дата обновления: 17 сентября 2026.

## Что уже внесено в этот архив

- Canonical-база приведена к текущему публичному адресу `https://aaaurbanver2.corparationsite.workers.dev`.
- RU/KZ metadata усилены под запросы «управление и эксплуатация недвижимости в Астане».
- Для `/` и `/kz` добавлены `ru-KZ`, `kk-KZ` и `x-default` language alternatives.
- JSON-LD расширен сущностями `Organization`, `WebSite`, `WebPage`, `FAQPage`; добавлены адрес, зона обслуживания Астана, контакты и тематическая специализация.
- `robots.txt` явно разрешает `OAI-SearchBot` и закрывает неиспользуемый `/api/` от поискового обхода.
- `sitemap.xml` содержит языковые альтернативы и больше не выставляет ложный `lastModified` при каждом запросе.
- На главную добавлен видимый RU/KZ FAQ с прямыми, фактическими ответами для пользователей и AI-поиска.
- Исправлен SSR-баг карточек объектов: подписи БЦ/отеля/торгового/складского объекта больше не должны дублировать «Жилой комплекс».
- В middleware добавлены базовые response security headers без рискованного CSP, который требует отдельного browser-теста.
- Автотесты обновлены под новый JSON-LD, текущий hostname, OAI-SearchBot и корректные подписи объектов.

## Что нужно сделать перед настоящим production SEO

1. Подключить собственный брендовый домен AAA URBAN.
2. После подключения заменить `NEXT_PUBLIC_SITE_URL` в Cloudflare на финальный `https://...` или удалить переменную и изменить `app/site-settings.ts`.
3. Настроить 301 redirect со всех старых `workers.dev` адресов на один основной домен.
4. Добавить домен в Google Search Console и Bing Webmaster Tools, отправить `/sitemap.xml`.
5. Создать/проверить карточки компании в Google Business Profile, 2GIS и Яндекс Картах с одинаковыми NAP-данными (название, адрес, телефон).
6. Проверить, что Cloudflare WAF/Bot protection не отдаёт 403 OAI-SearchBot и Googlebot.
7. После публикации проверить structured data и URL Inspection на production URL.
8. После публикации новых страниц проверить их индексацию, canonical/hreflang и внутренние ссылки через Search Console.

## Реализованная SEO-архитектура услуг

В проект добавлены восемь самостоятельных русских страниц и восемь казахских языковых аналогов. Это не районные doorway-страницы: каждая страница имеет собственный intent, H1, metadata, содержательные блоки, FAQ, CTA и `Service`/`BreadcrumbList`/`FAQPage` schema.

RU:
- `/upravlenie-nedvizhimostyu`
- `/ekspluataciya-zdaniy`
- `/inzhenernye-sistemy`
- `/upravlyayushchaya-kompaniya-dlya-osi`
- `/upravlenie-zhilym-kompleksom`
- `/upravlenie-biznes-centrom`
- `/kommercheskaya-nedvizhimost`
- `/audit-zhk`

KZ:
- `/kz/zhylzhymaytyn-mulikti-basqaru`
- `/kz/gimaratty-paidalanu`
- `/kz/inzhenerlik-zhuyeler`
- `/kz/mib-basqarushy-kompaniya`
- `/kz/turgyn-ui-keshenin-basqaru`
- `/kz/biznes-ortalyk-basqaru`
- `/kz/kommerciyalyk-mulik`
- `/kz/turgyn-ui-audit`

Главная страница теперь содержит контекстные внутренние ссылки на эти направления. Sitemap включает все 16 URL и языковые пары. Контент создан только из подтверждённой сервисной модели текущего проекта: без вымышленных цен, SLA, сертификатов, гарантий и результатов.

Следующий контентный этап после подтверждения фактов заказчиком — отдельные страницы реальных кейсов `/cases/<case-slug>`.

## Важно

Этот архив содержит исходный код. Настройка Search Console, карт, Cloudflare WAF/DNS и финального домена требует доступа к аккаунтам владельца и не считается выполненной только из-за изменений в коде.
