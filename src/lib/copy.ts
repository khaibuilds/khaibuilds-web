export type Locale = "en" | "vi";
export type Section =
  | "home" | "services" | "projects" | "domains" | "about"
  | "collaborate" | "contact" | "privacy" | "terms";

const sectionPaths: Record<Section, string> = {
  home: "",
  services: "services",
  projects: "projects",
  domains: "domains",
  about: "about",
  collaborate: "collaborate",
  contact: "contact",
  privacy: "privacy",
  terms: "terms"
};
export const sections = Object.keys(sectionPaths) as Section[];
export function pageHref(section: Section, locale: Locale): string {
  const lang = locale === "vi" ? "/vi" : "";
  const path = sectionPaths[section];
  return path ? `${lang}/${path}/` : `${lang}/`;
}

type Page = {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
  paragraphs: string[];
  included?: string[];
  notIncluded?: string[];
};
type Dictionary = {
  nav: { services:string; projects:string; domains:string; about:string };
  contact: string; preview: string;
  privacy: string; terms: string; language: string;
  langHint: string; stay: string; change: string;
  explore: string; seeWork: string; viewDetails: string;
  whatWeDo: string; approach: string; scopeTitle: string;
  exclusionsTitle: string; inquire: string; backToServices: string;
  steps: { title:string; detail:string }[];
  pages: Record<Section,Page>;
};

export const content: Record<Locale,Dictionary> = {
  en: {
    nav: { services:"Services", projects:"Work", domains:"Domains", about:"About" },
    contact:"Contact", preview:"Preview site · Service details under review",
    privacy:"Privacy",terms:"Terms",language:"Language",
    langHint:"Vietnamese available",stay:"Keep English",change:"Switch to Vietnamese",
    explore:"Explore services",seeWork:"View selected work",viewDetails:"Learn more",
    whatWeDo:"Core web services",
    approach:"How service projects work",
    scopeTitle:"Typically included",exclusionsTitle:"Outside the basic scope",
    inquire:"Send an inquiry",backToServices:"View all services",
    steps:[
      {title:"Describe the task",detail:"Share what is wrong or needed and the expected result."},
      {title:"Agree on the scope",detail:"Agree on changes, delivery, price and revision limits before starting."},
      {title:"Implement and verify",detail:"Make the agreed change, test it and hand it over with clear notes."}
    ],
    pages:{
      home:{"eyebrow":"Independent Web Builder","title":"Practical web fixes. Lightweight tools. Clear delivery.","description":"KhaiBuilds helps with specific HTML, CSS and JavaScript issues, small browser-based tools, and maintenance for static websites. Each task is scoped, tested and handed over clearly.","label":"Explore web services","paragraphs":[]},
      services:{"eyebrow":"Services","title":"Focused web services for specific tasks.","description":"Bug fixes, small JavaScript tools and static-site updates with clearly agreed requirements and handover. Small personal websites and Android utilities are considered selectively.","label":"Choose a service","paragraphs":[]},
      projects:{"eyebrow":"Portfolio","title":"Selected self-developed work.","description":"Three independently developed projects showing browser utilities, a bilingual static website and a focused web product.","label":"Published project examples","paragraphs":["These are self-developed projects, not paid client commissions or customer testimonials. Project links let you explore the work.","Some production source code is private. Public source links are shown only when the repository is publicly accessible."]},
      domains:{"eyebrow":"Domains","title":"Explore domain opportunities.","description":"Selected domain names available for collaboration, leasing or transfer discussions. Terms are agreed separately.","label":"Domain opportunities","paragraphs":[]},
      about:{"eyebrow":"About KhaiBuilds","title":"Independent work. Defined scope. Clear handover.","description":"KhaiBuilds is an independent web-building portfolio focused on practical, manageable tasks and self-developed digital tools.","label":"How I work","paragraphs":["I focus on specific web fixes, small JavaScript utilities and static website maintenance, with simple personal sites and Android utilities considered selectively.","My portfolio features self-developed web projects demonstrating practical implementation and deployment. They are not paid client commissions. For new work, scope, testing and handover are agreed before starting."]},
      collaborate:{"eyebrow":"Collaboration","title":"Discuss a focused collaboration.","description":"Have a specific digital project or domain partnership proposal?","label":"Open to proposals","paragraphs":["KhaiBuilds considers defined digital tasks and separate domain partnership discussions, without an open-ended commitment to develop every idea.","Send a short outline by email. Responsibilities, deliverables and commercial terms require a separate agreement."]},
      contact:{"eyebrow":"Contact","title":"Tell me about your web task.","description":"Email KhaiBuilds about a specific web fix, small browser tool or static-site update. Simple personal sites, small Android utilities and domain proposals are considered separately.","label":"Start with the essentials","paragraphs":["Send a page or repository link (if shareable), what is wrong or needed, the expected result and any deadline. Please do not send passwords or sensitive personal information."]},
      privacy:{"eyebrow":"Privacy · draft","title":"How information is handled.","description":"This static website has no contact forms, accounts, payments or marketing analytics.","label":"Website and email","paragraphs":["If you email hi@khaibuilds.com, your email address and message are handled by the email providers involved so the inquiry can be read and answered.","Hosting providers may process technical connection data. The website stores a selected language preference in your browser and may remember when a language suggestion is dismissed. This notice is being reviewed; for privacy questions or requests, email hi@khaibuilds.com."]},
      terms:{"eyebrow":"Terms · draft","title":"Terms of use.","description":"The information on this website is for discussion and does not create a binding offer.","label":"Services and domains","paragraphs":["Any website or Android project requires separate agreement on scope, price, delivery, ownership and support.","Domain availability can change. Any transfer, lease or partnership requires separate verification and agreement. These terms remain under review and do not replace an individual written contract."]}
    }
  },
  vi:{
    nav:{services:"Dịch vụ",projects:"Dự án",domains:"Tên miền",about:"Giới thiệu"},
    contact:"Liên hệ",preview:"Bản xem trước · Đang hoàn thiện dịch vụ",
    privacy:"Quyền riêng tư",terms:"Điều khoản",language:"Ngôn ngữ",
    langHint:"Có phiên bản tiếng Anh",stay:"Giữ tiếng Việt",change:"Chuyển sang English",
    explore:"Xem dịch vụ",seeWork:"Xem dự án tiêu biểu",viewDetails:"Chi tiết",
    whatWeDo:"Dịch vụ web chính",approach:"Quy trình triển khai dịch vụ",
    scopeTitle:"Thường bao gồm",exclusionsTitle:"Chưa bao gồm",
    inquire:"Gửi yêu cầu",backToServices:"Xem tất cả dịch vụ",
    steps:[
      {title:"Mô tả công việc",detail:"Nêu lỗi hoặc yêu cầu và kết quả mong muốn."},
      {title:"Thống nhất phạm vi",detail:"Chốt thay đổi, cách bàn giao, chi phí và số vòng sửa trước khi làm."},
      {title:"Thực hiện và kiểm chứng",detail:"Sửa hoặc xây dựng, kiểm tra và bàn giao kèm ghi chú rõ ràng."}
    ],
    pages:{
      home:{"eyebrow":"Người phát triển web độc lập","title":"Sửa lỗi web. Công cụ gọn. Bàn giao rõ ràng.","description":"KhaiBuilds tập trung sửa lỗi HTML, CSS, JavaScript cụ thể, xây dựng tiện ích nhỏ chạy trên trình duyệt và cập nhật, bảo trì website tĩnh. Mỗi công việc có phạm vi, kiểm thử và bàn giao rõ ràng.","label":"Dịch vụ web","paragraphs":[]},
      services:{"eyebrow":"Dịch vụ","title":"Dịch vụ web tập trung vào công việc cụ thể.","description":"Sửa lỗi web, tiện ích JavaScript nhỏ và bảo trì website tĩnh, với yêu cầu và bàn giao rõ ràng. Website cá nhân và tiện ích Android được xem xét có chọn lọc.","label":"Chọn dịch vụ","paragraphs":[]},
      projects:{"eyebrow":"Portfolio","title":"Sản phẩm tự phát triển tiêu biểu.","description":"Ba dự án tự phát triển minh họa tiện ích trình duyệt, website tĩnh song ngữ và sản phẩm web có phạm vi rõ.","label":"Các dự án đã triển khai","paragraphs":["Đây là các dự án tự phát triển, không phải dự án khách hàng trả phí hoặc lời chứng thực của khách hàng. Có thể xem sản phẩm qua liên kết công khai.","Một số mã nguồn production được giữ riêng tư. Chỉ hiển thị liên kết mã nguồn khi repo đã được công khai."]},
      domains:{"eyebrow":"Tên miền","title":"Cơ hội từ tên miền.","description":"Tên miền ưu tiên hợp tác khai thác, cho thuê hoặc chuyển nhượng. Phương án thực hiện được trao đổi riêng.","label":"Danh mục cơ hội tên miền","paragraphs":[]},
      about:{"eyebrow":"Giới thiệu","title":"Làm việc độc lập. Phạm vi rõ. Bàn giao minh bạch.","description":"KhaiBuilds là hồ sơ năng lực phát triển web độc lập, tập trung vào công việc thiết thực, vừa sức và các công cụ số tự phát triển.","label":"Cách tôi làm việc","paragraphs":["Tôi tập trung sửa lỗi web, tiện ích JavaScript nhỏ và bảo trì website tĩnh; website cá nhân và tiện ích Android được xem xét có chọn lọc.","Portfolio giới thiệu các sản phẩm web tự phát triển đã triển khai, minh họa quá trình xây dựng và phát hành. Đây không phải dự án khách hàng trả phí. Với công việc mới, phạm vi, kiểm thử và bàn giao được thống nhất trước khi bắt đầu."]},
      collaborate:{"eyebrow":"Hợp tác","title":"Trao đổi một đề xuất cụ thể.","description":"Bạn có công việc số rõ phạm vi hoặc đề xuất hợp tác về tên miền?","label":"Đề xuất hợp tác","paragraphs":["KhaiBuilds xem xét công việc số đã xác định phạm vi và những cơ hội hợp tác tên miền riêng biệt; không cam kết nhận mọi ý tưởng chưa rõ yêu cầu.","Hãy gửi mô tả ngắn qua email. Trách nhiệm, kết quả bàn giao và điều kiện thương mại cần được thỏa thuận riêng."]},
      contact:{"eyebrow":"Liên hệ","title":"Chia sẻ công việc web bạn cần hỗ trợ.","description":"Gửi email về lỗi web cụ thể, tiện ích trình duyệt hoặc cập nhật website tĩnh. Website cá nhân, tiện ích Android nhỏ và đề xuất tên miền được xem xét riêng.","label":"Chia sẻ nhu cầu của bạn","paragraphs":["Gửi liên kết trang hoặc kho mã (nếu có thể chia sẻ), mô tả lỗi hoặc yêu cầu, kết quả mong muốn và thời hạn nếu có. Không gửi mật khẩu hoặc thông tin nhạy cảm."]},
      privacy:{"eyebrow":"Quyền riêng tư · bản nháp","title":"Thông tin được xử lý như thế nào?","description":"Website tĩnh này không có biểu mẫu liên hệ, tài khoản, thanh toán hay công cụ phân tích tiếp thị.","label":"Website và email","paragraphs":["Nếu bạn gửi thư đến hi@khaibuilds.com, địa chỉ và nội dung thư sẽ được các nhà cung cấp email liên quan xử lý để tiếp nhận và phản hồi yêu cầu.","Nhà cung cấp hạ tầng có thể xử lý dữ liệu kết nối kỹ thuật. Website có thể lưu lựa chọn ngôn ngữ và trạng thái đóng gợi ý ngôn ngữ trong trình duyệt. Thông báo này đang được rà soát; mọi câu hỏi hoặc yêu cầu về dữ liệu có thể gửi đến hi@khaibuilds.com."]},
      terms:{"eyebrow":"Điều khoản · bản nháp","title":"Điều khoản sử dụng.","description":"Thông tin trên website nhằm giới thiệu và trao đổi, chưa phải đề nghị giao kết có hiệu lực.","label":"Dịch vụ và tên miền","paragraphs":["Các dự án website hoặc Android cần thỏa thuận riêng về phạm vi, chi phí, bàn giao, quyền sở hữu và hỗ trợ.","Tình trạng tên miền có thể thay đổi. Việc chuyển nhượng, cho thuê hoặc hợp tác cần xác minh và thỏa thuận riêng. Nội dung điều khoản này đang được rà soát và không thay thế hợp đồng cụ thể."]}
    }
  }
};
