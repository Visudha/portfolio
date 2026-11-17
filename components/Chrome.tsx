import Link from 'next/link';
import { getSettings } from '@/lib/content';

export function Header({ active }: { active?: string }) {
  const s = getSettings();
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link className="logo" href="/">{s.site_name}</Link>
        <nav aria-label="Main">
          {s.nav.map((n: any) => {
            const cur = active === n.label ? { 'aria-current': 'page' as const } : {};
            return n.url.startsWith('/') && !n.url.includes('.') ? (
              <Link key={n.label} href={n.url} {...cur}>{n.label}</Link>
            ) : (
              <a key={n.label} href={n.url} {...cur}>{n.label}</a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export function Footer({ next }: { next?: { slug: string; title: string; next_label?: string } | null }) {
  const s = getSettings();
  return (
    <footer className="site-footer">
      <div className="wrap">
        {next ? (
          <Link className="next" href={`/${next.slug}`}>
            <span className="mono">Next project</span>
            <span className="next-title">
              {next.next_label || next.title} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ) : null}
        <div className="connect">
          <h2>{s.connect_title}</h2>
          <p className="links">
            <a href={`mailto:${s.email}`}>Email</a>
            <a href={s.linkedin} rel="noopener">LinkedIn</a>
          </p>
        </div>
        <p className="credit mono">{s.credit}</p>
      </div>
    </footer>
  );
}
