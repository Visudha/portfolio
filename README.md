# Visudha Sathurappan, portfolio

Next.js static export. Content lives in `content/` as YAML and is edited through Decap CMS at `/admin`.

## Run it locally

```
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content in the browser

In a second terminal:

```
npx decap-server
```

Then open http://localhost:3000/admin. Local mode needs no login. Changes are written to `content/` and `public/img/`. Commit and push them to publish.

## Structure

- `content/projects/*.yml`: case studies. Each page is an ordered list of blocks.
- `content/etal/*.yml`: additional projects. Hidden unless "Show the Et al. section" is on in Site settings.
- `content/pages/*.yml` and `content/settings.yml`: home and about page text, and site settings.
- `public/admin/config.yml`: the CMS form definitions.
- `app/`, `components/`, `lib/`: the Next.js code.
- `npm run build` writes `out/` and regenerates `vercel.json` (old-URL redirects and cache headers).

## Open items

- Set `site_url` in `content/settings.yml` and `public/admin/config.yml` to the real domain.
- Hosted CMS login needs an OAuth proxy. Set `backend.base_url` in `public/admin/config.yml` when it exists.
- 17 image fields are blank. Upload them in `/admin`.
