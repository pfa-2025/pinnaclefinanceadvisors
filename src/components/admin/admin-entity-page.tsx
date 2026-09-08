"use client";

import { useEffect, useMemo, useState } from "react";

import { adminDelete, adminGet, adminPatch, adminPost, adminUpload } from "@/lib/admin-api";
import {
  formatAdminDate,
  formatArrayInput,
  formatJsonInput,
  normalizeImageUrl,
  parseArrayInput,
  parseJsonInput,
  sanitizeArrayInput,
} from "@/lib/admin-format";

import { ContentPanel } from "@/components/admin/content-panel";
import { type AdminTableRow, DataTable } from "@/components/admin/data-table";

type Option = {
  label: string;
  value: string;
};

type FieldConfig<TForm, TExtra> = {
  name: keyof TForm & string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox" | "array" | "json" | "number" | "date" | "image";
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  options?: Option[] | ((extra: TExtra | null) => Option[]);
  uploadEndpoint?: string;
  showIf?: (form: TForm) => boolean;
};

type AdminEntityPageProps<TItem, TForm extends Record<string, unknown>, TExtra = unknown> = {
  title: string;
  panelTitle: string;
  description: string;
  endpoint: string;
  fields: Array<FieldConfig<TForm, TExtra>>;
  createEmpty: (extra: TExtra | null) => TForm;
  getItemId: (item: TItem) => string;
  getUpdatePath?: (item: TItem, form: TForm) => string;
  getCreatePath?: (form: TForm) => string;
  createMethod?: "POST" | "PATCH";
  loadExtra?: () => Promise<TExtra>;
  mapItemToForm: (item: TItem, extra: TExtra | null) => TForm;
  mapFormToPayload: (form: TForm, extra: TExtra | null) => unknown;
  mapItemToRow: (item: TItem) => AdminTableRow;
  afterSaveLabel?: string;
  showDeleteAction?: boolean;
  allowCreate?: boolean;
  publishAction?: {
    label: string;
    run: (item: TItem, form: TForm) => Promise<unknown>;
    /** Returns true once the item is already in the state this action would put it in. */
    isDone?: (item: TItem) => boolean;
    doneLabel?: string;
    pendingLabel?: string;
  };
  deleteAction?: {
    label: string;
    run: (item: TItem) => Promise<unknown>;
    pendingLabel?: string;
  };
};

type ListResponse<T> = {
  items: T[];
};

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-[#f8fbfc] px-4 py-3 text-sm text-primary outline-none";

export function AdminEntityPage<TItem, TForm extends Record<string, unknown>, TExtra = unknown>({
  title,
  panelTitle,
  description,
  endpoint,
  fields,
  createEmpty,
  getItemId,
  getUpdatePath,
  getCreatePath,
  createMethod = "POST",
  loadExtra,
  mapItemToForm,
  mapFormToPayload,
  mapItemToRow,
  afterSaveLabel = "Saved successfully.",
  showDeleteAction = false,
  allowCreate = true,
  publishAction,
  deleteAction,
}: AdminEntityPageProps<TItem, TForm, TExtra>) {
  const [items, setItems] = useState<TItem[]>([]);
  const [extra, setExtra] = useState<TExtra | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<TForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<"save" | "publish" | "delete" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const saving = activeAction !== null;
  const busy = saving || uploadingField !== null;

  const rows = useMemo(() => items.map(mapItemToRow), [items, mapItemToRow]);
  const selectedItem = useMemo(
    () => items.find((item) => getItemId(item) === selectedId) ?? null,
    [getItemId, items, selectedId],
  );

  async function loadData(preferredId?: string | null) {
    setLoading(true);
    setError(null);

    try {
      const [listData, extraData] = await Promise.all([
        adminGet<ListResponse<TItem>>(endpoint),
        loadExtra ? loadExtra() : Promise.resolve(null as TExtra | null),
      ]);

      setItems(listData.items);
      setExtra(extraData);

      const resolvedSelectedId =
        preferredId && listData.items.some((item) => getItemId(item) === preferredId)
          ? preferredId
          : listData.items[0]
            ? getItemId(listData.items[0])
            : null;

      setSelectedId(resolvedSelectedId);

      if (resolvedSelectedId) {
        const selected = listData.items.find((item) => getItemId(item) === resolvedSelectedId) ?? null;
        setForm(selected ? mapItemToForm(selected, extraData) : createEmpty(extraData));
      } else {
        setForm(createEmpty(extraData));
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  function handleSelect(rowId: string) {
    setSelectedId(rowId);
    const item = items.find((entry) => getItemId(entry) === rowId) ?? null;
    if (item) {
      setForm(mapItemToForm(item, extra));
      setMessage(null);
      setError(null);
    }
  }

  function handleCreate() {
    setSelectedId(null);
    setForm(createEmpty(extra));
    setMessage(null);
    setError(null);
  }

  function updateFormField(name: keyof TForm & string, value: unknown) {
    setForm((current) => (current ? { ...current, [name]: value } : current));
  }

  async function handleImageUpload(field: FieldConfig<TForm, TExtra>, file: File) {
    if (!field.uploadEndpoint) return;

    setUploadingField(field.name);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await adminUpload<{ url: string }>(field.uploadEndpoint, formData);
      updateFormField(field.name, result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSave(publish = false) {
    if (!form) return;

    setActiveAction(publish ? "publish" : "save");
    setError(null);
    setMessage(null);

    try {
      const sanitizedForm = { ...form };
      for (const field of fields) {
        if (field.type === "array" && Array.isArray(sanitizedForm[field.name])) {
          (sanitizedForm as Record<string, unknown>)[field.name] = sanitizeArrayInput(
            sanitizedForm[field.name] as string[],
          );
        }
      }

      let refreshedId = selectedId;

      if (selectedItem) {
        const path = getUpdatePath?.(selectedItem, sanitizedForm) ?? `${endpoint}/${getItemId(selectedItem)}`;
        await adminPatch(path, mapFormToPayload(sanitizedForm, extra));

        if (publish && publishAction) {
          await publishAction.run(selectedItem, sanitizedForm);
        }

        refreshedId = getItemId(selectedItem);
      } else {
        const path = getCreatePath?.(sanitizedForm) ?? endpoint;
        const created =
          createMethod === "PATCH"
            ? await adminPatch<TItem>(path, mapFormToPayload(sanitizedForm, extra))
            : await adminPost<TItem>(path, mapFormToPayload(sanitizedForm, extra));

        refreshedId = getItemId(created);
      }

      await loadData(refreshedId);
      setMessage(publish && publishAction ? `${afterSaveLabel} Published.` : afterSaveLabel);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save changes.");
    } finally {
      setActiveAction(null);
    }
  }

  async function handleDelete() {
    if (!selectedItem) return;

    setActiveAction("delete");
    setError(null);
    setMessage(null);

    try {
      if (deleteAction) {
        await deleteAction.run(selectedItem);
      } else {
        await adminDelete(`${endpoint}/${getItemId(selectedItem)}`);
      }

      await loadData(null);
      setMessage("Entry updated.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete this entry.");
    } finally {
      setActiveAction(null);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <DataTable
        title={title}
        rows={rows}
        loading={loading}
        selectedId={selectedId}
        showCreateButton={allowCreate}
        onCreateClick={handleCreate}
        onRowClick={(row) => handleSelect(row.id)}
      />
      <ContentPanel title={panelTitle} description={description}>
        {!form ? (
          <p className="text-sm text-muted">Select an entry or create a new one to start editing.</p>
        ) : (
          <div className="space-y-4">
            {fields.map((field) => {
              if (field.showIf && !field.showIf(form)) {
                return null;
              }

              const value = form[field.name];
              const options = typeof field.options === "function" ? field.options(extra) : field.options ?? [];

              if (field.type === "textarea") {
                return (
                  <label key={field.name} className="block">
                    <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                    <textarea
                      value={String(value ?? "")}
                      readOnly={field.readOnly}
                      rows={field.rows ?? 5}
                      onChange={(event) => updateFormField(field.name, event.target.value)}
                      className={`${inputClassName} min-h-32 resize-none`}
                      placeholder={field.placeholder}
                    />
                  </label>
                );
              }

              if (field.type === "select") {
                return (
                  <label key={field.name} className="block">
                    <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                    <select
                      value={String(value ?? "")}
                      disabled={field.readOnly}
                      onChange={(event) => updateFormField(field.name, event.target.value || null)}
                      className={inputClassName}
                    >
                      <option value="">Select an option</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <label key={field.name} className="flex items-center gap-3 rounded-4xl border border-line p-4 text-sm text-primary">
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      disabled={field.readOnly}
                      onChange={(event) => updateFormField(field.name, event.target.checked)}
                      className="h-4 w-4 accent-[#00A6A6]"
                    />
                    {field.label}
                  </label>
                );
              }

              if (field.type === "array") {
                return (
                  <label key={field.name} className="block">
                    <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                    <textarea
                      value={Array.isArray(value) ? formatArrayInput(value as string[]) : ""}
                      readOnly={field.readOnly}
                      rows={field.rows ?? 5}
                      onChange={(event) => updateFormField(field.name, parseArrayInput(event.target.value))}
                      className={`${inputClassName} min-h-32 resize-none`}
                      placeholder={field.placeholder ?? "One item per line"}
                    />
                  </label>
                );
              }

              if (field.type === "image") {
                const stringValue = typeof value === "string" ? value : "";
                const isUploading = uploadingField === field.name;

                return (
                  <div key={field.name} className="space-y-3">
                    <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                    {stringValue ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={stringValue}
                        alt=""
                        className="h-24 w-24 rounded-2xl border border-line object-cover"
                      />
                    ) : null}
                    <input
                      type="text"
                      value={stringValue}
                      readOnly={field.readOnly}
                      onChange={(event) => updateFormField(field.name, normalizeImageUrl(event.target.value))}
                      className={inputClassName}
                      placeholder={field.placeholder ?? "Paste an image URL or public Google Drive link"}
                    />
                    {field.uploadEndpoint ? (
                      <label
                        className={`inline-flex items-center gap-2 ${
                          isUploading || saving ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          disabled={isUploading || saving}
                          className="hidden"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            event.target.value = "";
                            if (file) void handleImageUpload(field, file);
                          }}
                        />
                        <span
                          className={`rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white ${
                            isUploading || saving ? "opacity-50" : ""
                          }`}
                        >
                          {isUploading ? "Uploading..." : "Upload Image"}
                        </span>
                      </label>
                    ) : null}
                  </div>
                );
              }

              if (field.type === "json") {
                return (
                  <label key={field.name} className="block">
                    <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                    <textarea
                      value={formatJsonInput(value)}
                      readOnly={field.readOnly}
                      rows={field.rows ?? 8}
                      onChange={(event) => {
                        try {
                          updateFormField(field.name, parseJsonInput(event.target.value));
                          setError(null);
                        } catch {
                          setError("JSON content is not valid yet.");
                        }
                      }}
                      className={`${inputClassName} min-h-40 resize-none font-mono text-xs`}
                    />
                  </label>
                );
              }

              const inputType = field.type === "number" ? "number" : field.type === "date" ? "date" : "text";
              const normalizedValue =
                field.type === "date" && value
                  ? String(value).slice(0, 10)
                  : field.type === "number"
                    ? String(value ?? 0)
                    : String(value ?? "");

              return (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                  <input
                    type={inputType}
                    value={normalizedValue}
                    readOnly={field.readOnly}
                    onChange={(event) => {
                      const nextValue =
                        field.type === "number" ? Number(event.target.value || 0) : event.target.value;
                      updateFormField(field.name, nextValue);
                    }}
                    className={inputClassName}
                    placeholder={field.placeholder}
                  />
                </label>
              );
            })}

            {error ? <p className="text-sm text-[#b84e4e]">{error}</p> : null}
            {message ? <p className="text-sm text-accent">{message}</p> : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={busy}
                onClick={() => void handleSave(false)}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {activeAction === "save" ? "Saving..." : "Save Draft"}
              </button>
              {publishAction ? (
                (() => {
                  const isDone = selectedItem ? (publishAction.isDone?.(selectedItem) ?? false) : false;
                  return (
                    <button
                      type="button"
                      disabled={busy || isDone}
                      onClick={() => void handleSave(true)}
                      className="rounded-full border border-line px-4 py-3 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDone
                        ? (publishAction.doneLabel ?? "Published")
                        : activeAction === "publish"
                          ? (publishAction.pendingLabel ?? "Publishing...")
                          : publishAction.label}
                    </button>
                  );
                })()
              ) : null}
              {selectedItem && showDeleteAction ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void handleDelete()}
                  className="rounded-full border border-[#f1d0d0] px-4 py-3 text-sm text-[#b84e4e] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {activeAction === "delete"
                    ? (deleteAction?.pendingLabel ?? "Archiving...")
                    : (deleteAction?.label ?? "Archive")}
                </button>
              ) : null}
            </div>

            {selectedItem ? (
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                Last updated {formatAdminDate((selectedItem as { updatedAt?: string }).updatedAt)}
              </p>
            ) : null}
          </div>
        )}
      </ContentPanel>
    </div>
  );
}
