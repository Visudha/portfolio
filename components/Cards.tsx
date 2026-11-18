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
