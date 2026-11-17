import type { Metadata } from 'next';
import { Header, Footer } from '@/components/Chrome';
import { ProjectCard } from '@/components/Cards';
import { getPage, getProjects } from '@/lib/content';

const home = getPage('home');

export const metadata: Metadata = {
  title: { absolute: home.seo_title },
  description: home.seo_description,
  openGraph: { title: home.seo_title, description: home.seo_description },
};

export default function Home() {
  const projects = getProjects();
  return (
    <>
      <Header active="work" />
      <main id="main">
        <section className="hero">
          <div className="wrap">
            <h1>
              {home.heading} <span aria-hidden="true">{home.emoji}</span>
            </h1>
            <p className="sub">{home.subline}</p>
            <p className="now mono">
              {home.now_text} <a href={home.now_link_url} rel="noopener">{home.now_link_text}</a>
            </p>
            <a className="down" href="#work" aria-label="Jump to selected work">↓</a>
          </div>
        </section>
        <section className="work" id="work">
          <div className="wrap">
            <h2 className="section-title">{home.work_title}</h2>
            <ul className="cards">
              {projects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
