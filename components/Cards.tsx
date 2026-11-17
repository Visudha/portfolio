import Link from 'next/link';
import { dims, inline } from '@/lib/content';

function Img({ src, alt = '' }: { src: string; alt?: string }) {
  const d = dims(src);
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading="lazy" decoding="async" {...(d ? { width: d.w, height: d.h } : {})} />;
}

export function ProjectCard({ p }: { p: any }) {
  const c = p.card;
  if (c.style === 'image' && c.thumb) {
    return (
      <li>
        <Link className="card card-img" href={`/${p.slug}`} aria-label={c.thumb_alt}>
          <Img src={c.thumb} alt={c.thumb_alt} />
        </Link>
      </li>
    );
  }
  return (
    <li>
      <Link className="card card-text" href={`/${p.slug}`} style={{ ['--bg' as any]: c.bg || '#e6e1d8' }}>
        <span className="card-label mono">
          <b>{c.label_bold || p.title}</b>
          {c.label_rest ? ` - ${c.label_rest}` : ''}
        </span>
        <span className="card-title">{c.headline || p.subtitle}</span>
        <span className="card-cta">View case study <span aria-hidden="true">→</span></span>
        {c.media ? <span className="card-media"><Img src={c.media} /></span> : null}
      </Link>
    </li>
  );
}

export function EtalCard({ e }: { e: any }) {
  const external = !!e.external_url;
  const href = external ? e.external_url : `/${e.slug}`;
  const inner = e.thumb ? (
    <Img src={e.thumb} alt={e.title} />
  ) : null;
  if (e.thumb) {
    return (
      <li>
        {external ? (
          <a className="card card-img" href={href} rel="noopener" aria-label={e.title}>{inner}</a>
        ) : (
          <Link className="card card-img" href={href} aria-label={e.title}>{inner}</Link>
        )}
      </li>
    );
  }
  const body = (
    <>
      <span className="card-title">{e.title}</span>
      <span className="card-cta">{e.cta || 'View project'} <span aria-hidden="true">→</span></span>
    </>
  );
  const style = { ['--bg' as any]: e.card_color || '#e6e1d8' };
  return (
    <li>
      {external ? (
        <a className="card card-text" href={href} rel="noopener" style={style}>{body}</a>
      ) : (
        <Link className="card card-text" href={href} style={style}>{body}</Link>
      )}
    </li>
  );
}
