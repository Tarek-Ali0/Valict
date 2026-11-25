/**
 * أنواع بيانات الـ dictionary (en.json / ar.json).
 *
 * [إصلاح lint] كل الـ components كانت بتستلم `dict: any` (10 مواضع
 * @typescript-eslint/no-explicit-any). بدل ما نكتب `any` أو نعمل
 * eslint-disable، عرّفنا الـ structure الحقيقي هنا مرة واحدة.
 *
 * الـ en.json و ar.json متطابقين 100% (45 leaf key في كل واحد — اتأكدنا
 * بسكربت مقارنة)، فنوع واحد بيكفي للاتنين.
 *
 * ملاحظة: getDictionary بيرجع Promise<typeof en> بسبب resolveJsonModule،
 * و typeof en متوافق هيكليًا مع Dictionary ده (كل الحقول موجودة).
 */

export interface NavDict {
  changeLanguage: string;
  toggleTheme: string;
  getStarted: string;
  services: string;
  whyValict: string;
  aboutUs: string;
  faq: string;
}

export interface HeroDict {
  badge: string;
  companyName: string;
  title1: string;
  title2: string;
  subheadline: string;
  cta: string;
  /**
   * حقل اختياري: غير موجود في en.json/ar.json الحاليين — الـ Hero بيعمل
   * fallback لـ dict.about.text لما يكون ناقص.
   */
  description?: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  slug: string;
}

export interface ServicesDict {
  subtitle: string;
  title: string;
  highlight: string;
  description: string;
  learnMore: string;
  items: ServiceItem[];
}

export interface WhyPoint {
  title: string;
  desc: string;
}

export interface WhyDict {
  title: string;
  uptime: string;
  uptimeLabel: string;
  headline: string;
  points: WhyPoint[];
}

export interface AboutDict {
  title: string;
  text: string;
}

export interface HowStep {
  title: string;
  desc: string;
}

export interface HowDict {
  subtitle: string;
  title: string;
  steps: HowStep[];
}

export interface CtaDict {
  headline: string;
  sub: string;
  button: string;
}

export interface ContactDict {
  email: string;
  phone: string;
}

export interface FooterDict {
  about: string;
  badge: string;
  quickLinks: string;
  contactUs: string;
  emailLabel: string;
  phoneLabel: string;
  copyright: string;
  /**
   * حقول اختيارية: غير موجودة في الـ JSON الحاليين — الـ Footer بيعمل
   * fallback لقيم مدمجة في الكود (عربي/إنجليزي) لما تكون ناقصة.
   */
  values?: string[];
  valuesTitle?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface FaqDict {
  title: string;
  subtitle: string;
  categories: FaqCategory[];
}

export interface Dictionary {
  nav: NavDict;
  hero: HeroDict;
  services: ServicesDict;
  why: WhyDict;
  about: AboutDict;
  how: HowDict;
  cta: CtaDict;
  contact: ContactDict;
  footer: FooterDict;
  faq: FaqDict;
}
