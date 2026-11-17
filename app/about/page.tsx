import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Chrome';
import Fig from '@/components/Fig';
import { getPage } from '@/lib/content';

const a = getPage('about');

export const metadata: Metadata = { title: a.seo_title, description: a.seo_description };

export default function About() {
  return (
    <>
      <Header active="about" />
      <main id="main">
        <article className="about">
          <div className="wrap">
            <div className="about-grid">
              <div className="about-text">
                <p className="mono eyebrow">{a.eyebrow}</p>
                <h1>{a.heading}</h1>
                <p>{a.intro}</p>
              </div>
              <Fig src={a.portrait?.src} poster={a.portrait?.poster} alt={a.portrait?.alt} cls="portrait" video />
            </div>
            <div className="about-more">
              <p className="mono eyebrow">{a.more_eyebrow}</p>
              {(a.more || []).map((t: string, i: number) => (
                <p key={i}>{t}</p>
              ))}
              <div className="fig-row">
                {(a.books || []).map((b: any, i: number) => (
                  <Fig key={i} src={b.src} alt={b.alt} />
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
