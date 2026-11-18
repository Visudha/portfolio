import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Chrome';
import Blocks from '@/components/Blocks';
import Fig from '@/components/Fig';
import { getProject, getProjects, lines } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (!found) return {};
  const p = found.project;
  const img = p.hero?.src || p.card?.thumb || p.card?.media;
  return {
    title: p.title,
    description: p.description,
    openGraph: { title: p.title, description: p.description, images: img ? [img] : undefined },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const found = getProject(slug)!;
  const { project: p, next } = found;
  return (
    <>
      <Header active="work" />
      <main id="main">
        <article className="case">
          <div className="wrap">
            <header className="case-head">
              <p className="mono eyebrow">{p.eyebrow}</p>
              <h1>{p.title}</h1>
              <p className="sub">{p.subtitle}</p>
              {(p.intro || []).map((t: string, i: number) => (
                <p key={i} className="lead">{t}</p>
              ))}
            </header>
            {p.meta?.length ? (
              <dl className="meta">
                {p.meta.map((m: any, i: number) => (
                  <div key={i}>
                    <dt className="mono">{m.label}</dt>
                    <dd dangerouslySetInnerHTML={{ __html: lines(m.value) }} />
                  </div>
                ))}
              </dl>
            ) : null}
            {p.hero?.src ? <Fig src={p.hero.src} alt={p.hero.alt} cls="hero" eager /> : null}
            <div className="prose">
              <Blocks blocks={p.blocks} />
            </div>
          </div>
        </article>
      </main>
      <Footer next={next} />
    </>
  );
}
