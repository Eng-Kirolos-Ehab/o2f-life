# O2F.life — Coach Osama Omran

Official bilingual (AR/EN) website for Coach Osama Omran — online fitness, nutrition and naturopathic coaching.

## Stack

- Eleventy 3 (static site generator)
- Tailwind CSS 3 (design system)
- Nunjucks templates (`.njk`)
- Decap CMS (GitHub-backed content editing at `/admin/`)
- Deployed to GitHub Pages on custom domain `o2f.life`

## Local development

```bash
npm install
npm run dev     # starts Eleventy + Tailwind watchers on http://localhost:8080
```

Build production output:

```bash
npm run build   # emits _site/
```

## Project layout

```
site/
├── src/
│   ├── _data/site.json          # global settings (edited via CMS)
│   ├── _includes/
│   │   ├── layouts/base.njk     # base HTML shell + SEO + JSON-LD
│   │   └── partials/            # header, footer, whatsapp float
│   ├── assets/
│   │   ├── css/main.css         # Tailwind + custom components
│   │   ├── js/main.js           # mobile menu + language switcher
│   │   └── images/              # media (logo, OG, page images)
│   ├── ar/                      # Arabic pages (RTL)
│   ├── en/                      # English pages (LTR)
│   └── index.njk                # root language-chooser redirect
├── admin/                       # Decap CMS (/admin/)
├── .eleventy.js
├── tailwind.config.js
└── package.json
```

## Content editing

Non-developers can edit pages, posts and site settings at **https://o2f.life/admin/**
(requires GitHub login). All edits open as Pull Requests via the editorial workflow.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`,
which builds the site and deploys to GitHub Pages.

## Languages

- `ar/` → Arabic, RTL, Tajawal font
- `en/` → English, LTR, Inter + Space Grotesk

Each directory has an `ar.json` / `en.json` data file that sets the language,
layout and permalink pattern for all pages inside.
