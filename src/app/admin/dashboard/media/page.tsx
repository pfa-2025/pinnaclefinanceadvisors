"use client";

import { useEffect, useMemo, useState } from "react";

import { adminDelete, adminGet, adminPatch, adminUpload } from "@/lib/admin-api";
import { formatAdminDate } from "@/lib/admin-format";

import { ContentPanel } from "@/components/admin/content-panel";
import { type AdminTableRow, DataTable } from "@/components/admin/data-table";

type MediaItem = {
  id: string;
  publicUrl: string;
  originalName: string;
  mimeType: string;
  fileSizeBytes: number;
  altText?: string | null;
  caption?: string | null;
  kind: "IMAGE" | "VIDEO" | "DOCUMENT";
  optimizationStatus: "PENDING" | "OPTIMIZED" | "FAILED";
  createdAt: string;
  updatedAt: string;
};

type MediaResponse = {
  items: MediaItem[];
};

type MediaForm = {
  altText: string;
  caption: string;
  kind: MediaItem["kind"];
  optimizationStatus: MediaItem["optimizationStatus"];
};

type UploadForm = {
  altText: string;
  caption: string;
  kind: MediaItem["kind"];
};

const kindOptions: Array<{ label: string; value: MediaItem["kind"] }> = [
  { label: "Image", value: "IMAGE" },
  { label: "Video", value: "VIDEO" },
  { label: "Document", value: "DOCUMENT" },
];

const optimizationOptions: Array<{ label: string; value: MediaItem["optimizationStatus"] }> = [
  { label: "Pending", value: "PENDING" },
  { label: "Optimized", value: "OPTIMIZED" },
  { label: "Failed", value: "FAILED" },
];

function mapMediaToRow(item: MediaItem): AdminTableRow {
  return {
    id: item.id,
    title: item.originalName,
    status: item.optimizationStatus,
    updated: formatAdminDate(item.updatedAt),
    owner: item.kind,
  };
}

function mapMediaToForm(item: MediaItem): MediaForm {
  return {
    altText: item.altText ?? "",
    caption: item.caption ?? "",
    kind: item.kind,
    optimizationStatus: item.optimizationStatus,
  };
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<MediaForm | null>(null);
  const [uploadForm, setUploadForm] = useState<UploadForm>({
    altText: "",
    caption: "",
    kind: "IMAGE",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo(() => items.map(mapMediaToRow), [items]);
  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [items, selectedId]);

  async function loadMedia(preferredId?: string | null) {
    setLoading(true);
    setError(null);

    try {
      const data = await adminGet<MediaResponse>("/admin/media");
      setItems(data.items);

      const nextSelectedId =
        preferredId && data.items.some((item) => item.id === preferredId)
          ? preferredId
          : data.items[0]?.id ?? null;

      setSelectedId(nextSelectedId);
      setForm(nextSelectedId ? mapMediaToForm(data.items.find((item) => item.id === nextSelectedId)!) : null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load media assets.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadMedia();
  }, []);

  function handleSelect(row: AdminTableRow) {
    setSelectedId(row.id);
    const item = items.find((entry) => entry.id === row.id) ?? null;
    setForm(item ? mapMediaToForm(item) : null);
    setMessage(null);
    setError(null);
  }

  async function handleUpload() {
    if (!selectedFile) {
      setError("Please choose a file to upload.");
      return;
    }

    setUploading(true);
    setMessage(null);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("file", selectedFile);
      payload.append("altText", uploadForm.altText);
      payload.append("caption", uploadForm.caption);
      payload.append("kind", uploadForm.kind);

      const created = await adminUpload<MediaItem>("/admin/media", payload);

      setSelectedFile(null);
      setUploadForm({ altText: "", caption: "", kind: "IMAGE" });
      await loadMedia(created.id);
      setMessage("Asset uploaded successfully.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Unable to upload media.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSaveMetadata() {
    if (!selectedItem || !form) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await adminPatch(`/admin/media/${selectedItem.id}`, {
        altText: form.altText || null,
        caption: form.caption || null,
        kind: form.kind,
        optimizationStatus: form.optimizationStatus,
      });
      await loadMedia(selectedItem.id);
      setMessage("Media details saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save media details.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!selectedItem) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      await adminDelete(`/admin/media/${selectedItem.id}`);
      await loadMedia(null);
      setMessage("Asset deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete asset.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <DataTable
        title="Media Library"
        rows={rows}
        loading={loading}
        selectedId={selectedId}
        onRowClick={handleSelect}
        showCreateButton={false}
        emptyMessage="Upload your first asset to start building the media library."
      />
      <ContentPanel
        title="Asset Upload"
        description="Preview images, manage optimization state, and prepare visuals for publishing."
      >
        <div className="space-y-5">
          <div className="rounded-4xl border border-dashed border-line bg-[#f8fbfc] p-6">
            <div className="space-y-4">
              <input
                type="file"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                className="block w-full text-sm text-primary file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              <select
                value={uploadForm.kind}
                onChange={(event) =>
                  setUploadForm((current) => ({
                    ...current,
                    kind: event.target.value as MediaItem["kind"],
                  }))
                }
                className={inputClassName}
              >
                {kindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                className={inputClassName}
                value={uploadForm.altText}
                onChange={(event) => setUploadForm((current) => ({ ...current, altText: event.target.value }))}
                placeholder="Alt text"
              />
              <textarea
                className={`${inputClassName} min-h-28 resize-none`}
                value={uploadForm.caption}
                onChange={(event) => setUploadForm((current) => ({ ...current, caption: event.target.value }))}
                placeholder="Caption"
              />
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {uploading ? "Uploading..." : "Upload Asset"}
              </button>
            </div>
          </div>

          {selectedItem && form ? (
            <div className="space-y-4">
              <div className="rounded-4xl border border-line bg-[#f8fbfc] p-4">
                {selectedItem.kind === "IMAGE" ? (
                  <img
                    src={selectedItem.publicUrl}
                    alt={selectedItem.altText ?? selectedItem.originalName}
                    className="h-48 w-full rounded-3xl object-cover"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center rounded-3xl bg-white text-sm text-muted">
                    Preview unavailable for this asset type
                  </div>
                )}
                <div className="mt-4 space-y-1 text-sm text-muted">
                  <p className="font-medium text-primary">{selectedItem.originalName}</p>
                  <p>{selectedItem.mimeType}</p>
                  <p>{Math.max(1, Math.round(selectedItem.fileSizeBytes / 1024))} KB</p>
                </div>
              </div>

              <input
                className={inputClassName}
                value={form.altText}
                onChange={(event) => setForm((current) => (current ? { ...current, altText: event.target.value } : current))}
                placeholder="Alt text"
              />
              <textarea
                className={`${inputClassName} min-h-28 resize-none`}
                value={form.caption}
                onChange={(event) => setForm((current) => (current ? { ...current, caption: event.target.value } : current))}
                placeholder="Caption"
              />
              <select
                value={form.kind}
                onChange={(event) =>
                  setForm((current) =>
                    current ? { ...current, kind: event.target.value as MediaItem["kind"] } : current,
                  )
                }
                className={inputClassName}
              >
                {kindOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={form.optimizationStatus}
                onChange={(event) =>
                  setForm((current) =>
                    current
                      ? {
                          ...current,
                          optimizationStatus: event.target.value as MediaItem["optimizationStatus"],
                        }
                      : current,
                  )
                }
                className={inputClassName}
              >
                {optimizationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {message ? <p className="text-sm text-accent">{message}</p> : null}
              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveMetadata}
                  disabled={saving}
                  className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save Details"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="rounded-full border border-line px-4 py-3 text-sm font-semibold text-primary transition hover:bg-[#f2f8f8] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Delete Asset
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Select an asset from the library to edit its metadata.</p>
          )}
        </div>
      </ContentPanel>
    </div>
  );
}

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-[#f8fbfc] px-4 py-3 text-sm text-primary outline-none";
