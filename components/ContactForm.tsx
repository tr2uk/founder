'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// Reuses the existing tr2uk.com Formspree endpoint.
const ENDPOINT = 'https://formspree.io/f/mjgevzna';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="cf-name">
          {t('name')}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          placeholder={t('namePlaceholder')}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="cf-phone">
          {t('phone')} <span className="text-slate-500">({t('optional')})</span>
        </label>
        <input
          id="cf-phone"
          name="phone"
          type="tel"
          placeholder={t('phonePlaceholder')}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="cf-email">
          {t('email')}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-300" htmlFor="cf-message">
          {t('message')}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          className={inputClass}
        />
      </div>

      {/* Honeypot (Formspree) — hidden from users */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      {/* Distinguishes founder enquiries from tr2uk.com */}
      <input type="hidden" name="source" value="founder.tr2uk.com" />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-md bg-accent px-5 py-2 text-sm font-semibold text-primary transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>

      {status === 'success' && (
        <p className="text-sm font-medium text-accent" role="status">
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm font-medium text-red-400" role="alert">
          {t('error')}
        </p>
      )}
    </form>
  );
}
