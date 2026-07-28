export interface SamanoudPhotoAsset {
  id: string;
  title: string;
  category: 'logos' | 'leadership' | 'field' | 'training' | 'architecture' | 'awards';
  categoryLabel: string;
  description: string;
  imageUrl: string;
  usageTags: string[];
  dateAdded: string;
  isPrimaryLogo?: boolean;
}

// Photo URLs referencing official uploaded asset visuals and styled representations
export const SAMANOUD_PHOTO_LIBRARY: SamanoudPhotoAsset[] = [
  {
    id: 'photo-emblem-metallic',
    title: 'الشعار المعدني الفضي - د. ياسر السعيد الصعيدي',
    category: 'logos',
    categoryLabel: 'الشعارات والأختام',
    description: 'الشعار المعدني البارز الرسمي باسم د. ياسر السعيد الصعيدي • أمين التدريب والتثقيف بحزب مستقبل وطن.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    usageTags: ['شعار المنصة', 'الهوية البصرية', 'الترويسات الرسمية', 'شهادات التقدير'],
    dateAdded: '2026-07-27',
    isPrimaryLogo: true,
  },
  {
    id: 'photo-badge-secretariat',
    title: 'درع أمانة التدريب والتثقيف - مركز سمنود',
    category: 'logos',
    categoryLabel: 'الشعارات والأختام',
    description: 'الشعار الدائري الأزرق بجمهورية مصر العربية ونسر مستقبل وطن لأمانة سمنود - محافظة الغربية.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    usageTags: ['باجات الأمانة', 'تطبيق المواطن', 'اللافتات الميدانية'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-stamp-seal',
    title: 'الختم الأزرق المعتمد للمستندات',
    category: 'logos',
    categoryLabel: 'الشعارات والأختام',
    description: 'الختم الأزرق الرسمي المعتمد لتوثيق الشهادات والقرارات التنفيذية ومراسلات أمانة التدريب.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
    usageTags: ['الاعتماد التنفيذي', 'سجل التدقيق', 'المستندات الرسمية'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-fabric-patch',
    title: 'شعار القماش المطرز للزي الميداني',
    category: 'logos',
    categoryLabel: 'الشعارات والأختام',
    description: 'شارة القماش المطرزة المخصصة لقمصان وكابات كوادر أمانة التدريب وشباب سمنود.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    usageTags: ['الزي الميداني', 'قمصان الشباب', 'القوافل الميدانية'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-mindmap-architecture',
    title: 'مخطط المعمارية المؤسسية (SamanoudOS MindMap)',
    category: 'architecture',
    categoryLabel: 'البنية المعمارية',
    description: 'المخطط الذهني الهيكلي المتكامل لمجالات وأبعاد التحول الرقمي والحوكمة لمنظومة شارك سمنود 2030.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    usageTags: ['Executive Matrix', 'العرض القيادي', 'توثيق النظام'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-youth-delegation-bus',
    title: 'وفد شباب سمنود بقمصان الحزب وأعلم مصر',
    category: 'field',
    categoryLabel: 'النزول الميداني والشباب',
    description: 'صورة جماعية لشباب وكوادر حزب مستقبل وطن بسمنود بالتيشرتات والكابات الرسمية يحملون علم مصر أمام حافلة المبادرات.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    usageTags: ['الفعاليات الميدانية', 'أخبار الحزب', 'فيديوهات الشباب'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-dr-yasser-leadership-meeting',
    title: 'اجتماع القيادة التنفيذية - د. ياسر السعيد الصعيدي',
    category: 'leadership',
    categoryLabel: 'القيادة والاجتماعات',
    description: 'لقاء رفيع المستوى يجمع د. ياسر السعيد الصعيدي مع أمين المحافظة وقيادات الحزب لمتابعة سير المبادرات.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80',
    usageTags: ['البيانات الصحفية', 'التقارير الأسبوعية', 'القيادة السياسية'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-dr-yasser-trophies',
    title: 'دروع التميز - د. ياسر السعيد الصعيدي (2014 - 2026)',
    category: 'awards',
    categoryLabel: 'التكريم والدروع',
    description: 'تكريم د. ياسر السعيد الصعيدي بحصوله على دروع التميز والاعتماد المؤسسي في التطوير الإداري والتدريب.',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&auto=format&fit=crop&q=80',
    usageTags: ['السيرة الذاتية', 'الملف القيادي', 'لوحة الشرف'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-training-hall-session',
    title: 'جلسات قاعة التدريب والتثقيف بمقر سمنود',
    category: 'training',
    categoryLabel: 'التدريب والتثقيف',
    description: 'لقاءات الدورة التدريبية لأعضاء الهيئة والشباب بداخل قاعة التفاعل الرقمي المجهزة بمقر الحزب بسمنود.',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80',
    usageTags: ['LMS Hub', 'دورات الكوادر', 'بناء القدرات'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-dr-yasser-lecture-presentation',
    title: 'محاضرات د. ياسر الصعيدي وشاشات العرض الذكية',
    category: 'training',
    categoryLabel: 'التدريب والتثقيف',
    description: 'د. ياسر السعيد الصعيدي أثناء شرح استراتيجيات الإدارة الحديثة والتحول الرقمي أمام شاشات العرض.',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80',
    usageTags: ['استوديو الفيديوهات', 'المحتوى التثقيفي', 'المناعة الرقمية'],
    dateAdded: '2026-07-27',
  },
  {
    id: 'photo-vip-conference-hall',
    title: 'مشاركة د. ياسر الصعيدي بالمؤتمرات الوطنية',
    category: 'leadership',
    categoryLabel: 'القيادة والاجتماعات',
    description: 'حضور د. ياسر السعيد الصعيدي في المنصة الرئيسية واللقاءات الرسمية للمؤتمرات القومية.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop&q=80',
    usageTags: ['المؤتمرات القومية', 'التغطية الإعلامية', 'الأخبار الرسمية'],
    dateAdded: '2026-07-27',
  },
];
