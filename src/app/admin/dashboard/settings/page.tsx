"use client";

import { useEffect, useState } from "react";

import { adminGet, adminPatch } from "@/lib/admin-api";

import { ContentPanel } from "@/components/admin/content-panel";

type WorkflowSettings = {
  requireReviewBeforePublish: boolean;
  emailAdvisorOnConsultationRequest: boolean;
  sendSeoChecksOnArticleSave: boolean;
};

type SettingsResponse = {
  siteName: string;
  siteUrl: string;
  supportEmail: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  footerDisclaimer: string;
  workflowSettings: WorkflowSettings | null;
};

type SettingsForm = {
  siteName: string;
  siteUrl: string;
  supportEmail: string;
  contactEmail: string;
  contactPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  footerDisclaimer: string;
  workflowSettings: WorkflowSettings;
};

const defaultWorkflowSettings: WorkflowSettings = {
  requireReviewBeforePublish: true,
  emailAdvisorOnConsultationRequest: true,
  sendSeoChecksOnArticleSave: true,
};

function mapSettingsToForm(settings: SettingsResponse): SettingsForm {
  return {
    siteName: settings.siteName,
    siteUrl: settings.siteUrl,
    supportEmail: settings.supportEmail,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    addressLine1: settings.addressLine1,
    addressLine2: settings.addressLine2 ?? "",
    city: settings.city,
    state: settings.state,
    postalCode: settings.postalCode,
    country: settings.country,
    footerDisclaimer: settings.footerDisclaimer,
    workflowSettings: {
      ...defaultWorkflowSettings,
      ...(settings.workflowSettings ?? {}),
    },
  };
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      setError(null);

      try {
        const settings = await adminGet<SettingsResponse>("/admin/settings");
        setForm(mapSettingsToForm(settings));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load settings.");
      } finally {
        setLoading(false);
      }
    }

    void loadSettings();
  }, []);

  function updateField(name: keyof Omit<SettingsForm, "workflowSettings">, value: string) {
    setForm((current) => (current ? { ...current, [name]: value } : current));
  }

  function updateWorkflowSetting(name: keyof WorkflowSettings, value: boolean) {
    setForm((current) =>
      current
        ? {
            ...current,
            workflowSettings: {
              ...current.workflowSettings,
              [name]: value,
            },
          }
        : current,
    );
  }

  async function handleSave() {
    if (!form) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const updated = await adminPatch<SettingsResponse>("/admin/settings", {
        siteName: form.siteName,
        siteUrl: form.siteUrl,
        supportEmail: form.supportEmail,
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2 || null,
        city: form.city,
        state: form.state,
        postalCode: form.postalCode,
        country: form.country,
        footerDisclaimer: form.footerDisclaimer,
        workflowSettings: form.workflowSettings,
      });
      setForm(mapSettingsToForm(updated));
      setMessage("Settings saved successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ContentPanel
        title="General Settings"
        description="Manage contact details, footer information, notification routing, and publishing preferences."
      >
        {loading ? (
          <p className="text-sm text-muted">Loading settings...</p>
        ) : !form ? (
          <p className="text-sm text-red-500">{error ?? "Settings are unavailable right now."}</p>
        ) : (
          <div className="space-y-4">
            <input
              className={inputClassName}
              value={form.siteName}
              onChange={(event) => updateField("siteName", event.target.value)}
              placeholder="Site name"
            />
            <input
              className={inputClassName}
              value={form.siteUrl}
              onChange={(event) => updateField("siteUrl", event.target.value)}
              placeholder="Site URL"
            />
            <input
              className={inputClassName}
              value={form.supportEmail}
              onChange={(event) => updateField("supportEmail", event.target.value)}
              placeholder="Support email"
            />
            <input
              className={inputClassName}
              value={form.contactEmail}
              onChange={(event) => updateField("contactEmail", event.target.value)}
              placeholder="Contact email"
            />
            <input
              className={inputClassName}
              value={form.contactPhone}
              onChange={(event) => updateField("contactPhone", event.target.value)}
              placeholder="Contact phone"
            />
            <input
              className={inputClassName}
              value={form.addressLine1}
              onChange={(event) => updateField("addressLine1", event.target.value)}
              placeholder="Address line 1"
            />
            <input
              className={inputClassName}
              value={form.addressLine2}
              onChange={(event) => updateField("addressLine2", event.target.value)}
              placeholder="Address line 2"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClassName}
                value={form.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="City"
              />
              <input
                className={inputClassName}
                value={form.state}
                onChange={(event) => updateField("state", event.target.value)}
                placeholder="State"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClassName}
                value={form.postalCode}
                onChange={(event) => updateField("postalCode", event.target.value)}
                placeholder="Postal code"
              />
              <input
                className={inputClassName}
                value={form.country}
                onChange={(event) => updateField("country", event.target.value)}
                placeholder="Country"
              />
            </div>
            <textarea
              className={`${inputClassName} min-h-32 resize-none`}
              value={form.footerDisclaimer}
              onChange={(event) => updateField("footerDisclaimer", event.target.value)}
              placeholder="Footer disclaimer"
            />
            <div className="space-y-3">
              {message ? <p className="text-sm text-accent">{message}</p> : null}
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#008f8f] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        )}
      </ContentPanel>
      <ContentPanel
        title="Workflow Preferences"
        description="Draft review notifications, internal note visibility, and publication confirmation settings."
      >
        {loading ? (
          <p className="text-sm text-muted">Loading workflow preferences...</p>
        ) : !form ? (
          <p className="text-sm text-red-500">{error ?? "Workflow preferences are unavailable right now."}</p>
        ) : (
          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-4xl border border-line p-4 text-sm text-primary">
              <input
                type="checkbox"
                checked={form.workflowSettings.requireReviewBeforePublish}
                onChange={(event) => updateWorkflowSetting("requireReviewBeforePublish", event.target.checked)}
                className="h-4 w-4 accent-[#00A6A6]"
              />
              Require review before publish
            </label>
            <label className="flex items-center gap-3 rounded-4xl border border-line p-4 text-sm text-primary">
              <input
                type="checkbox"
                checked={form.workflowSettings.emailAdvisorOnConsultationRequest}
                onChange={(event) => updateWorkflowSetting("emailAdvisorOnConsultationRequest", event.target.checked)}
                className="h-4 w-4 accent-[#00A6A6]"
              />
              Email advisor on consultation request
            </label>
            <label className="flex items-center gap-3 rounded-4xl border border-line p-4 text-sm text-primary">
              <input
                type="checkbox"
                checked={form.workflowSettings.sendSeoChecksOnArticleSave}
                onChange={(event) => updateWorkflowSetting("sendSeoChecksOnArticleSave", event.target.checked)}
                className="h-4 w-4 accent-[#00A6A6]"
              />
              Send SEO checks on article save
            </label>
          </div>
        )}
      </ContentPanel>
    </div>
  );
}

const inputClassName =
  "w-full rounded-[1.35rem] border border-line bg-[#f8fbfc] px-4 py-3 text-sm text-primary outline-none";
