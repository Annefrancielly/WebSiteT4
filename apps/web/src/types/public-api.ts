export type CourseFeatureIconKey =
  | "Play"
  | "FileText"
  | "MessageCircle"
  | "ShieldCheck";

export interface CourseFeatureDto {
  iconKey: CourseFeatureIconKey;
  title: string;
  desc: string;
}

export interface CourseDetailDto {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  videoThumb: string;
  rating: string;
  students: string;
  duration: string;
  instructor: string;
  price: number;
  oldPrice: number | null;
  installments: string;
  offerBadge: string;
  tags: string[];
  checkoutLink: string;
  features: CourseFeatureDto[];
}

export interface SurfTripDto {
    id: string;
    slug: string;
    title: string;
    location: string;
    dateRange: string;
    duration: string;
    totalSlots?: number;
    remainingSlots: number;
    price: number | string;
    description: string;
    about?: string | null;
    image: string;
    levelLabel?: string | null;
    includes: string[];
  }
  
