/** Публичные настройки. Меняйте значения в кавычках, сохраняя имена полей. */
export const siteSettings = {
  siteUrl: "https://aaaurbanver2.corparationsite.workers.dev",
  phoneDisplay: "+7 701 220 01 12",
  phone: "+77012200112",
  whatsapp: "77012200112", // Международный номер без плюса и пробелов.
  email: "info@aaaservice.kz",
  address: {
    ru: "Астана, ул. А. Храпатого, 21, офис 41",
    kz: "Астана, А. Храпатый көшесі, 21, 41-кеңсе",
  },
  city: { ru: "Астана", kz: "Астана" },
  street: { ru: "ул. А. Храпатого, 21, офис 41", kz: "А. Храпатый көшесі, 21, 41-кеңсе" },
};

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteSettings.whatsapp.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
