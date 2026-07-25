import type { ReactNode } from "react";

import { Footer } from "@/components/website/footer";
import { Navbar } from "@/components/website/navbar";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
