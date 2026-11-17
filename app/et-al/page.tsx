import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Chrome';
import { EtalCard } from '@/components/Cards';
import { getEtal, getPage } from '@/lib/content';

const p = getPage('etal');

export const metadata: Metadata = { title: p.seo_title, description: p.seo_description };

export default function Etal() {
  return (
    <>
      <Header active="et al." />
      <main id="main">
        <section className="etal">
          <div className="wrap">
            <h1>{p.heading}</h1>
            <p className="sub">{p.subline}</p>
            <ul className="cards cards-3">
              {getEtal().map((e) => (
                <EtalCard key={e.slug} e={e} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
