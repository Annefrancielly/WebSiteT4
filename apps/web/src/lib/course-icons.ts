import {
    FileText,
    MessageCircle,
    Play,
    ShieldCheck,
    type LucideIcon,
  } from "lucide-react";
  import type { CourseFeatureIconKey } from "@/types/public-api";
  
  export const COURSE_FEATURE_ICONS: Record<CourseFeatureIconKey, LucideIcon> = {
    Play,
    FileText,
    MessageCircle,
    ShieldCheck,
  };
  