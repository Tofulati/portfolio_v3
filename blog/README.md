# Blog posts

Add markdown files to this directory to publish new blog posts. Each file becomes one post on the site.

## Frontmatter

Every post must start with YAML frontmatter:

```markdown
---
title: Your Post Title
date: 2026-06-02
excerpt: A short summary shown in the blog list.
---

Your markdown content goes here.
```

## Fields

| Field    | Required | Description                          |
| -------- | -------- | ------------------------------------ |
| `title`  | yes      | Post title                           |
| `date`   | yes      | ISO date (`YYYY-MM-DD`) for sorting  |
| `excerpt`| no       | Preview text on the blog index       |

Files named `README.md` are ignored. Use kebab-case filenames (e.g. `my-first-post.md`).
