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

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
}
