# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Dev: `npm run dev` (Turbopack). Build: `npm run build`. Lint: `npm run lint`.
- No test or typecheck script exists. Typecheck with `npx tsc --noEmit`.
- There is no CI, no test suite, and no other package/workspace — this is a single Next.js app.

## Stack quirks

- Next.js 16 with `cacheComponents` and `partialPrefetching` enabled, plus **React Compiler** (`reactCompiler: true`) — components must be pure; don't mutate props or rely on impure renders.
- Tailwind CSS **v4** (no `tailwind.config`): styles live in `src/app/globals.css`, loaded via the `@tailwindcss/turbopack` rule in `next.config.ts`. Don't add a config file or v3 directives.
- shadcn/ui is configured with the **`base-nova` style** (`components.json`): primitives are `@base-ui/react`, **not Radix**. When editing or generating `src/components/ui/*`, keep the `@base-ui/react` imports. Add components with `npx shadcn add <name>` — it reads `components.json`.
- `cn` is imported from the `cn` npm package, re-exported via `@/lib/utils`. Use `import { cn } from "@/lib/utils"`.

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts` (MongoDB adapter, hardcoded `mongodb://localhost:27017/database` — local MongoDB must be running). Client: `src/lib/auth-client.ts`. HTTP handler: `src/app/api/auth/[...all]/route.ts` — don't create additional auth routes by hand; add options in `src/lib/auth.ts`.
- `.env` holds `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`; the GitHub social provider additionally expects `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`.

## Layout

- `src/app/` — routes only (`layout.tsx`, `page.tsx`, `api/`).
- `src/components/ui/` — shadcn-generated components; treat as generated code, prefer regenerating over hand-editing.
- `src/hooks/`, `src/lib/` — app code.

## Brand Identity & Color System

- Maintain one consistent brand identity throughout the entire StudioSpace project.
- Primary Brand Color: `#6D4AFF` (Deep Violet).
- Secondary Accent Color: `#F4A340` (Warm Amber).
- Use the Primary Color consistently for buttons, links, active navigation, icons, and important UI elements.
- Use the Secondary Color only for highlights, badges, and small decorative accents.
- Maintain consistent colors across Navbar, Hero, Cards, Sections, and Footer.
- Do not randomly introduce new brand colors.
- Use neutral colors for backgrounds, borders, and text.
- Reuse existing color variables or design tokens whenever available.
- Never change the established brand colors without the user's permission.
- Keep the overall design clean, modern, professional, and visually consistent.