"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type { PublicAffiliateOffer } from "@/lib/public-content";

const BAR_HEIGHT_VAR = "--announcement-h";

export function AnnouncementBar({ offer }: { offer: PublicAffiliateOffer }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    document.documentElement.style.setProperty(BAR_HEIGHT_VAR, "0px");
  }

  const text = (
    <p className="min-w-0 truncate text-center text-xs font-medium sm:text-sm">
      <span className="font-semibold text-accent-soft">{offer.brandName}:</span>{" "}
      {offer.message}{" "}
      <span className="ml-1 rounded-full bg-white/15 px-2 py-0.5 font-mono text-[0.7rem] font-semibold tracking-wide">
        {offer.couponCode}
      </span>
    </p>
  );

  return (
    <div className="fixed inset-x-0 top-0 z-60 flex h-11 items-center justify-center gap-3 bg-primary px-4 text-white sm:px-6">
      {offer.brandUrl ? (
        <a href={offer.brandUrl} target="_blank" rel="noopener noreferrer" className="min-w-0 hover:opacity-90">
          {text}
        </a>
      ) : (
        text
      )}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss offer"
        className="shrink-0 rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <X size={14} />
      </button>
    </div>
  );
}
