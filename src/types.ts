export type TabType = 
  | 'content-strategy'
  | 'video-creator'
  | 'initiatives'
  | 'complaints-triage'
  | 'prompt-studio'
  | 'co-pilot'
  | 'analytics-dashboard'
  | 'media-library'
  | 'digital-roadmap';

export interface InitiativeGalleryItem {
  id: string;
  title: string;
  category: 'القوافل الطبية' | 'معارض السلع' | 'بطولات الشباب' | 'تكريم الحفظة' | 'خدمة المواطنين' | 'مبادرات خدمية';
  location: string;
  date: string;
  beneficiaries: string;
  imageUrl: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  caption: string;
  tags: string[];
}

export interface PromoImageResult {
  title: string;
  subtitle: string;
  visualConcept: string;
  suggestedColors: string[];
  partyBranding: string;
  promptEnglish: string;
  imageUrl?: string | null;
}

export interface VideoScene {
  sceneNumber: number;
  narrationText: string;
  visualDescription: string;
  imageKeyword: string;
  duration: string;
  previewImageUrl?: string;
}

export interface VideoScript {
  id?: string;
  title: string;
  hook: string;
  targetPlatform: string;
  durationSeconds: number;
  scenes: VideoScene[];
  backgroundMusic: string;
  hashtags: string[];
  voiceoverTone: string;
  createdAt?: string;
}

export interface ContentPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  shareabilityScore: number;
  monthlyReach: string;
  color: string;
  samplePostsCount: number;
}

export interface GeneratedPost {
  title: string;
  content: string;
  keyMetrics: string[];
  visualPrompt: string;
  suggestedChannels: string[];
  createdAt: string;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  months: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  progressPercentage: number;
  description: string;
  milestones: {
    title: string;
    description: string;
    completed: boolean;
  }[];
  leadDepartment?: string;
}

export interface WorkforceTraining {
  id?: string;
  programTitle: string;
  targetAudience: string;
  duration: string;
  traineesCount: number;
  status: 'مكتملة' | 'جارية الآن' | 'مخطط';
}

export interface CitizenComplaint {
  id: string;
  citizenName: string;
  phone: string;
  district: string;
  category: string;
  complaintText: string;
  dateSubmitted: string;
  status: 'جديد' | 'قيد المتابعة' | 'تم التوجيه' | 'مكتمل';
  priority: 'حرج' | 'عاجل' | 'عادي';
  priorityScore: number;
  assignedDepartment: string;
  estimatedSLAHours: number;
  summary?: string;
  recommendedAction?: string;
  citizenResponseDraft?: string;
}

export interface SamanoudDistrict {
  name: string;
  type: 'مدينة' | 'وحدة محلية';
  population: string;
  activeComplaints: number;
  resolvedPercentage: number;
}

export interface PromptTemplate {
  id: string;
  category: 'أزمات' | 'إعلام' | 'استبيانات' | 'تقارير';
  title: string;
  description: string;
  promptText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface VolunteerMember {
  id: string;
  name: string;
  role: string;
  district: string;
  volunteerHours: number;
  initiativesAttended: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    color: string;
    description: string;
  }[];
  avatar: string;
  skills: string[];
  joinDate: string;
  rank: number;
}

export interface PartyNewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'القومية' | 'أمانة سمنود' | 'توجيهات إعلامية';
  date: string;
  imageUrl: string;
  isImportant?: boolean;
  author?: string;
}

export interface TalentVolunteer {
  id: string;
  fullName: string;
  district: string;
  phone: string;
  primarySkill: 'طبي وصحي' | 'تنظيم وإدارة الفعاليات' | 'إعلام وصناعة محتوى' | 'استشارات قانونية' | 'تكنولوجيا ومعلومات' | 'عمل ميداني وتكافل';
  secondarySkills: string[];
  experienceLevel: 'مبتدئ' | 'متوسط' | 'خبير / قائد ميداني';
  status: 'متاح للتكليف' | 'مكلف بمبادرة' | 'في تدريب قيادي';
  notes?: string;
  registeredDate: string;
}
