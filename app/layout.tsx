import type { Metadata } from 'next';

// Passthrough root layout — the <html>/<body> live in app/[locale]/layout.tsx
// so each locale can render its own lang attribute (fixes locale-specific casing).
export const metadata: Metadata = {
  metadataBase: new URL('https://founder.tr2uk.com'),
  title: 'Cetin Karakaya',
  description: 'Founder profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
