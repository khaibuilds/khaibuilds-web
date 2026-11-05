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
  tier: "core" | "conditional";
  locales: Record<Locale, ServiceCopy>;
}
export const services: ServiceRecord[] = [
  {
    "id": "website-bug-fixes",
    "slug": "website-bug-fixes",
    "tier": "core",
    "status": "scoping",
    "published": true,
    "order": 10,
    "reviewedAt": "2026-11-05",
    "locales": {
      "en": {
        "cardTitle": "Website bug fixes",
        "cardDescription": "Fix specific HTML, CSS, JavaScript and mobile-layout issues.",
        "eyebrow": "Core service / 01",
        "title": "Fix a specific website problem.",
        "description": "Focused fixes for reproducible layout, interaction or browser-side JavaScript issues.",
        "label": "Website bug fixes",
        "paragraphs": [
          "Share the page, the issue, steps to reproduce it and the expected result.",
          "We agree on the affected pages, supported browsers and a clear handover before work begins."
        ],
        "included": [
          "Confirm the issue and expected result",
          "Make a focused HTML, CSS or JavaScript fix",
          "Test the agreed pages and screen widths",
          "Provide a short change and handover summary"
        ],
        "notIncluded": [
          "Unbounded visual redesign or a complete website rebuild",
          "Complex back-end systems or emergency response",
          "Unlimited revisions or indefinite support"
        ]
      },
      "vi": {
        "cardTitle": "Sửa lỗi website",
        "cardDescription": "Sửa lỗi HTML, CSS, JavaScript và hiển thị trên điện thoại.",
        "eyebrow": "Dịch vụ chính / 01",
        "title": "Khắc phục một lỗi website cụ thể.",
        "description": "Tập trung vào lỗi bố cục, tương tác hoặc JavaScript trên trình duyệt có thể tái hiện.",
        "label": "Sửa lỗi website",
        "paragraphs": [
          "Gửi đường dẫn, mô tả lỗi, cách tái hiện và kết quả mong muốn.",
          "Trước khi bắt đầu, thống nhất trang bị ảnh hưởng, trình duyệt cần hỗ trợ và cách bàn giao."
        ],
        "included": [
          "Xác nhận lỗi và kết quả mong đợi",
          "Sửa đúng phần HTML, CSS hoặc JavaScript liên quan",
          "Kiểm tra các trang và kích thước màn hình đã thống nhất",
          "Tóm tắt thay đổi và bàn giao"
        ],
        "notIncluded": [
          "Thiết kế lại không giới hạn hoặc xây dựng lại toàn website",
          "Hệ thống backend phức tạp hoặc hỗ trợ khẩn cấp",
          "Sửa đổi không giới hạn hoặc bảo trì vô thời hạn"
        ]
      }
    }
  },
  {
    "id": "javascript-tools",
    "slug": "javascript-tools",
    "tier": "core",
    "status": "scoping",
    "published": true,
    "order": 20,
    "reviewedAt": "2026-11-05",
    "locales": {
      "en": {
        "cardTitle": "Small JavaScript tools",
        "cardDescription": "Build a focused browser utility with defined inputs and outputs.",
        "eyebrow": "Core service / 02",
        "title": "A lightweight tool for one clear task.",
        "description": "Small calculators, converters, text utilities and other single-purpose browser tools.",
        "label": "Small JavaScript tools",
        "paragraphs": [
          "Define what users enter, what the tool returns and the essential edge cases.",
          "The agreed delivery includes a simple responsive interface, basic checks and usage notes."
        ],
        "included": [
          "Agreed inputs, outputs and examples",
          "A functional, mobile-friendly browser interface",
          "Input validation and essential behavior checks",
          "Source files and brief usage instructions"
        ],
        "notIncluded": [
          "Account systems, payments or sensitive data storage",
          "Complex server architecture or unlimited integrations",
          "Unbounded custom design rounds or feature expansion"
        ]
      },
      "vi": {
        "cardTitle": "Tiện ích JavaScript nhỏ",
        "cardDescription": "Xây dựng công cụ trình duyệt có dữ liệu vào và kết quả rõ ràng.",
        "eyebrow": "Dịch vụ chính / 02",
        "title": "Tiện ích gọn cho một công việc.",
        "description": "Công cụ tính toán, chuyển đổi, xử lý văn bản và tiện ích trình duyệt một chức năng.",
        "label": "Tiện ích JavaScript nhỏ",
        "paragraphs": [
          "Thống nhất dữ liệu nhập, kết quả và các trường hợp cần xử lý.",
          "Bàn giao giao diện responsive đơn giản, kiểm tra cơ bản và hướng dẫn sử dụng."
        ],
        "included": [
          "Dữ liệu vào, ra và ví dụ đã thống nhất",
          "Giao diện trình duyệt dùng được trên điện thoại",
          "Kiểm tra dữ liệu nhập và chức năng chính",
          "Mã nguồn và hướng dẫn sử dụng ngắn"
        ],
        "notIncluded": [
          "Tài khoản, thanh toán hoặc lưu dữ liệu nhạy cảm",
          "Máy chủ phức tạp hoặc tích hợp không giới hạn",
          "Nhiều vòng thiết kế sáng tạo hoặc thêm tính năng không giới hạn"
        ]
      }
    }
  },
  {
    "id": "static-site-maintenance",
    "slug": "static-site-maintenance",
    "tier": "core",
    "status": "scoping",
    "published": true,
    "order": 30,
    "reviewedAt": "2026-11-05",
    "locales": {
      "en": {
        "cardTitle": "Static website maintenance",
        "cardDescription": "Update content, links, styling and basic technical SEO.",
        "eyebrow": "Core service / 03",
        "title": "Keep a static website accurate and usable.",
        "description": "Defined updates to existing static sites: text, links, minor styling and technical SEO basics.",
        "label": "Static website maintenance",
        "paragraphs": [
          "We review the existing site and agree on exactly which pages or files to change.",
          "Changes are checked and documented. Production deployment requires separate authorization."
        ],
        "included": [
          "Agreed text, link or minor styling updates",
          "Basic metadata, sitemap or robots review if requested",
          "Checks on affected pages and links",
          "A concise change report and handover"
        ],
        "notIncluded": [
          "Large migrations, advanced back-end work or full redesign",
          "Guaranteed rankings, traffic or search results",
          "Continuous support without a separate agreement"
        ]
      },
      "vi": {
        "cardTitle": "Bảo trì website tĩnh",
        "cardDescription": "Cập nhật nội dung, liên kết, CSS và SEO kỹ thuật cơ bản.",
        "eyebrow": "Dịch vụ chính / 03",
        "title": "Giữ website tĩnh chính xác và dễ sử dụng.",
        "description": "Cập nhật có phạm vi rõ cho website tĩnh hiện có: nội dung, liên kết, giao diện nhỏ và SEO kỹ thuật.",
        "label": "Bảo trì website tĩnh",
        "paragraphs": [
          "Rà soát website hiện tại và thống nhất những trang hoặc tệp cần chỉnh sửa.",
          "Các thay đổi được kiểm tra, ghi nhận; triển khai production cần được cho phép riêng."
        ],
        "included": [
          "Cập nhật văn bản, liên kết hoặc giao diện nhỏ theo thỏa thuận",
          "Rà soát metadata, sitemap hoặc robots khi có yêu cầu",
          "Kiểm tra trang và liên kết liên quan",
          "Báo cáo thay đổi ngắn và bàn giao"
        ],
        "notIncluded": [
          "Chuyển hệ thống lớn, backend nâng cao hoặc thiết kế lại toàn bộ",
          "Cam kết thứ hạng, lượt truy cập hoặc kết quả tìm kiếm",
          "Hỗ trợ liên tục không có thỏa thuận riêng"
        ]
      }
    }
  },

  {
    id: "personal-websites",
    tier: "conditional",
    slug: "personal-websites",
    status: "scoping",
    published: true,
    order: 40,
    reviewedAt: "2026-11-05",
    locales: {
      en: {
        "cardTitle": "Simple personal websites",
        "cardDescription": "Considered when content, design reference and revisions are agreed upfront.",
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
          "Custom visual design without an agreed reference or revision limit",
          "User accounts or large content-management systems",
          "Unlimited changes or ongoing maintenance"
        ]
      },
      vi: {
        "cardTitle": "Website cá nhân",
        "cardDescription": "Chỉ nhận khi nội dung, mẫu giao diện và số vòng sửa đã được thống nhất.",
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
    tier: "conditional",
    slug: "android-apps",
    status: "scoping",
    published: true,
    order: 50,
    reviewedAt: "2026-11-05",
    locales: {
      en: {
        "cardTitle": "Small Android utilities",
        "cardDescription": "Selective inquiries for small, well-scoped offline-first Android tools.",
        "eyebrow": "Service / 02",
        "title": "An Android app for a specific task.",
        "description": "A single-purpose Android utility may be considered when features, devices, revisions and handover can be clearly agreed.",
        "label": "Custom Android apps",
        "paragraphs": [
          "Examples include checklists, simple calculations, offline notes and basic task tracking.",
          "Android work is considered selectively. We agree on screens, data storage, supported devices, limited revisions and maintenance before starting; Google Play publishing is a separate scope."
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
        "cardDescription": "Xem xét có chọn lọc tiện ích Android nhỏ, rõ phạm vi, ưu tiên offline.",
        "eyebrow": "Dịch vụ / 02",
        "title": "Ứng dụng Android cho một nhu cầu cụ thể.",
        "description": "Tiện ích Android một mục đích, chỉ nhận khi chốt rõ tính năng, thiết bị, số vòng sửa và bàn giao.",
        "label": "Tiện ích Android nhỏ",
        "paragraphs": [
          "Ví dụ: danh sách việc cần làm, ghi chú ngoại tuyến, tính toán đơn giản hoặc theo dõi công việc.",
          "Chỉ xem xét có chọn lọc khi đã chốt chức năng, màn hình, thiết bị, số vòng sửa và bảo trì. Phát hành Google Play được thỏa thuận riêng."
        ],
        "included": [
          "Một mục đích sử dụng và số màn hình đã thống nhất",
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
    if (item.tier !== "core" && item.tier !== "conditional") throw new Error("Invalid service tier: " + item.slug);
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
export const getCoreServices = () => getPublicServices().filter(s => s.tier === "core");
export const getConditionalServices = () => getPublicServices().filter(s => s.tier === "conditional");
export function getPublicService(slug: string): ServiceRecord | undefined {
  return getPublicServices().find(s=>s.slug===slug);
}
export function serviceHref(slug: string,locale: Locale): string {
  return (locale==="vi"?"/vi":"") + "/services/" + encodeURIComponent(slug) + "/";
}
