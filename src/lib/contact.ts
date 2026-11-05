/** Public contact channel explicitly supplied by the KhaiBuilds owner.
 * Publishing a mailto link does not verify mailbox delivery or ownership.
 * No server-side message collection or automatic response is implemented.
 */
export const CONTACT_EMAIL = "hi@khaibuilds.com" as const;
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}` as const;

export function inquiryMailto(kind: "general" | "website" | "android" | "domain", locale: "en" | "vi"): string {
  const subjects = {
    en: {
      general: "KhaiBuilds inquiry",
      website: "KhaiBuilds — Personal Website inquiry",
      android: "KhaiBuilds — Android App inquiry",
      domain: "KhaiBuilds — Domain inquiry"
    },
    vi: {
      general: "Liên hệ KhaiBuilds",
      website: "KhaiBuilds — Yêu cầu website cá nhân",
      android: "KhaiBuilds — Yêu cầu Android app",
      domain: "KhaiBuilds — Trao đổi tên miền"
    }
  } as const;
  return `${CONTACT_MAILTO}?subject=${encodeURIComponent(subjects[locale][kind])}`;
}

/** Generates an editable email draft for a specific domain opportunity. */
export function domainInquiryMailto(domain: string, kind: "collaboration" | "leasing-or-transfer", locale: "en" | "vi"): string {
  const subject = locale === "vi"
    ? `KhaiBuilds — ${kind === "collaboration" ? "Hợp tác khai thác" : "Cho thuê hoặc chuyển nhượng"} — ${domain}`
    : `KhaiBuilds — ${kind === "collaboration" ? "Collaboration" : "Lease or Transfer"} — ${domain}`;
  const body = locale === "vi"
    ? `Xin chào KhaiBuilds,\n\nTôi muốn trao đổi về ${domain}.\n\nĐề xuất của tôi:\n\n`
    : `Hello KhaiBuilds,\n\nI'd like to inquire about ${domain}.\n\nMy proposal:\n\n`;
  return `${CONTACT_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
