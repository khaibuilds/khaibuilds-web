import type { Locale } from "../lib/copy";

export type ProjectStage = "live" | "prototype" | "concept";
export type SkillTag = "website" | "android" | "video" | "ai" | "local" | "other";
export interface PortfolioProject {
  slug: string;
  published: boolean;
  ownerApproved: boolean;
  reviewedAt: string;
  stage: ProjectStage;
  origin: "self-developed";
  tags: SkillTag[];
  locale: Record<Locale,{title:string;summary:string;focus:string}>;
  publicUrl: string;
  /** Include only explicitly public source; never expose private 9x9 repositories. */
  sourceUrl?: string;
}

// Selected from projects already publicly identified in the KhaiBuilds GitHub
// profile. "Live" denotes a verified deployment, NOT a browser-level QA pass.
// These are self-developed projects, not paid client commissions.
export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "9x9-tools",
    published: true,
    ownerApproved: true,
    reviewedAt: "2026-11-06",
    stage: "live",
    origin: "self-developed",
    tags: ["website", "other"],
    locale: {
      en: {
        title: "9×9 Tools",
        summary: "A collection of small browser utilities, including text, date, QR and image tools.",
        focus: "Demonstrates focused JavaScript interfaces, mobile-first layouts and practical browser workflows."
      },
      vi: {
        title: "9×9 Tools",
        summary: "Bộ tiện ích nhỏ trên trình duyệt, gồm công cụ văn bản, ngày tháng, QR và xử lý ảnh.",
        focus: "Minh họa giao diện JavaScript theo nhu cầu cụ thể, thiết kế mobile-first và thao tác trình duyệt thực tế."
      }
    },
    publicUrl: "https://tools.9x9.vn/"
  },
  {
    slug: "khaibuilds-website",
    published: true,
    ownerApproved: true,
    reviewedAt: "2026-11-06",
    stage: "live",
    origin: "self-developed",
    tags: ["website"],
    locale: {
      en: {
        title: "KhaiBuilds Website",
        summary: "A bilingual portfolio website built with Astro, TypeScript and a static deployment workflow.",
        focus: "Demonstrates responsive pages, technical SEO basics, version control and reproducible CI checks."
      },
      vi: {
        title: "Website KhaiBuilds",
        summary: "Website hồ sơ năng lực song ngữ xây dựng bằng Astro, TypeScript và quy trình triển khai tĩnh.",
        focus: "Minh họa trang responsive, SEO kỹ thuật cơ bản, quản lý phiên bản và kiểm tra CI tái lập được."
      }
    },
    publicUrl: "https://khaibuilds.com/",
    sourceUrl: "https://github.com/khaibuilds/khaibuilds-web"
  },
  {
    slug: "9x9-link",
    published: true,
    ownerApproved: true,
    reviewedAt: "2026-11-06",
    stage: "live",
    origin: "self-developed",
    tags: ["website"],
    locale: {
      en: {
        title: "9×9 LINK",
        summary: "A shareable personal link-page tool with Google sign-in and account-managed pages.",
        focus: "Demonstrates a scoped web product with front-end interaction and Cloudflare Pages Functions."
      },
      vi: {
        title: "9×9 LINK",
        summary: "Công cụ trang liên kết cá nhân dễ chia sẻ, đăng nhập Google và quản lý trang theo tài khoản.",
        focus: "Minh họa sản phẩm web có phạm vi rõ, tương tác phía trình duyệt và Cloudflare Pages Functions."
      }
    },
    publicUrl: "https://link.9x9.vn/"
  }
];

const slugRule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validTags: SkillTag[] = ["website", "android", "video", "ai", "local", "other"];
const validStages: ProjectStage[] = ["live", "prototype", "concept"];

export function getPublicProjects(): PortfolioProject[] {
  const slugs = new Set<string>();
  for (const p of portfolioProjects) {
    if (!slugRule.test(p.slug) || slugs.has(p.slug)) throw new Error("Invalid project slug: " + p.slug);
    slugs.add(p.slug);
    if (!p.published) continue;
    if (!p.ownerApproved || p.origin !== "self-developed") throw new Error("Unapproved or misattributed project: " + p.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.reviewedAt) || Number.isNaN(Date.parse(p.reviewedAt))) throw new Error("Invalid project review date: " + p.slug);
    if (!validStages.includes(p.stage) || !p.tags.length || p.tags.some(t => !validTags.includes(t))) throw new Error("Invalid project stage/tags: " + p.slug);
    for (const locale of ["en", "vi"] as const) {
      const item = p.locale[locale];
      if (!item || !item.title.trim() || !item.summary.trim() || !item.focus.trim()) throw new Error("Incomplete project " + locale + " copy: " + p.slug);
    }
    if (!/^https:\/\//.test(p.publicUrl) || (p.sourceUrl && !/^https:\/\//.test(p.sourceUrl))) throw new Error("Project URLs must use HTTPS: " + p.slug);
  }
  return portfolioProjects.filter(p => p.published && p.ownerApproved);
}
