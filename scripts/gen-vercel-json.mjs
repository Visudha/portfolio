// Builds vercel.json from content: old-URL redirects and cache headers.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const dir = path.join(process.cwd(), 'content', 'projects');
const redirects = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.yml'))) {
  const p = YAML.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const old of p.redirects_from || []) {
    redirects.push({ source: `/${old}`, destination: `/${p.slug}`, permanent: true });
  }
}
const vercel = {
  cleanUrls: true,
  trailingSlash: false,
  redirects,
  headers: [
    { source: '/img/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] },
  ],
};
fs.writeFileSync(path.join(process.cwd(), 'vercel.json'), JSON.stringify(vercel, null, 2) + '\n');
console.log(`vercel.json written with ${redirects.length} redirects`);
