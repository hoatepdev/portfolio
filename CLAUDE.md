# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tong quan du an

Website portfolio va blog ca nhan cua Hoa T. (Thomas) Nguyen, fullstack developer. Du an dung de gioi thieu ky nang, du an ca nhan, va chia se bai viet ky thuat.

- **Website:** https://www.hoatepdev.com
- **License:** CC-BY-4.0
- **Inspired by:** [@1chooo](https://github.com/1chooo)

## Tech Stack

| Layer           | Technology                                                             |
| --------------- | ---------------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router) + React 19 + TypeScript 5.8                    |
| Styling         | Tailwind CSS 4 + PostCSS, dark theme (Onyx/Jet/Red/Yellow)             |
| UI Components   | Radix UI + shadcn/ui (style "new-york") + CVA                          |
| Animation       | motion (Framer Motion), react-spring, tailwindcss-animate              |
| Content         | Markdown (blog) + MDX (portfolio), gray-matter, remark/rehype pipeline |
| Analytics       | Google Analytics, GTM, Vercel Analytics                                |
| Comments        | Giscus (GitHub Discussions)                                            |
| Email           | EmailJS (contact form)                                                 |
| Deployment      | Docker + Nginx + Let's Encrypt SSL, GitHub Actions deploy to VPS       |
| Package Manager | pnpm 10.11.0 + Turborepo                                               |
| Node            | >= 20                                                                  |

## Build & Development Commands

```bash
pnpm install                        # Install dependencies
pnpm dev                            # Dev server at localhost:4000 (Turbopack)
pnpm build                          # Build all packages
pnpm lint                           # Lint all packages
pnpm lint:fix                       # Auto-fix lint (apps/web + packages/ui)
pnpm format                         # Format code (Prettier)
pnpm --filter apps-web check-types  # Type-check web app
```

Filter by workspace:

```bash
pnpm --filter apps-web dev
pnpm --filter apps-web build
pnpm --filter @workspace/ui build
```

## Monorepo Architecture

```
portfolio/
├── apps/web/                    # Main Next.js application
│   ├── src/
│   │   ├── app/                 # App Router (route groups below)
│   │   ├── components/          # React components by feature
│   │   ├── contents/            # Blog & portfolio content (MD/MDX)
│   │   ├── config/index.ts      # Central config (nav, contacts, skills, metadata)
│   │   ├── lib/                 # Utility functions
│   │   ├── hooks/               # Custom React hooks
│   │   └── types/               # TypeScript types
│   ├── public/                  # Static assets (images, favicon)
│   ├── tailwind.config.ts       # Theme: colors, breakpoints, animations
│   ├── next.config.ts           # SVG, unoptimized images, transpile @workspace/ui
│   └── Dockerfile               # Multi-stage build (node:20-alpine)
├── packages/
│   ├── ui/                      # Shared UI library (@workspace/ui)
│   ├── eslint-config/           # Shared ESLint config (base, next, react-internal)
│   └── typescript-config/       # Shared tsconfig presets (base, nextjs, react-library)
├── scripts/
│   ├── gen-config.js            # Generate config from content files
│   └── renew-copy-reload.sh     # Copy Let's Encrypt cert & reload nginx
├── nginx/                       # Nginx reverse proxy config + SSL
├── docker-compose.yml           # Services: nginx (8080/443) + web (4001->4000)
└── turbo.json                   # Turborepo pipeline config
```

## Routing (App Router)

Route groups in `apps/web/src/app/`:

| Route Group   | Routes                                                                                                              | Description                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `(home)/`     | `/`, `/resume`, `/portfolio`, `/portfolio/[slug]`, `/post`, `/post/[slug]`, `/contact`, `/gallery`, `/cv`, `/terms` | Main portfolio pages        |
| `(exp)/`      | `/react-scroll-motion`, `/remark`                                                                                   | Experimental/demo routes    |
| `(metadata)/` |                                                                                                                     | Metadata routes             |
| `og/`         |                                                                                                                     | Open Graph image generation |

Main layout (`(home)/layout.tsx`): SideBar, HomeHeader, ParticleBackground, Google Analytics/GTM, JSON-LD, Vercel Analytics.

## Content System

### Blog Posts (`src/contents/posts/`)

- Markdown files with YAML front matter
- Parsed by `gray-matter`, rendered with `react-markdown`
- Syntax highlighting: `react-syntax-highlighter`
- GitHub-style alerts: `rehype-github-alerts`

### Portfolio (`src/contents/portfolios/`)

- MDX files (Markdown + JSX components)
- Each project is a single `.mdx` file with metadata

### Central Config (`src/config/index.ts`)

- Contains all: navigation links, contacts, social links, about info, resume/experience, tech stacks, Giscus config, SEO metadata, JSON-LD schema
- This is the single source of truth for site-wide data

## Styling

- **Tailwind CSS 4** with PostCSS
- **Dark theme by default** with custom palette:
  - Primary: Red `hsl(0, 43%, 51%)`
  - Accent: Yellow/Gold `hsl(45, 100%, 72%)`
  - Background: Onyx, Jet, Eerie Black
- **Custom breakpoints:** `custom-md` (580px), `custom-lg` (1250px)
- **CSS variables** for theming in `globals.css`
- **Custom animations:** marquee, gradient, particles
- Config at `apps/web/tailwind.config.ts`

## Shared UI Package (`packages/ui/`)

Imported as `@workspace/ui`. Built on Radix UI primitives with `class-variance-authority` for variants. Transpiled by Next.js via `transpilePackages` in `next.config.ts`.

## Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env`:

| Variable                                | Description           |
| --------------------------------------- | --------------------- |
| `NEXT_PUBLIC_GA_ID`                     | Google Analytics ID   |
| `NEXT_PUBLIC_GTM_ID`                    | Google Tag Manager ID |
| `NEXT_PUBLIC_GISCUS_CONFIG_REPO_ID`     | Giscus repo ID        |
| `NEXT_PUBLIC_GISCUS_CONFIG_CATEGORY_ID` | Giscus category ID    |
| `EMAILJS_SERVICE_ID`                    | EmailJS service ID    |
| `EMAILJS_TEMPLATE_ID`                   | EmailJS template ID   |
| `EMAILJS_PUBLIC_KEY`                    | EmailJS public key    |

## Code Conventions

### Commits

Conventional Commits enforced by `commitlint` + `husky`. Max header: 100 chars.

Format: `type(scope): description`

Allowed types: `feat`, `fix`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, `major`, `minor`, `patch`

### Formatting

- Prettier: double quotes, 2-space indent, 80 char width, trailing comma ES5
- Import order: `@/` imports first, relative imports second (`@trivago/prettier-plugin-sort-imports`)
- Tailwind class sorting (`prettier-plugin-tailwindcss`)
- Pre-commit: `lint-staged` runs ESLint fix + Prettier on staged `.ts`/`.tsx`

### Branch Strategy

- `develop` — main development branch
- `production` — production branch, triggers deploy on PR merge

## Deployment

### Docker

- Multi-stage build: `node:20-alpine`, memory limit 1024MB
- `docker-compose.yml`: nginx (reverse proxy + SSL) + web (Next.js)
- Port mapping: nginx 8080/443, web 4001 -> 4000

### CI/CD (GitHub Actions)

- **`main.yml`**: SSH deploy to VPS on PR merge to `production` — pull code, rebuild Docker, restart containers, health check, cleanup old images
- **`auto-tag.yml`**: Auto-create semver tags based on PR title/labels on merge to `production` (major/minor/patch)

### SSL

- Let's Encrypt certificates for `p.hoatepdev.site`
- `scripts/renew-copy-reload.sh`: copy new certs and reload nginx container
