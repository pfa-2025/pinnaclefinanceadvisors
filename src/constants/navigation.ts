import {
  BarChart3,
  BriefcaseBusiness,
  CalendarRange,
  FileText,
  FolderKanban,
  GalleryHorizontalEnd,
  ImageIcon,
  LayoutGrid,
  MessageSquareQuote,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { AdminNavItem, NavItem } from "@/types";

export const websiteNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expertise", href: "/expertise" },
  { label: "Advisors", href: "/advisors" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const adminNavigation: AdminNavItem[] = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutGrid },
  { label: "Pages", href: "/admin/dashboard/pages", icon: FileText },
  { label: "Services", href: "/admin/dashboard/services", icon: BriefcaseBusiness },
  { label: "Advisors", href: "/admin/dashboard/advisors", icon: Users },
  { label: "Insights", href: "/admin/dashboard/insights", icon: Newspaper },
  { label: "Gallery", href: "/admin/dashboard/gallery", icon: GalleryHorizontalEnd },
  { label: "Categories", href: "/admin/dashboard/categories", icon: FolderKanban },
  { label: "Testimonials", href: "/admin/dashboard/testimonials", icon: MessageSquareQuote },
  { label: "Enquiries", href: "/admin/dashboard/enquiries", icon: Search },
  { label: "Consultations", href: "/admin/dashboard/consultations", icon: CalendarRange },
  { label: "Media", href: "/admin/dashboard/media", icon: ImageIcon },
  { label: "SEO", href: "/admin/dashboard/seo", icon: BarChart3 },
  { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  { label: "Administrators", href: "/admin/dashboard/administrators", icon: ShieldCheck },
];
