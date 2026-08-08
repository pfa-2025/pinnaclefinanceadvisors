import { Facebook, Instagram, Youtube } from "lucide-react";

import { TikTokIcon } from "@/components/icons/tiktok-icon";

export const contactDetails = {
  address: "220 Davidson Avenue, Somerset, NJ",
  phone: "(908) 555-0100",
  email: "hello@pinnaclefinanceadvisors.com",
  calendlyUrl: "https://calendly.com/pfallc/30-minute-meeting",
} as const;

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/pfa2day/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61567263463659", icon: Facebook },
  { label: "TikTok", href: "https://www.tiktok.com/@pfa2day?lang=en", icon: TikTokIcon },
  { label: "YouTube", href: "https://www.youtube.com/@PfaRitulShah", icon: Youtube },
] as const;
