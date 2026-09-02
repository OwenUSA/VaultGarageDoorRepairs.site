/**
 * lib/schema.ts — structured data, built ONLY from lib/site.ts.
 *
 * CONFIG FORBIDDEN applies to schema exactly as it applies to visible copy:
 *   - no `aggregateRating`, no `review`  (reviews / ratings)
 *   - no `award`, no `hasCredential`, no `brand` partnership claims
 *   - no `priceRange`, no `offers.price`, no discounts
 *   - no `foundingDate`, no `numberOfEmployees`  (years in business / counts)
 *   - no `employee` / `founder` / `member`       (named real people)
 *   - no `warranty`
 *   - no `streetAddress`                          (service-area only)
 * If you are adding a property, check it against CONFIG FORBIDDEN first.
 */

import { site, nap, hours, services, faqs, serviceAreas } from './site';

const abs = (path: string) => new URL(path, site.url).toString();

/**
 * A service-area business. `areaServed` carries the coverage; there is
 * deliberately no `address.streetAddress` and no `geo` point, because CONFIG
 * says service-area only and never a street address.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': abs('/#business'),
    name: nap.name,
    url: site.url,
    telephone: nap.phone,
    email: nap.email,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: nap.locality,
      addressRegion: nap.region,
      addressCountry: nap.country,
    },
    areaServed: serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
    openingHoursSpecification: hours.officeSpec.map((s) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
    availableLanguage: 'en',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Garage door services',
      // Offers carry no price: CONFIG FORBIDDEN covers price claims.
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
    areaServed: serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
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
