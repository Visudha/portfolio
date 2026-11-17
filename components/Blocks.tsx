import { inline } from '@/lib/content';
import Fig from './Fig';

/** Renders the ordered list of content blocks edited in the CMS. */
export default function Blocks({ blocks }: { blocks: any[] }) {
  return (
    <>
      {(blocks || []).map((b, i) => {
        switch (b.type) {
          case 'heading':
            return b.level === 'h3' ? <h3 key={i}>{b.text}</h3> : <h2 key={i}>{b.text}</h2>;
          case 'paragraph':
            return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b.text) }} />;
          case 'note':
            return <p key={i} className="note" dangerouslySetInnerHTML={{ __html: inline(b.text) }} />;
          case 'ask':
            return <p key={i} className="ask">{b.text}</p>;
          case 'image':
            return <Fig key={i} src={b.src} alt={b.alt} caption={b.caption} />;
          case 'video':
            return <Fig key={i} src={b.src} poster={b.poster} alt={b.alt} video />;
          case 'images':
            return (
              <div key={i} className="fig-row">
                {(b.items || []).map((it: any, j: number) => (
                  <Fig key={j} src={it.src} alt={it.alt} />
                ))}
              </div>
            );
          case 'quote':
            return (
              <blockquote key={i}>
                <p>{b.text}</p>
                {b.who ? <cite>{b.who}</cite> : null}
              </blockquote>
            );
          case 'list': {
            const Tag: any = b.ordered ? 'ol' : 'ul';
            return (
              <Tag key={i}>
                {(b.items || []).map((t: string, j: number) => (
                  <li key={j}>{t}</li>
                ))}
              </Tag>
            );
          }
          case 'stats':
            return (
              <ul key={i} className="stats">
                {(b.items || []).map((s: any, j: number) => (
                  <li key={j}>
                    <strong>{s.number}</strong>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
            );
          case 'principles':
            return (
              <ul key={i} className="principles">
                {(b.items || []).map((p: any, j: number) => (
                  <li key={j}>
                    {p.src ? <img src={p.src} alt="" loading="lazy" decoding="async" /> : null}
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
