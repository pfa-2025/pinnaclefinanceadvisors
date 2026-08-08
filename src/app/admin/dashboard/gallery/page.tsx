"use client";

import { adminPost } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { AdminEntityPage } from "@/components/admin/admin-entity-page";

type GalleryItemRecord = {
  id: string;
  title?: string | null;
  category?: string | null;
  caption?: string | null;
  mediaType: "IMAGE" | "VIDEO";
  imageUrl?: string | null;
  videoUrl?: string | null;
  displayOrder: number;
  status: string;
  updatedAt: string;
};

type GalleryForm = {
  title: string;
  category: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO";
  imageUrl: string;
  videoUrl: string;
  displayOrder: number;
  status: string;
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

const mediaTypeOptions = [
  { label: "Image", value: "IMAGE" },
  { label: "Video (YouTube or Google Drive link)", value: "VIDEO" },
];

export default function AdminGalleryPage() {
  return (
    <AdminEntityPage<GalleryItemRecord, GalleryForm>
      title="Gallery"
      panelTitle="Gallery Item"
      description="Publish photos or videos to the public gallery. Images can be uploaded or linked; videos must be a YouTube or Google Drive URL."
      endpoint="/admin/gallery"
      createEmpty={() => ({
        title: "",
        category: "",
        caption: "",
        mediaType: "IMAGE",
        imageUrl: "",
        videoUrl: "",
        displayOrder: 0,
        status: "DRAFT",
      })}
      fields={[
        { name: "title", label: "Title", type: "text" },
        {
          name: "category",
          label: "Category / Tag",
          type: "text",
          placeholder: "e.g. Client Meeting, Community Event, Estate Planning",
        },
        { name: "caption", label: "Caption", type: "textarea", rows: 3 },
        { name: "mediaType", label: "Media Type", type: "select", options: mediaTypeOptions },
        {
          name: "imageUrl",
          label: "Image",
          type: "image",
          uploadEndpoint: "/admin/gallery/upload",
          placeholder: "Paste an image URL or public Google Drive link, or upload a file below",
          showIf: (form) => form.mediaType === "IMAGE",
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "text",
          placeholder: "https://www.youtube.com/watch?v=... or https://drive.google.com/file/d/.../view",
          showIf: (form) => form.mediaType === "VIDEO",
        },
        { name: "displayOrder", label: "Display Order", type: "number" },
        { name: "status", label: "Status", type: "select", options: statusOptions },
      ]}
      getItemId={(item) => item.id}
      mapItemToRow={(item) => ({
        id: item.id,
        title: item.title || (item.mediaType === "IMAGE" ? "Untitled image" : "Untitled video"),
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.mediaType,
      })}
      mapItemToForm={(item) => ({
        title: item.title ?? "",
        category: item.category ?? "",
        caption: item.caption ?? "",
        mediaType: item.mediaType,
        imageUrl: item.imageUrl ?? "",
        videoUrl: item.videoUrl ?? "",
        displayOrder: item.displayOrder,
        status: item.status,
      })}
      mapFormToPayload={(form) => ({
        title: form.title || null,
        category: form.category || null,
        caption: form.caption || null,
        mediaType: form.mediaType,
        imageUrl: form.mediaType === "IMAGE" ? form.imageUrl || null : null,
        videoUrl: form.mediaType === "VIDEO" ? form.videoUrl || null : null,
        displayOrder: form.displayOrder,
        status: form.status,
      })}
      publishAction={{
        label: "Publish",
        run: (item) => adminPost(`/admin/gallery/${item.id}/publish`, {}),
      }}
      showDeleteAction
    />
  );
}
