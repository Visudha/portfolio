import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/Chrome';
import Blocks from '@/components/Blocks';
import Fig from '@/components/Fig';
import { getEtal, getProject, getProjects, lines } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  const proj = getProjects().map((p) => ({ slug: p.slug }));
  const etal = getEtal().filter((e) => !e.external_url).map((e) => ({ slug: e.slug }));
  return [...proj, ...etal];
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = getProject(slug);
  if (found) {
    const p = found.project;
    const img = p.hero?.src || p.card?.thumb || p.card?.media;
    return {
      title: p.title,
      description: p.description,
      openGraph: { title: p.title, description: p.description, images: img ? [img] : undefined },
    };
  }
  const e = getEtal().find((x) => x.slug === slug);
  return { title: e?.page_heading || e?.title, description: e?.description };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const found = getProject(slug);
  if (found) {
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

  const e = getEtal().find((x) => x.slug === slug && !x.external_url);
  if (!e) notFound();
  return (
    <>
      <Header active="et al." />
      <main id="main">
        <section className="etal">
          <div className="wrap">
            <h1>{e.page_heading || e.title}</h1>
            <div className="gallery">
              {(e.gallery || []).map((g: any, i: number) => (
                <Fig key={i} src={g.src} alt={g.alt} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
