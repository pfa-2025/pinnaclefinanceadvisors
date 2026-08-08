import type { ReactNode } from "react";

import { contactDetails, socialLinks } from "@/constants/contact";
import { websiteNavigation } from "@/constants/navigation";
import { siteName, siteUrl } from "@/lib/metadata";
import { getPublicNavLinks } from "@/lib/public-content";

import { JsonLd } from "@/components/shared/json-ld";
import { Footer } from "@/components/website/footer";
import { Navbar } from "@/components/website/navbar";

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
  const navLinks = await getPublicNavLinks();

  return (
    <>
      <JsonLd data={organizationSchema} />
      <Navbar navLinks={navLinks.length > 0 ? navLinks : websiteNavigation} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
