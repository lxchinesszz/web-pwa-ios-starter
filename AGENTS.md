# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React 19 application written in TypeScript. Application code lives in `src/`: `main.tsx` mounts the app, `App.tsx` contains the root component, and component-level and global styles are in `App.css` and `index.css`. Keep imported images in `src/assets/`; place files that must retain stable public URLs, such as icons and favicons, in `public/`. Build and TypeScript configuration lives at the repository root. Generated output belongs in `dist/` and must not be edited or committed.

## Build, Test, and Development Commands

Use the package scripts defined in `package.json`:

- `pnpm install` links dependencies from pnpm's shared content-addressable store using `pnpm-lock.yaml`.
- `pnpm clean` removes the generated `dist/` directory.
- `pnpm dev` starts the Vite development server with hot module replacement.
- `pnpm build` type-checks the project with `tsc -b`, then creates a production bundle.
- `pnpm generate:pwa-assets` regenerates install icons from `public/favicon.svg`.
- `pnpm lint` runs ESLint across TypeScript and React files.
- `pnpm preview` serves the production build locally for final verification.

Run `pnpm lint && pnpm build` before submitting changes.

## Coding Style & Naming Conventions

Follow the existing style: two-space indentation, single quotes, no semicolons, and trailing commas in multiline constructs. Name React components and their files in PascalCase (`UserCard.tsx`), functions and variables in camelCase, and CSS classes in kebab-case. Keep components focused, use functional components and hooks, and place component-specific styles beside the component. ESLint enforces recommended JavaScript, TypeScript, React Hooks, and Vite React Refresh rules. TypeScript also rejects unused locals and parameters.

## Testing Guidelines

No automated test framework or coverage threshold is configured yet. Until one is added, validate every change with linting, a production build, and manual checks through `pnpm dev` or `pnpm preview`. If introducing tests, prefer colocated names such as `App.test.tsx`, add the runner to `package.json`, and document the command in this file.

## Commit & Pull Request Guidelines

Repository history is unavailable, so use concise, imperative commit subjects such as `Add offline fallback page`. Keep each commit scoped to one logical change. Pull requests should explain the motivation and behavior change, list validation performed, link relevant issues, and include screenshots or recordings for visible UI changes. Note any dependency, configuration, or PWA caching implications explicitly.
