# Blog posts

Add markdown files to this directory to publish new blog posts. Each file becomes one post on the site.

## Frontmatter

Every post must start with YAML frontmatter:

```markdown
---
title: Your Post Title
date: 2026-06-02
excerpt: A short summary shown in the blog list.
tags: project, research
pinned: true
---

Your markdown content goes here.
```

## Fields

| Field     | Required | Description |
| --------- | -------- | ----------- |
| `title`   | yes      | Post title |
| `date`    | yes      | ISO date (`YYYY-MM-DD`) for sorting among non-pinned posts |
| `excerpt` | no       | Preview text on the blog index |
| `tags`    | no       | Comma-separated labels (e.g. `matcha, food`). Shown on the index and post header; used for filtering on the blog page |
| `pinned`  | no       | Set to `true` to keep this post at the top of the list (pinned posts still sort by date among themselves) |

### `tags`

Use lowercase, hyphenated names when you can (e.g. `open-source`, `matcha`). Example:

```yaml
tags: matcha, san-francisco, food
```

### `pinned`

Any of these count as pinned: `true`, `yes`, or `1`. Anything else (or omitting the field) is treated as not pinned.

```yaml
pinned: true
```

Files named `README.md` are ignored. Use kebab-case filenames (e.g. `my-first-post.md`).
