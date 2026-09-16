/** Фото поместите в public/team, путь в данных начинается с /team/. */
export type Localized = { ru: string; kz: string };
export type TeamMember = {
  id: string;
  name: Localized;
  role: Localized;
  photo: string;
  position?: string; // Например, "50% 30%" — положение лица в кадре.
  published: boolean;
};

// Только реальные сотрудники. Пустой список показывает блок компетенций без вымышленных портретов.
export const teamMembers: TeamMember[] = [];

export type CaseStudy = {
  id: string;
  category: "corporate" | "residential";
  title: Localized;
  scope: Localized;
  period: string;
  attribution: "group" | "urban";
  logo?: string;
  photo?: string;
  published: boolean;
};

// Добавляйте подтверждённые кейсы ЖК с category: "residential".
// Не публикуйте адреса, фото и результаты без согласования с заказчиком.
export const caseStudies: CaseStudy[] = [
  {
    id: "kazatomprom", category: "corporate", published: true, attribution: "group",
    title: { ru: "Казатомпром", kz: "Қазатомөнеркәсіп" }, period: "2018",
    scope: { ru: "Комплексное обслуживание головного офиса", kz: "Бас кеңсеге кешенді қызмет көрсету" },
    logo: "/clients/kazatomprom.png",
  },
  {
    id: "samruk", category: "corporate", published: true, attribution: "group",
    title: { ru: "Самрук-Қазына", kz: "Самұрық-Қазына" }, period: "2020",
    scope: { ru: "Работа с противопожарными системами головного офиса", kz: "Бас кеңсенің өртке қарсы жүйелерімен жұмыс" },
    logo: "/clients/samruk.png",
  },
  {
    id: "haileybury", category: "corporate", published: true, attribution: "group",
    title: { ru: "Haileybury Astana", kz: "Haileybury Astana" }, period: "2011",
    scope: { ru: "Комплексное обслуживание объекта", kz: "Нысанға кешенді қызмет көрсету" },
    logo: "/clients/haileybury.png",
  },
];
