import type { Locale } from "../lib/copy";

export type ServiceStatus = "scoping" | "available" | "paused" | "planned";
export interface ServiceCopy {
  cardTitle: string;
  cardDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  paragraphs: string[];
  included: string[];
  notIncluded: string[];
}
export interface ServiceRecord {
  id: string;
  slug: string;
  status: ServiceStatus;
  published: boolean;
  order: number;
  reviewedAt: string;
  locales: Record<Locale, ServiceCopy>;
}
export const services: ServiceRecord[] = [
  {
    id: "personal-websites",
    slug: "personal-websites",
    status: "scoping",
    published: true,
    order: 10,
    reviewedAt: "2026-10-10",
    locales: {
      en: {
        "cardTitle": "Personal websites",
        "cardDescription": "One clear place for your profile, work and important links.",
        "eyebrow": "Service / 01",
        "title": "A simple website for your work.",
        "description": "A mobile-friendly personal site to introduce yourself, share what you do and make it easy to reach you.",
        "label": "Personal websites",
        "paragraphs": [
          "A one-page profile or small portfolio can bring your key information together without unnecessary features.",
          "Share your content and goals. Pages, revisions and handover will be agreed before work begins."
        ],
        "included": [
          "One-page website or small portfolio",
          "Layout for mobile and desktop",
          "Contact links and basic on-page SEO",
          "Domain setup and deployment if agreed",
          "Simple handover instructions"
        ],
        "notIncluded": [
          "Online shops or advanced booking systems",
          "User accounts or large content-management systems",
          "Unlimited changes or ongoing maintenance"
        ]
      },
      vi: {
        "cardTitle": "Website cá nhân",
        "cardDescription": "Nơi giới thiệu bản thân, công việc và các liên kết quan trọng.",
        "eyebrow": "Dịch vụ / 01",
        "title": "Website cá nhân, gọn và rõ.",
        "description": "Một nơi để giới thiệu bản thân, chia sẻ công việc và giúp người khác dễ dàng liên hệ với bạn.",
        "label": "Website cá nhân",
        "paragraphs": [
          "Phù hợp với người làm nghề tự do, người sáng tạo nội dung hoặc bất kỳ ai cần một trang giới thiệu riêng.",
          "Số trang, nội dung, các lần chỉnh sửa và cách bàn giao sẽ được thống nhất trước khi thực hiện."
        ],
        "included": [
          "Website một trang hoặc bộ hồ sơ năng lực nhỏ",
          "Giao diện cho điện thoại và máy tính",
          "Liên kết liên hệ và SEO cơ bản",
          "Kết nối tên miền và triển khai khi thỏa thuận",
          "Hướng dẫn bàn giao đơn giản"
        ],
        "notIncluded": [
          "Cửa hàng trực tuyến hoặc đặt lịch phức tạp",
          "Tài khoản thành viên hoặc hệ thống quản trị lớn",
          "Chỉnh sửa không giới hạn hoặc bảo trì dài hạn"
        ]
      }
    }
  },
  {
    id: "android-apps",
    slug: "android-apps",
    status: "scoping",
    published: true,
    order: 20,
    reviewedAt: "2026-10-10",
    locales: {
      en: {
        "cardTitle": "Custom Android apps",
        "cardDescription": "Small tools for notes, checklists, tracking and routine tasks.",
        "eyebrow": "Service / 02",
        "title": "An Android app for a specific task.",
        "description": "A focused tool for a personal or small-team workflow — without features you do not need.",
        "label": "Custom Android apps",
        "paragraphs": [
          "Examples include checklists, simple calculations, offline notes and basic task tracking.",
          "Before starting, we discuss what the app should do, which devices it should support and how it will be installed and maintained."
        ],
        "included": [
          "One defined task and essential screens",
          "Local data storage where suitable",
          "Testing on agreed Android devices",
          "Installation and handover instructions"
        ],
        "notIncluded": [
          "Banking, medical or other high-risk applications",
          "Complex cloud sync or real-time multi-user systems",
          "Guaranteed Google Play publishing or unlimited support"
        ]
      },
      vi: {
        "cardTitle": "Ứng dụng Android",
        "cardDescription": "Công cụ nhỏ để ghi chép, tính toán, theo dõi hoặc quản lý việc hằng ngày.",
        "eyebrow": "Dịch vụ / 02",
        "title": "Ứng dụng Android cho một nhu cầu cụ thể.",
        "description": "Công cụ dành cho cá nhân hoặc nhóm nhỏ, tập trung vào những tính năng thực sự cần dùng.",
        "label": "Ứng dụng Android theo yêu cầu",
        "paragraphs": [
          "Ví dụ: danh sách việc cần làm, ghi chú ngoại tuyến, tính toán đơn giản hoặc theo dõi công việc.",
          "Trước khi bắt đầu, cần thống nhất chức năng, thiết bị hỗ trợ, cách cài đặt và phạm vi bảo trì."
        ],
        "included": [
          "Một mục đích sử dụng và các màn hình cần thiết",
          "Lưu dữ liệu trên máy khi phù hợp",
          "Kiểm thử trên thiết bị Android đã thỏa thuận",
          "Hướng dẫn cài đặt và bàn giao"
        ],
        "notIncluded": [
          "Ứng dụng ngân hàng, y tế hoặc lĩnh vực rủi ro cao",
          "Đồng bộ đám mây phức tạp hoặc nhiều người dùng thời gian thực",
          "Cam kết duyệt Google Play hoặc hỗ trợ không giới hạn"
        ]
      }
    }
  }
];

const localeCodes: Locale[] = ["en","vi"];
const slugRule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function assertServiceRegistry(): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const item of services) {
    if (ids.has(item.id) || slugs.has(item.slug) || !slugRule.test(item.slug)) throw new Error("Duplicate or invalid service identifier: " + item.slug);
    ids.add(item.id); slugs.add(item.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.reviewedAt) || Number.isNaN(Date.parse(item.reviewedAt))) throw new Error("Missing review date: " + item.slug);
    if (item.published && item.status === "planned") throw new Error("Cannot publish an unapproved planned service: " + item.slug);
    for (const lang of localeCodes) {
      const copy = item.locales[lang];
      if (!copy || !copy.cardTitle.trim() || !copy.cardDescription.trim() || !copy.title.trim() || !copy.description.trim()) throw new Error("Incomplete " + lang + " copy: " + item.slug);
      if (item.published && (!copy.paragraphs.length || !copy.included.length || !copy.notIncluded.length)) throw new Error("Missing approved public scope: " + item.slug);
    }
  }
}
export const getPublicServices = () => {
  assertServiceRegistry();
  return services.filter(s => s.published && (s.status === "scoping" || s.status === "available")).sort((a,b)=>a.order-b.order);
};
export function getPublicService(slug: string): ServiceRecord | undefined {
  return getPublicServices().find(s=>s.slug===slug);
}
export function serviceHref(slug: string,locale: Locale): string {
  return (locale==="vi"?"/vi":"") + "/services/" + encodeURIComponent(slug) + "/";
}
