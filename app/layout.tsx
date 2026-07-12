import type { Metadata } from 'next';
import { Bai_Jamjuree } from 'next/font/google';
import './globals.css';

const bai = Bai_Jamjuree({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-bai',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://founder.tr2uk.com'),
  title: 'Çetin Karakaya',
  description: 'Founder profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={bai.variable}>
      <body>{children}</body>
    </html>
  );
}
