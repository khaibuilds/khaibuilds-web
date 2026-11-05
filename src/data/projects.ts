import type { Locale } from "../lib/copy";

export type ProjectStage = "live" | "prototype" | "concept";
export type SkillTag = "website" | "android" | "video" | "ai" | "local" | "other";
export interface PortfolioProject {
  slug: string;
  published: boolean;
  ownerApproved: boolean;
  reviewedAt: string;
  stage: ProjectStage;
  tags: SkillTag[];
  locale: Record<Locale,{title:string;summary:string}>;
  publicUrl?: string;
}
// No project is automatically public. Personal experiments can appear after
// explicit ownership and factual review, without claiming paid client work.
export const portfolioProjects: PortfolioProject[] = [];

export function getPublicProjects() {
  const slugs = new Set<string>();
  for (const p of portfolioProjects) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || slugs.has(p.slug)) throw new Error("Invalid project slug: "+p.slug);
    slugs.add(p.slug);
    if (p.published && (!p.ownerApproved || !p.reviewedAt || !p.locale.en?.title || !p.locale.vi?.title || !p.locale.en?.summary || !p.locale.vi?.summary)) throw new Error("Unapproved/incomplete project: "+p.slug);
    if (p.publicUrl && !/^https:\/\//.test(p.publicUrl)) throw new Error("Only verified https links may be included");
  }
  return portfolioProjects.filter(p => p.published && p.ownerApproved);
}
