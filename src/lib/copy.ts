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
    explore:"Explore services",seeWork:"View work",viewDetails:"Learn more",
    whatWeDo:"Services & domains",
    approach:"How service projects work",
    scopeTitle:"Typically included",exclusionsTitle:"Outside the basic scope",
    inquire:"Send an inquiry",backToServices:"View all services",
    steps:[
      {title:"Discuss your needs",detail:"Describe the goal, who will use it and the essential features."},
      {title:"Agree on the scope",detail:"Confirm the work, estimated cost, timeline and handover."},
      {title:"Build and hand over",detail:"Build, test and deliver the agreed result."}
    ],
    pages:{
      home:{"eyebrow":"Independent digital studio","title":"Building ideas into digital assets.","description":"KhaiBuilds develops personal websites and simple Android apps, and connects people with opportunities for collaboration.","label":"Explore KhaiBuilds","paragraphs":[]},
      services:{"eyebrow":"Services","title":"Small builds for specific needs.","description":"Explore personal websites and small custom Android apps. Each project is scoped to what it needs to do.","label":"Choose a service","paragraphs":[]},
      projects:{"eyebrow":"Portfolio","title":"Work & experiments.","description":"Websites, Android tools and other digital projects will be shared here with their development stage clearly noted.","label":"Projects","paragraphs":[]},
      domains:{"eyebrow":"Domains","title":"Explore domain opportunities.","description":"Selected domain names available for collaboration, leasing or transfer discussions. Terms are agreed separately.","label":"Domain opportunities","paragraphs":[]},
      about:{"eyebrow":"About KhaiBuilds","title":"Independent work, focused on useful ideas.","description":"KhaiBuilds is a personal portfolio for digital and creative work, alongside a small set of services and domain opportunities.","label":"A focused approach","paragraphs":["Projects range from simple personal websites to Android utilities and new digital ideas.","The approach is straightforward: understand the need, agree on a manageable scope and be clear about what will be delivered."]},
      collaborate:{"eyebrow":"Collaboration","title":"Explore an idea together.","description":"Have a digital project or a domain proposal that could benefit from working together?","label":"Open to proposals","paragraphs":["KhaiBuilds can consider focused projects, joint ideas and discussions about selected domain names.","Send a short outline by email. Any next steps, responsibilities and commercial terms would be agreed separately."]},
      contact:{"eyebrow":"Contact","title":"Have something in mind?","description":"Email KhaiBuilds about a personal website, a small Android app or a domain opportunity.","label":"Start with the essentials","paragraphs":["Share what you need, who will use it and your expected timeline. Please do not send passwords or sensitive personal information."]},
      privacy:{"eyebrow":"Privacy · draft","title":"How information is handled.","description":"This static website has no contact forms, accounts, payments or marketing analytics.","label":"Website and email","paragraphs":["If you email hi@khaibuilds.com, your email address and message are handled by the email providers involved so the inquiry can be read and answered.","Hosting providers may process technical connection data. The website stores a selected language preference in your browser and may remember when a language suggestion is dismissed. This notice is being reviewed; for privacy questions or requests, email hi@khaibuilds.com."]},
      terms:{"eyebrow":"Terms · draft","title":"Terms of use.","description":"The information on this website is for discussion and does not create a binding offer.","label":"Services and domains","paragraphs":["Any website or Android project requires separate agreement on scope, price, delivery, ownership and support.","Domain availability can change. Any transfer, lease or partnership requires separate verification and agreement. These terms remain under review and do not replace an individual written contract."]}
    }
  },
  vi:{
    nav:{services:"Dịch vụ",projects:"Dự án",domains:"Tên miền",about:"Giới thiệu"},
    contact:"Liên hệ",preview:"Bản xem trước · Đang hoàn thiện dịch vụ",
    privacy:"Quyền riêng tư",terms:"Điều khoản",language:"Ngôn ngữ",
    langHint:"Có phiên bản tiếng Anh",stay:"Giữ tiếng Việt",change:"Chuyển sang English",
    explore:"Xem dịch vụ",seeWork:"Xem dự án",viewDetails:"Chi tiết",
    whatWeDo:"Dịch vụ & tên miền",approach:"Quy trình triển khai dịch vụ",
    scopeTitle:"Thường bao gồm",exclusionsTitle:"Chưa bao gồm",
    inquire:"Gửi yêu cầu",backToServices:"Xem tất cả dịch vụ",
    steps:[
      {title:"Trao đổi nhu cầu",detail:"Chia sẻ mục đích và những tính năng cần thiết."},
      {title:"Thống nhất phạm vi",detail:"Xác định công việc, chi phí, thời gian dự kiến và cách bàn giao."},
      {title:"Triển khai và bàn giao",detail:"Xây dựng, kiểm thử và bàn giao theo thỏa thuận."}
    ],
    pages:{
      home:{"eyebrow":"Studio số độc lập","title":"Biến ý tưởng thành tài sản số.","description":"KhaiBuilds phát triển website cá nhân, ứng dụng Android đơn giản và kết nối những cơ hội hợp tác.","label":"Khám phá KhaiBuilds","paragraphs":[]},
      services:{"eyebrow":"Dịch vụ","title":"Giải pháp gọn cho nhu cầu cụ thể.","description":"Website cá nhân và ứng dụng Android đơn giản, được xây dựng theo mục đích sử dụng rõ ràng.","label":"Chọn dịch vụ","paragraphs":[]},
      projects:{"eyebrow":"Portfolio","title":"Dự án và thử nghiệm.","description":"Nơi giới thiệu website, ứng dụng Android và những sản phẩm số khác, kèm trạng thái phát triển cụ thể.","label":"Danh mục dự án","paragraphs":[]},
      domains:{"eyebrow":"Tên miền","title":"Cơ hội từ tên miền.","description":"Tên miền ưu tiên hợp tác khai thác, cho thuê hoặc chuyển nhượng. Phương án thực hiện được trao đổi riêng.","label":"Danh mục cơ hội tên miền","paragraphs":[]},
      about:{"eyebrow":"Giới thiệu","title":"Một dự án độc lập, tập trung vào điều hữu ích.","description":"KhaiBuilds là portfolio cá nhân về công việc số và sáng tạo, bên cạnh các dịch vụ nhỏ và cơ hội từ tên miền.","label":"Cách KhaiBuilds làm việc","paragraphs":["Các dự án có thể là website cá nhân, tiện ích Android hoặc một ý tưởng số đang được phát triển.","Mỗi công việc bắt đầu từ nhu cầu cụ thể, với phạm vi vừa sức và cách bàn giao rõ ràng."]},
      collaborate:{"eyebrow":"Hợp tác","title":"Cùng trao đổi một ý tưởng.","description":"Bạn có dự án số hoặc đề xuất về tên miền muốn phát triển cùng KhaiBuilds?","label":"Đề xuất hợp tác","paragraphs":["KhaiBuilds có thể xem xét những dự án nhỏ, ý tưởng phát triển chung và cơ hội hợp tác liên quan đến tên miền.","Hãy gửi mô tả ngắn qua email. Trách nhiệm, phương án triển khai và điều kiện hợp tác sẽ được trao đổi riêng."]},
      contact:{"eyebrow":"Liên hệ","title":"Bạn đang có ý tưởng gì?","description":"Gửi email để trao đổi về website cá nhân, ứng dụng Android nhỏ hoặc tên miền.","label":"Chia sẻ nhu cầu của bạn","paragraphs":["Cho biết bạn cần gì, ai sẽ sử dụng và thời gian dự kiến. Không gửi mật khẩu hoặc thông tin cá nhân nhạy cảm."]},
      privacy:{"eyebrow":"Quyền riêng tư · bản nháp","title":"Thông tin được xử lý như thế nào?","description":"Website tĩnh này không có biểu mẫu liên hệ, tài khoản, thanh toán hay công cụ phân tích tiếp thị.","label":"Website và email","paragraphs":["Nếu bạn gửi thư đến hi@khaibuilds.com, địa chỉ và nội dung thư sẽ được các nhà cung cấp email liên quan xử lý để tiếp nhận và phản hồi yêu cầu.","Nhà cung cấp hạ tầng có thể xử lý dữ liệu kết nối kỹ thuật. Website có thể lưu lựa chọn ngôn ngữ và trạng thái đóng gợi ý ngôn ngữ trong trình duyệt. Thông báo này đang được rà soát; mọi câu hỏi hoặc yêu cầu về dữ liệu có thể gửi đến hi@khaibuilds.com."]},
      terms:{"eyebrow":"Điều khoản · bản nháp","title":"Điều khoản sử dụng.","description":"Thông tin trên website nhằm giới thiệu và trao đổi, chưa phải đề nghị giao kết có hiệu lực.","label":"Dịch vụ và tên miền","paragraphs":["Các dự án website hoặc Android cần thỏa thuận riêng về phạm vi, chi phí, bàn giao, quyền sở hữu và hỗ trợ.","Tình trạng tên miền có thể thay đổi. Việc chuyển nhượng, cho thuê hoặc hợp tác cần xác minh và thỏa thuận riêng. Nội dung điều khoản này đang được rà soát và không thay thế hợp đồng cụ thể."]}
    }
  }
};
