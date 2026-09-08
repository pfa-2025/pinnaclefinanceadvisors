/**
 * WordPress mShots renders a live screenshot of any public URL, free and keyless.
 * An unseen URL returns a "Generating Preview..." placeholder for ~15-20s before the
 * real screenshot is ready; subsequent requests (from anyone) get the cached render.
 */
export function getWebsitePreviewUrl(url: string, width = 1000, height = 625): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`;
}
