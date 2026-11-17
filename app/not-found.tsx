import Link from 'next/link';
import { Header, Footer } from '@/components/Chrome';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero">
          <div className="wrap">
            <h1>Page not found</h1>
            <p className="sub">That page does not exist. Try the <Link href="/">work</Link> page.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
