"use client";

import { adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type AffiliateOfferItem = {
  id: string;
  brandName: string;
  brandUrl?: string | null;
  message: string;
  couponCode: string;
  displayOrder: number;
  status: string;
  updatedAt: string;
};

type AffiliateOfferForm = {
  brandName: string;
  brandUrl: string;
  message: string;
  couponCode: string;
  displayOrder: number;
  status: string;
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

export default function AdminAffiliateOffersPage() {
  return (
    <AdminEntityPage<AffiliateOfferItem, AffiliateOfferForm>
      title="Affiliate Offers"
      panelTitle="Offer Editor"
      description="Manage partner brands, promo messages, and coupon codes shown randomly on the website. Only published offers appear on the site."
      endpoint="/admin/affiliate-offers"
      createEmpty={() => ({
        brandName: "",
        brandUrl: "",
        message: "",
        couponCode: "",
        displayOrder: 0,
        status: "DRAFT",
      })}
      fields={[
        { name: "brandName", label: "Partner Brand", type: "text", placeholder: "e.g. Shree Foods" },
        { name: "brandUrl", label: "Brand Website URL", type: "text", placeholder: "e.g. https://shreefoods.com" },
        { name: "couponCode", label: "Coupon Code", type: "text", placeholder: "e.g. PINNACLE20" },
        { name: "displayOrder", label: "Display Order", type: "number" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
        {
          name: "message",
          label: "Promo Message (20-30 words)",
          type: "textarea",
          rows: 4,
          placeholder: "e.g. Visiting us through Pinnacle Finance Advisors? Shree Foods is offering an exclusive discount for our website visitors — use this code at checkout to enjoy savings on your next order.",
        },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: `${item.brandName} — ${item.couponCode}`,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.brandName,
      })}
      mapItemToForm={(item) => ({
        brandName: item.brandName,
        brandUrl: item.brandUrl ?? "",
        message: item.message,
        couponCode: item.couponCode,
        displayOrder: item.displayOrder,
        status: item.status,
      })}
      mapFormToPayload={(form) => ({
        brandName: form.brandName,
        brandUrl: form.brandUrl || null,
        message: form.message,
        couponCode: form.couponCode,
        displayOrder: form.displayOrder,
        status: form.status,
      })}
      publishAction={{
        label: "Publish",
        run: (item) => adminPost(`/admin/affiliate-offers/${item.id}/publish`, {}),
        isDone: (item) => item.status === "PUBLISHED",
        doneLabel: "Published",
      }}
      showDeleteAction
    />
  );
}
