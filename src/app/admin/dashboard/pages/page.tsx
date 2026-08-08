"use client";

import { useEffect, useMemo, useState } from "react";

import { adminGet, adminPatch, adminPost } from "@/lib/admin-api";
import { formatAdminDate, formatArrayInput, parseArrayInput, sanitizeArrayInput } from "@/lib/admin-format";

import { ContentPanel } from "@/components/admin/content-panel";
import { type AdminTableRow, DataTable } from "@/components/admin/data-table";

type PageStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

type PageItem = {
  id: string;
  slug: string;
  title: string;
  template: string;
  status: PageStatus;
  summary?: string | null;
  contentJson?: Record<string, unknown> | null;
  updatedAt: string;
};

type ListResponse<T> = {
  items: T[];
};

type FieldType = "text" | "textarea" | "array" | "select";

type FieldConfig = {
  section: string;
  path: string;
  label: string;
  type: FieldType;
  rows?: number;
  readOnly?: boolean;
  options?: Array<{ label: string; value: string }>;
};

type PageDefinition = {
  panelTitle: string;
  description: string;
  fields: FieldConfig[];
};

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Review", value: "REVIEW" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

const sharedFields: FieldConfig[] = [
  { section: "Page Settings", path: "slug", label: "Slug", type: "text", readOnly: true },
  { section: "Page Settings", path: "title", label: "Title", type: "text" },
  { section: "Page Settings", path: "template", label: "Template", type: "text", readOnly: true },
  { section: "Page Settings", path: "status", label: "Status", type: "select", options: statusOptions },
  { section: "Page Settings", path: "summary", label: "Summary", type: "textarea", rows: 3 },
];

const pageDefinitions: Record<string, PageDefinition> = {
  home: {
    panelTitle: "Homepage Content",
    description: "Manage hero copy and section messaging for the homepage without rebuilding content manually.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Hero", path: "contentJson.hero.primaryCtaLabel", label: "Primary CTA Label", type: "text" },
      { section: "Hero", path: "contentJson.hero.primaryCtaHref", label: "Primary CTA Link", type: "text" },
      { section: "Hero", path: "contentJson.hero.secondaryCtaLabel", label: "Secondary CTA Label", type: "text" },
      { section: "Hero", path: "contentJson.hero.secondaryCtaHref", label: "Secondary CTA Link", type: "text" },
      { section: "Trust Marquee", path: "contentJson.marquee.items", label: "Ticker Items", type: "array", rows: 6 },
      { section: "Introduction", path: "contentJson.introduction.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Introduction", path: "contentJson.introduction.title", label: "Title", type: "textarea", rows: 4 },
      { section: "About Experience", path: "contentJson.about.eyebrow", label: "Eyebrow", type: "text" },
      { section: "About Experience", path: "contentJson.about.title", label: "Title", type: "textarea", rows: 3 },
      { section: "About Experience", path: "contentJson.about.description", label: "Description", type: "textarea", rows: 4 },
      { section: "About Experience", path: "contentJson.about.ctaLabel", label: "CTA Label", type: "text" },
      { section: "About Experience", path: "contentJson.about.ctaHref", label: "CTA Link", type: "text" },
      { section: "Services", path: "contentJson.services.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Services", path: "contentJson.services.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Services", path: "contentJson.services.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Philosophy", path: "contentJson.philosophy.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Philosophy", path: "contentJson.philosophy.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Philosophy", path: "contentJson.philosophy.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Why Pinnacle", path: "contentJson.whyPinnacle.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Why Pinnacle", path: "contentJson.whyPinnacle.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Why Pinnacle", path: "contentJson.whyPinnacle.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Why Pinnacle", path: "contentJson.whyPinnacle.benefits", label: "Benefits", type: "array", rows: 5 },
      { section: "Advisors", path: "contentJson.advisors.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Advisors", path: "contentJson.advisors.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Advisors", path: "contentJson.advisors.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Journey", path: "contentJson.journey.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Journey", path: "contentJson.journey.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Journey", path: "contentJson.journey.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Gallery", path: "contentJson.gallery.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Gallery", path: "contentJson.gallery.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Gallery", path: "contentJson.gallery.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Insights", path: "contentJson.insights.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Insights", path: "contentJson.insights.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Insights", path: "contentJson.insights.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Final CTA", path: "contentJson.finalCta.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Final CTA", path: "contentJson.finalCta.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Final CTA", path: "contentJson.finalCta.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Final CTA", path: "contentJson.finalCta.primaryCtaLabel", label: "Primary CTA Label", type: "text" },
      { section: "Final CTA", path: "contentJson.finalCta.primaryCtaHref", label: "Primary CTA Link", type: "text" },
      { section: "Final CTA", path: "contentJson.finalCta.secondaryCtaLabel", label: "Secondary CTA Label", type: "text" },
      { section: "Final CTA", path: "contentJson.finalCta.secondaryCtaHref", label: "Secondary CTA Link", type: "text" },
    ],
  },
  about: {
    panelTitle: "About Page",
    description: "Edit the existing About page copy, highlights, and call to action.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Hero", path: "contentJson.hero.accent", label: "Accent Copy", type: "textarea", rows: 2 },
      { section: "Story", path: "contentJson.story.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Story", path: "contentJson.story.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Story", path: "contentJson.story.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Story", path: "contentJson.story.highlights", label: "Highlights", type: "array", rows: 4 },
      { section: "Client Experience", path: "contentJson.clientExperience.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Client Experience", path: "contentJson.clientExperience.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Client Experience", path: "contentJson.clientExperience.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Client Experience", path: "contentJson.clientExperience.primaryCtaLabel", label: "CTA Label", type: "text" },
      { section: "Client Experience", path: "contentJson.clientExperience.primaryCtaHref", label: "CTA Link", type: "text" },
    ],
  },
  contact: {
    panelTitle: "Contact Page",
    description: "Update the contact page messaging while contact details stay controlled through Settings.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Reach Out", path: "contentJson.reachOut.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Reach Out", path: "contentJson.reachOut.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Reach Out", path: "contentJson.reachOut.description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  schedule: {
    panelTitle: "Schedule Page",
    description: "Manage the consultation-booking page copy and expectation-setting content.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "What To Expect", path: "contentJson.expectations.eyebrow", label: "Eyebrow", type: "text" },
      { section: "What To Expect", path: "contentJson.expectations.title", label: "Title", type: "textarea", rows: 3 },
      { section: "What To Expect", path: "contentJson.expectations.description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  privacy: {
    panelTitle: "Privacy Policy",
    description: "Edit the current privacy policy heading and paragraph content.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "text" },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Policy Body", path: "contentJson.body.paragraphs", label: "Paragraphs", type: "array", rows: 8 },
    ],
  },
  terms: {
    panelTitle: "Terms & Conditions",
    description: "Edit the terms page heading and full paragraph content.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "text" },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 3 },
      { section: "Terms Body", path: "contentJson.body.paragraphs", label: "Paragraphs", type: "array", rows: 8 },
    ],
  },
  expertise: {
    panelTitle: "Expertise Page",
    description: "Manage the static page copy that introduces the services catalog.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Service Platform", path: "contentJson.platform.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Service Platform", path: "contentJson.platform.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Service Platform", path: "contentJson.platform.description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  advisors: {
    panelTitle: "Advisors Page",
    description: "Manage the advisor directory page copy without re-entering the team data itself.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Advisor Spotlight", path: "contentJson.spotlight.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Advisor Spotlight", path: "contentJson.spotlight.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Advisor Spotlight", path: "contentJson.spotlight.description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
  insights: {
    panelTitle: "Insights Page",
    description: "Manage the editorial landing page copy while article entries stay managed in Insights.",
    fields: [
      ...sharedFields,
      { section: "Hero", path: "contentJson.hero.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Hero", path: "contentJson.hero.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Hero", path: "contentJson.hero.description", label: "Description", type: "textarea", rows: 4 },
      { section: "Editorial", path: "contentJson.editorial.eyebrow", label: "Eyebrow", type: "text" },
      { section: "Editorial", path: "contentJson.editorial.title", label: "Title", type: "textarea", rows: 3 },
      { section: "Editorial", path: "contentJson.editorial.description", label: "Description", type: "textarea", rows: 3 },
    ],
  },
};

const defaultDefinition: PageDefinition = {
  panelTitle: "Page Content",
  description: "Update page settings and structured content blocks for this route.",
  fields: sharedFields,
};

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-[#f8fbfc] px-4 py-3 text-sm text-primary outline-none";

function getValueByPath(record: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((value, key) => {
    if (value && typeof value === "object" && key in (value as Record<string, unknown>)) {
      return (value as Record<string, unknown>)[key];
    }

    return undefined;
  }, record);
}

function setValueByPath(record: Record<string, unknown>, path: string, value: unknown) {
  const clone = structuredClone(record);
  const keys = path.split(".");
  let cursor: Record<string, unknown> = clone;

  for (const key of keys.slice(0, -1)) {
    const next = cursor[key];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }

  cursor[keys[keys.length - 1]] = value;
  return clone;
}

function groupFields(fields: FieldConfig[]) {
  return fields.reduce<Array<{ title: string; fields: FieldConfig[] }>>((sections, field) => {
    const existing = sections.find((section) => section.title === field.section);
    if (existing) {
      existing.fields.push(field);
      return sections;
    }

    sections.push({ title: field.section, fields: [field] });
    return sections;
  }, []);
}

function sanitizeArrayFields(record: Record<string, unknown>, fieldsList: FieldConfig[]) {
  let next = record;
  for (const field of fieldsList) {
    if (field.type === "array") {
      const value = getValueByPath(next, field.path);
      if (Array.isArray(value)) {
        next = setValueByPath(next, field.path, sanitizeArrayInput(value as string[]));
      }
    }
  }
  return next;
}

function toPayload(record: Record<string, unknown>) {
  return {
    slug: String(record.slug ?? ""),
    title: String(record.title ?? ""),
    template: String(record.template ?? ""),
    status: record.status as PageStatus,
    summary: String(record.summary ?? "") || null,
    contentJson: (record.contentJson as Record<string, unknown> | undefined) ?? {},
  };
}

export default function AdminPagesPage() {
  const [items, setItems] = useState<PageItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rows = useMemo<AdminTableRow[]>(
    () =>
      items.map((item) => ({
        id: item.id,
        title: item.title,
        status: item.status,
        updated: formatAdminDate(item.updatedAt),
        owner: item.template,
      })),
    [items],
  );

  const selectedItem = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [items, selectedId]);
  const definition = selectedItem ? pageDefinitions[selectedItem.slug] ?? defaultDefinition : defaultDefinition;
  const sections = useMemo(() => groupFields(definition.fields), [definition.fields]);

  useEffect(() => {
    async function loadPages(preferredId?: string | null) {
      setLoading(true);
      setError(null);

      try {
        const data = await adminGet<ListResponse<PageItem>>("/admin/pages");
        setItems(data.items);

        const nextSelectedId =
          preferredId && data.items.some((item) => item.id === preferredId)
            ? preferredId
            : data.items[0]?.id ?? null;

        setSelectedId(nextSelectedId);

        if (nextSelectedId) {
          const selected = data.items.find((item) => item.id === nextSelectedId) ?? null;
          setDraft(selected ? structuredClone(selected) : null);
        } else {
          setDraft(null);
        }
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load pages.");
      } finally {
        setLoading(false);
      }
    }

    void loadPages();
  }, []);

  function handleSelect(row: AdminTableRow) {
    const selected = items.find((item) => item.id === row.id) ?? null;
    setSelectedId(row.id);
    setDraft(selected ? structuredClone(selected) : null);
    setMessage(null);
    setError(null);
  }

  function updateField(path: string, value: unknown) {
    setDraft((current) => (current ? setValueByPath(current, path, value) : current));
  }

  async function reload(preferredId?: string | null) {
    setLoading(true);
    setError(null);

    try {
      const data = await adminGet<ListResponse<PageItem>>("/admin/pages");
      setItems(data.items);

      const nextSelectedId =
        preferredId && data.items.some((item) => item.id === preferredId)
          ? preferredId
          : data.items[0]?.id ?? null;

      setSelectedId(nextSelectedId);
      setDraft(nextSelectedId ? structuredClone(data.items.find((item) => item.id === nextSelectedId)!) : null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to reload pages.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(publish = false) {
    if (!selectedItem || !draft) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const sanitizedDraft = sanitizeArrayFields(draft, definition.fields);
      await adminPatch(`/admin/pages/${selectedItem.id}`, toPayload(sanitizedDraft));

      if (publish) {
        await adminPost(`/admin/pages/${selectedItem.id}/publish`, {});
      }

      await reload(selectedItem.id);
      setMessage(publish ? "Page saved and published." : "Page saved successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save page content.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <DataTable
        title="Website Content"
        rows={rows}
        loading={loading}
        selectedId={selectedId}
        showCreateButton={false}
        onRowClick={handleSelect}
        emptyMessage="No website pages have been configured yet."
      />
      <ContentPanel title={definition.panelTitle} description={definition.description}>
        {!draft || !selectedItem ? (
          <p className="text-sm text-muted">Select a page to edit its live content.</p>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{section.title}</p>
                {section.fields.map((field) => {
                  const value = getValueByPath(draft, field.path);

                  if (field.type === "textarea") {
                    return (
                      <label key={field.path} className="block">
                        <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                        <textarea
                          value={String(value ?? "")}
                          readOnly={field.readOnly}
                          rows={field.rows ?? 4}
                          onChange={(event) => updateField(field.path, event.target.value)}
                          className={`${inputClassName} min-h-28 resize-none`}
                        />
                      </label>
                    );
                  }

                  if (field.type === "array") {
                    return (
                      <label key={field.path} className="block">
                        <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                        <textarea
                          value={Array.isArray(value) ? formatArrayInput(value as string[]) : ""}
                          readOnly={field.readOnly}
                          rows={field.rows ?? 5}
                          onChange={(event) => updateField(field.path, parseArrayInput(event.target.value))}
                          className={`${inputClassName} min-h-32 resize-none`}
                        />
                      </label>
                    );
                  }

                  if (field.type === "select") {
                    return (
                      <label key={field.path} className="block">
                        <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                        <select
                          value={String(value ?? "")}
                          disabled={field.readOnly}
                          onChange={(event) => updateField(field.path, event.target.value)}
                          className={inputClassName}
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  }

                  return (
                    <label key={field.path} className="block">
                      <span className="mb-2 block text-sm font-medium text-primary">{field.label}</span>
                      <input
                        value={String(value ?? "")}
                        readOnly={field.readOnly}
                        onChange={(event) => updateField(field.path, event.target.value)}
                        className={inputClassName}
                      />
                    </label>
                  );
                })}
              </div>
            ))}

            {message ? <p className="text-sm text-accent">{message}</p> : null}
            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={saving}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Draft"}
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={saving}
                className="rounded-full border border-line px-4 py-3 text-sm font-semibold text-primary transition hover:bg-[#f2f8f8] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Publish
              </button>
            </div>
          </div>
        )}
      </ContentPanel>
    </div>
  );
}
