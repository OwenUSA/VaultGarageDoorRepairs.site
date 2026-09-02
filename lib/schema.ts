/**
 * lib/schema.ts — structured data, built ONLY from lib/site.ts.
 *
 * The decision register applies to schema exactly as it applies to visible copy:
 *   - no `email`                                  (D-03)
 *   - no `aggregateRating`, no `review`           (D-13)
 *   - no `award`, no `hasCredential`              (D-14)
 *   - no `priceRange`, no `offers.price`          (D-12)
 *   - no `foundingDate`, no `numberOfEmployees`   (D-14)
 *   - no `employee` / `founder` / `member`
 *   - no city-array `areaServed`                  (D-02)
 * If you are adding a property, check it against the register first.
 */

import { site, nap, hours, services, faqs } from './site';

const abs = (path: string) => new URL(path, site.url).toString();

/**
 * `areaServed` is the single SERVICE_AREA sentence's locality, never a city
 * grid (D-02). `geo` carries MAP_COORDS, which is the only geocodable fact
 * here — the postal address is fictional and is never handed to a geocoder.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': abs('/#business'),
    name: nap.name,
    url: site.url,
    telephone: nap.phone,
    description: site.description,
    /* TODO(fact): logo asset. `logo-wordmark` is a REPLACE slot in
       assets/INVENTORY.md and the prompt for it is written in Prompt 10; until
       the file is handed back this points at the placeholder that ships. */
    image: abs('/placeholders/logo-wordmark.svg'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: nap.street,
      addressLocality: nap.locality,
      addressRegion: nap.region,
      postalCode: nap.postalCode,
      addressCountry: nap.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: nap.latitude, longitude: nap.longitude },
    areaServed: { '@type': 'Place', name: `${nap.locality}, ${nap.region}` },
    openingHoursSpecification: hours.spec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    availableLanguage: 'en',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Garage door services',
      // Offers carry no price: D-12.
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.summary },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { '@id': abs('/#business') },
  };
}

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.summary,
    serviceType: s.title,
    provider: { '@id': abs('/#business') },
    areaServed: { '@type': 'Place', name: `${nap.locality}, ${nap.region}` },
    url: abs(s.href),
  };
}

export function breadcrumbSchema(trail: { label: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: abs(t.path),
    })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
