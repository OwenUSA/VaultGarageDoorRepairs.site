import type { MetadataRoute } from 'next';
import { site, routes } from '@/lib/site';

/** Built from lib/site.ts `routes` — the resolved 17-row table. One source. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: new URL(r.path, site.url).toString(),
    lastModified: now,
    changeFrequency: r.path === '/' ? 'weekly' : 'monthly',
    priority: r.priority,
  }));
}

// output: "export" cannot infer this metadata route is static; say so explicitly.
export const dynamic = "force-static";
