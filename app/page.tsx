'use client';

import { useEffect } from 'react';
import { defaultLocale } from '@/i18n/routing';

// Static-export-friendly root redirect to the default locale.
export default function RootRedirect() {
  useEffect(() => {
    window.location.replace(`/${defaultLocale}/`);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <p>
        Redirecting to <a href={`/${defaultLocale}/`}>/{defaultLocale}/</a>…
      </p>
    </main>
  );
}
