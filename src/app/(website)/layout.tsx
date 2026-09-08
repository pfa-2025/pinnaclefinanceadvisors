import type { ReactNode } from "react";

import { contactDetails, socialLinks } from "@/constants/contact";
import { websiteNavigation } from "@/constants/navigation";
import { siteName, siteUrl } from "@/lib/metadata";
import { getPublicAffiliateOffers, getPublicNavLinks, pickRandomAffiliateOffer } from "@/lib/public-content";

import { JsonLd } from "@/components/shared/json-ld";
import { AnnouncementBar } from "@/components/website/announcement-bar";
import { Footer } from "@/components/website/footer";
import { Navbar } from "@/components/website/navbar";

const ANNOUNCEMENT_BAR_HEIGHT = 44;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: siteName,
  url: siteUrl,
  telephone: contactDetails.phone,
  email: contactDetails.email,
  address: contactDetails.address,
  sameAs: socialLinks.map((link) => link.href),
};

export default async function WebsiteLayout({ children }: { children: ReactNode }) {
  const [navLinks, affiliateOffers] = await Promise.all([getPublicNavLinks(), getPublicAffiliateOffers()]);
  const offer = pickRandomAffiliateOffer(affiliateOffers);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <style>{`:root { --announcement-h: ${offer ? ANNOUNCEMENT_BAR_HEIGHT : 0}px; }`}</style>
      {offer ? <AnnouncementBar offer={offer} /> : null}
      <Navbar navLinks={navLinks.length > 0 ? navLinks : websiteNavigation} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
