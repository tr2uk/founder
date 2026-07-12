import { defaultLocale } from '@/i18n/routing';

// Root redirect to the default locale. Renders its own document because the
// root layout is a passthrough (per-locale <html> lives under app/[locale]).
export default function RootRedirect() {
  const target = `/${defaultLocale}/`;
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
      </head>
      <body>
        <p style={{ fontFamily: 'sans-serif', padding: 24 }}>
          Redirecting to <a href={target}>{target}</a>…
        </p>
      </body>
    </html>
  );
}
