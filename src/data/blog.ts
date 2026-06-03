import type { BlogPost } from '../types';

export type { BlogPost };

const postModules = import.meta.glob('../../blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw.trim() };

  const meta: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    meta[line.slice(0, colonIndex).trim()] = line.slice(colonIndex + 1).trim();
  }
  return { meta, content: match[2].trim() };
}

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/, '');
}

export const blogPosts: BlogPost[] = Object.entries(postModules)
  .filter(([path]) => !path.endsWith('/README.md'))
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      title: meta.title ?? slugFromPath(path),
      date: meta.date ?? '',
      excerpt: meta.excerpt ?? '',
      content,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
