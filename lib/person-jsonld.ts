// JSON-LD Person schema (same entity across locales).
export function personJsonLd(locale: string) {
  const jobTitle =
    locale === 'tr'
      ? 'Makine Mühendisi · Ar-Ge ve İnovasyon Proje Yöneticisi'
      : 'Mechanical Engineer · R&D and Innovation Project Manager';

  const honorificPrefix =
    locale === 'tr' ? 'Doç. Dr.' : 'Associate Professor Dr';

  // Personal name is anglicised on the EN surface; TR keeps the diacritic.
  const name = locale === 'tr' ? 'Çetin Karakaya' : 'Cetin Karakaya';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    alternateName: 'Çetin Karakaya',
    honorificPrefix,
    jobTitle,
    url: 'https://founder.tr2uk.com',
    image: 'https://founder.tr2uk.com/assets/photo.jpg',
    worksFor: {
      '@type': 'Organization',
      name: 'TR2UK',
      url: 'https://tr2uk.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bexhill-on-Sea',
      addressRegion: 'East Sussex',
      addressCountry: 'GB',
    },
    sameAs: [
      'https://orcid.org/0000-0002-9227-9170',
      'https://scholar.google.com/citations?user=7BVbtHsAAAAJ',
      'https://www.scopus.com/authid/detail.uri?authorId=57372110000',
      'https://www.linkedin.com/in/drckarakaya',
      'https://github.com/tr2uk',
    ],
  };
}
