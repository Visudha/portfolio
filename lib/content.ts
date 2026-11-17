import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { imageSize } from 'image-size';
import { marked } from 'marked';

const ROOT = path.join(process.cwd(), 'content');
const PUBLIC = path.join(process.cwd(), 'public');

function readYaml(file: string): any {
  return YAML.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
}

function readDir(dir: string): any[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.yml'))
    .map((f) => readYaml(path.join(dir, f)))
    .filter((x) => x.published !== false)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export const getSettings = () => readYaml('settings.yml');
export const getPage = (name: string) => readYaml(`pages/${name}.yml`);
export const getProjects = () => readDir('projects');
export const getEtal = () => readDir('etal');

export function getProject(slug: string) {
  const all = getProjects();
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  return { project: all[i], next: all[i + 1] ?? null };
}

/** Width and height of a file in /public, so layout does not jump while images load. */
export function dims(src: string): { w: number; h: number } | null {
  if (!src) return null;
  try {
    const buf = fs.readFileSync(path.join(PUBLIC, src));
    const s = imageSize(buf);
    return s.width && s.height ? { w: s.width, h: s.height } : null;
  } catch {
    return null;
  }
}

/** Inline markdown only (links, emphasis). Content is written by the site owner. */
export function inline(text: string): string {
  return marked.parseInline(text || '') as string;
}

export function lines(text: string): string {
  return (text || '')
    .split('\n')
    .map((l) => inline(l))
    .join('<br>');
}
