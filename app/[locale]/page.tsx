import { getTranslations, setRequestLocale } from 'next-intl/server';
import SectionNav from '@/components/SectionNav';
import { personJsonLd } from '@/lib/person-jsonld';

type Metric = { n: string; l: string };
type Job = {
  role: string;
  org: string;
  place: string;
  dates: string;
  desc: string;
};
type Edu = { year: string; title: string; org: string; desc: string };

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/drckarakaya',
  github: 'https://github.com/tr2uk',
  orcid: 'https://orcid.org/0000-0002-9227-9170',
  scholar: 'https://scholar.google.com/citations?user=7BVbtHsAAAAJ',
  amazon: 'https://amzn.eu/d/0b2gFaqI',
  b2verify: 'https://www.b2verify.com/',
  featuredPost: 'https://lnkd.in/p/eMeKYrqp',
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-2xl font-bold text-primary sm:text-3xl">
          <span className="border-b-4 border-accent pb-1">{title}</span>
        </h2>
        {children}
      </div>
    </section>
  );
}

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  const expertise = t.raw('about.expertise') as string[];
  const impact = t.raw('about.impact') as Metric[];
  const jobs = t.raw('experience.items') as Job[];
  const edu = t.raw('education.items') as Edu[];
  const books = t.raw('publications.books') as string[];
  const patents = t.raw('publications.patents') as string[];
  const firsts = t.raw('achievements.firsts') as string[];
  const leadership = t.raw('achievements.leadership') as string[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />

      {/* Hero */}
      <header className="bg-primary text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-16 sm:flex-row sm:items-center sm:py-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/photo.jpg"
            alt={t('hero.name')}
            className="h-40 w-40 flex-none rounded-full border-4 border-white/80 object-cover shadow-xl sm:h-48 sm:w-48"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('hero.name')}
            </h1>
            <p className="mt-3 max-w-xl text-base font-light text-slate-300">
              {t('hero.tagline')}
            </p>
            <p className="mt-2 text-sm text-slate-400">{t('hero.location')}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm sm:justify-start">
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-accent/60 px-4 py-1.5 font-medium text-accent hover:bg-accent hover:text-primary">
                {t('hero.links.linkedin')}
              </a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-4 py-1.5 text-slate-200 hover:border-white/60">
                {t('hero.links.github')}
              </a>
              <a href={LINKS.orcid} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-4 py-1.5 text-slate-200 hover:border-white/60">
                {t('hero.links.orcid')}
              </a>
              <a href={LINKS.scholar} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/25 px-4 py-1.5 text-slate-200 hover:border-white/60">
                {t('hero.links.scholar')}
              </a>
            </div>
          </div>
        </div>
      </header>

      <SectionNav current={locale} />

      {/* About */}
      <Section id="about" title={t('about.heading')}>
        <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
          {t('about.summary')}
        </p>
        <p className="mt-5 inline-block rounded-md bg-primary/5 px-4 py-2 font-medium text-primary">
          {t('about.engineeringLogic')}
        </p>

        <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          {t('about.impactHeading')}
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {impact.map((m, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <div className="text-2xl font-bold text-primary">{m.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                {m.l}
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          {t('about.expertiseHeading')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {expertise.map((x, i) => (
            <span key={i} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
              {x}
            </span>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <div className="bg-slate-50">
        <Section id="experience" title={t('experience.heading')}>
          <div className="space-y-6">
            {jobs.map((j, i) => (
              <div key={i} className="rounded-lg border-l-4 border-accent bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-primary">{j.role}</h3>
                  <span className="text-sm text-slate-500">{j.dates}</span>
                </div>
                <p className="mt-0.5 font-medium text-slate-700">
                  {j.org === 'B2Verify' ? (
                    <a href={LINKS.b2verify} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-accent underline-offset-2 hover:text-accent">
                      {j.org}
                    </a>
                  ) : (
                    j.org
                  )}{' '}
                  · <span className="text-slate-500">{j.place}</span>
                </p>
                <p className="mt-2 text-slate-600">{j.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Education */}
      <Section id="education" title={t('education.heading')}>
        <div className="grid gap-5 sm:grid-cols-3">
          {edu.map((e, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-5">
              <div className="text-2xl font-bold text-accent">{e.year}</div>
              <h3 className="mt-1 font-semibold text-primary">{e.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{e.org}</p>
              <p className="mt-2 text-sm text-slate-600">{e.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Publications & Patents */}
      <div className="bg-slate-50">
        <Section id="publications" title={t('publications.heading')}>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {t('publications.booksHeading')}
              </h3>
              <ul className="space-y-2">
                {books.map((b, i) => (
                  <li key={i} className="text-slate-700">
                    • {b}
                  </li>
                ))}
              </ul>
              <a href={LINKS.amazon} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
                {t('publications.bairdLink')}
              </a>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {t('publications.patentsHeading')}
              </h3>
              <ul className="space-y-2">
                {patents.map((p, i) => (
                  <li key={i} className="text-slate-700">
                    • {p}
                  </li>
                ))}
              </ul>
              <h3 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wider text-slate-500">
                {t('publications.papersHeading')}
              </h3>
              <p className="text-slate-700">{t('publications.papers')}</p>
            </div>
          </div>
        </Section>
      </div>

      {/* Achievements */}
      <Section id="achievements" title={t('achievements.heading')}>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          {t('achievements.firstsHeading')}
        </h3>
        <ul className="space-y-3">
          {firsts.map((f, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <span className="mt-1 text-accent">★</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          {t('achievements.leadershipHeading')}
        </h3>
        <ul className="space-y-2">
          {leadership.map((l, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <footer id="contact" className="scroll-mt-20 bg-primary text-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-8 text-2xl font-bold text-white sm:text-3xl">
            <span className="border-b-4 border-accent pb-1">
              {t('contact.heading')}
            </span>
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-slate-400">{t('contact.emailLabel')}: </span>
                <a href={`mailto:${t('contact.email')}`} className="text-accent hover:underline">
                  {t('contact.email')}
                </a>
              </p>
              <p>
                <span className="text-slate-400">{t('contact.phoneLabel')}: </span>
                <a href={`tel:${t('contact.phone').replace(/\s/g, '')}`} className="hover:text-white">
                  {t('contact.phone')}
                </a>
              </p>
              <p>
                <span className="text-slate-400">{t('contact.githubLabel')}: </span>
                <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {t('contact.github')}
                </a>
              </p>
              <p>
                <span className="text-slate-400">{t('contact.b2verifyLabel')}: </span>
                <a href={LINKS.b2verify} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  b2verify.com
                </a>
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-white">
                  {t('contact.linkedinHeading')}
                </h3>
                <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary hover:opacity-90">
                  {t('contact.follow')}
                </a>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {t('contact.linkedinHandle')}
              </p>

              <h4 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t('contact.featuredHeading')}
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {[{ href: LINKS.featuredPost }].map((post, i) => (
                  <a
                    key={i}
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-white/25 bg-white/5 p-4 transition-colors hover:border-accent/60 hover:bg-white/10"
                  >
                    <div className="text-sm font-medium text-slate-200">
                      {t('contact.featuredCardLabel')}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-accent">
                      {t('contact.featuredCta')}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
            © 2026 {t('hero.name')} · TR2UK. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </>
  );
}
