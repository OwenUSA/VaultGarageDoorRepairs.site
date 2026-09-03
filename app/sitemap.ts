import type { MetadataRoute } from 'next';
import { site, routes } from '@/lib/site';

/** Built from lib/site.ts `routes` — the resolved 17-row table. One source. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    // trailingSlash: true (next.config.mjs) makes nginx serve every route as
    // <path>/index.html; a sitemap entry without the trailing slash points at
    // a URL that never resolves to the canonical page.
    url: new URL(r.path === '/' ? '/' : `${r.path}/`, site.url).toString(),
    lastModified: now,
    changeFrequency: r.path === '/' ? 'weekly' : 'monthly',
    priority: r.priority,
  }));
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
