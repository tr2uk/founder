'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n/routing';

const SECTIONS = [
  'about',
  'experience',
  'education',
  'publications',
  'achievements',
  'contact',
] as const;

export default function SectionNav({ current }: { current: string }) {
  const t = useTranslations('nav');
  const pathname = usePathname() || `/${current}/`;
  const [active, setActive] = useState<string>('about');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function swapLocale(locale: string) {
    const segments = pathname.split('/');
    segments[1] = locale;
    const next = segments.join('/');
    return next.endsWith('/') ? next : `${next}/`;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4">
        <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1 py-3 text-sm">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={
                  active === id
                    ? 'font-medium text-accent'
                    : 'text-slate-300 transition-colors hover:text-white'
                }
              >
                {t(id)}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 text-sm">
          {locales.map((locale) => (
            <a
              key={locale}
              href={swapLocale(locale)}
              className={
                locale === current
                  ? 'font-bold text-accent'
                  : 'text-slate-400 hover:text-white'
              }
            >
              {locale.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
