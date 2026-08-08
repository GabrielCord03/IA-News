# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS (no build step), hand-picked over Next.js for deploy simplicity. Hosted on GitHub Pages, served from repo root so `site/` can fetch `../data`, `../index.json`, `../glossario.json` via relative paths.

## Users

Single user (Gabriel), personal use only. Reads the daily digest on his phone in the morning, coffee in hand, before starting the day (10-15 min read). No other audience, no login.

## Product Purpose

Radar IA is a personal daily curator for the AI world. A separate project (Hermes) researches and writes structured JSON digests once a day; this site only reads, displays, and organizes that data — no collection, no writing back to the JSON files. Over time it doubles as a searchable archive of what Gabriel has learned (history + glossary).

## Positioning

Not a generic AI newsletter reader — curated specifically around Gabriel's own learning arc: plain-language explanations of every technical term on first appearance, a glossary that grows day over day without being asked, and dedicated coverage most feeds skip (Delphi/Object Pascal + AI crossover, token/cost economy tips, model cost-benefit comparisons).

## Operating Context

Daily flow: Hermes runs once a day, writes `data/AAAA-MM-DD.json`, updates `index.json` and `glossario.json` → Gabriel does `git push` → GitHub Pages republishes automatically. Primary reading device is mobile, first thing in the morning; desktop use is secondary but must work well too. No dev server in production — pure static file serving.

## Capabilities and Constraints

- 100% static: no backend, no SSR, no serverless functions, no dynamic server routes (GitHub Pages constraint).
- Data is read-only from the site's perspective; only Hermes writes JSON. The one exception is purely client-side: marking an item as a "destaque" writes to `localStorage` in Gabriel's own browser, never back to the JSON files or any server — still no backend, no accounts, no cross-device sync.
- No authentication, no accounts, no server-side write actions of any kind.
- Client-side routing/links must use relative paths (site lives under a GitHub Pages subpath, not domain root).
- Categories are fixed by the Hermes schema: modelos, ferramentas_plugins_mcps, open_source, discussoes, papers, mercado, regulacao, integracoes_novas, dicas_economia_e_performance, dicas_programadores, delphi_e_ia, comparativos_modelos.
- Must degrade gracefully when a section is empty or a whole day file is missing/malformed.

## Evidence on Hand

Real sample data at `data/2026-08-02.json` (full day digest, all sections populated except `delphi_e_ia`), `glossario.json` (19 accumulated terms), `index.json` (day index with `destaque_do_dia` flag). No other sample content exists yet — history is effectively one day deep today.

## Product Principles

- Read mode wins: this is a reading experience, not a dashboard — comprehension and comfort outrank density.
- Mobile-first: primary usage is phone, first thing in the morning.
- Glossary terms are always one tap away from their explanation, inline in the digest.
- Zero build, zero backend: every design decision must stay servable as static files from GitHub Pages.
- Quality over quantity carries into the UI: don't force a category to visually compete for attention when Hermes itself already deprioritized it.

## Accessibility & Inclusion

No specific requirement established beyond general good practice (contrast, readable type at reading length, no motion-triggered issues).
