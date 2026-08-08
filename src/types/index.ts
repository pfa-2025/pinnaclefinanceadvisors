import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  index: string;
  title: string;
  description: string;
  longDescription?: string;
  benefits: string[];
  image: string;
  metric: string;
}

export interface Advisor {
  slug: string;
  name: string;
  role: string;
  bio: string;
  specializations: string[];
  image: string;
  email: string;
  phone: string;
}

export interface Insight {
  slug: string;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  body: string[];
}

export interface Stat {
  label: string;
  value: string;
  detail: string;
}

export interface GalleryItem {
  id: string;
  title?: string | null;
  category?: string | null;
  caption?: string | null;
  mediaType: "IMAGE" | "VIDEO";
  imageUrl?: string | null;
  videoUrl?: string | null;
}

export interface Testimonial {
  id: string;
  clientName?: string | null;
  clientTitle?: string | null;
  clientImageUrl?: string | null;
  quote: string;
  featured: boolean;
}

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
}
