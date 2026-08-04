# Design

<!-- impeccable:design-schema 1 -->

## World

Editorial morning briefing — a printed newsletter you read with coffee, not
a dashboard, not a field log. One constant nameplate ("O dia em
*inteligência artificial*"), the date and day-stats live in a meta line
above it. The 12 categories read top to bottom as numbered sections with a
single "metade do dia" rest-stop at the midpoint, plus a desktop-only
sticky "Sumário" rail that tracks scroll position — both exist to solve the
literal complaint that drove this rewrite: a wall of 12 stacked categories
felt disorganized with no place to stop.

Replaces the earlier "field notebook / naturalist log" concept (rust band,
5-color category inks, grid-paper texture), which read as "muito feitas"
(overdone) and cluttered once real data filled all 12 categories. That
version is now anti-reference, not a hybrid to partially keep.

## Color

Strategy: Single accent. One warm accent ink, `--ember`, used only for the
day's `destaque_do_dia` band, the active-nav underline is monochrome (not
ember) so ember stays reserved for two things: the rare-day signal and link
hover. No per-category colors — the 12 categories differentiate by a
numbered mono index and position, not hue. This directly answers the
"5 random colors fighting for attention" complaint.

Everything else is paper + ink: `--paper`/`--paper-raised` for surface,
`--ink`/`--ink-soft`/`--ink-faint` for a three-step text hierarchy (title /
body / meta), `--rule`/`--rule-strong` for hairline dividers. No grid
texture, no decorative background — flat paper.

Light: paper `#f7f3ea`, ink `#211c14`, ember `#b5501c`.
Dark: paper `#16130e`, ink `#f3ece0`, ember `#e2913f`.
All body/meta text pairings verified ≥4.5:1 against paper in both themes
(`--ink-faint` measures 5.49:1 light / 5.01:1 dark; `--ember` 4.59:1 light /
7.37:1 dark).

## Type

- Display (masthead h1, category headings, item titles, glossary
  headwords): "Newsreader" serif, self-hosted (400/500/600 + 500 italic).
  Editorial register — the italic weight is used for a single emphasized
  word in the masthead nameplate, nowhere else.
- Body / meta / labels / mono data: unchanged from before — IBM Plex Sans
  for reading copy, IBM Plex Mono for dates, tags, and the uppercase
  `.label` micro-caps class used everywhere for eyebrow text. Keeping these
  two avoided an unnecessary full font-stack replacement.

## Components

- **Header**: sticky, blurred-paper background, text wordmark (no icon —
  the compass mark from the previous world is gone), nav underlines the
  active page, theme toggle is a small bordered pill with a CSS dot
  (filled = light, hollow = dark), no icon glyph.
- **Masthead**: meta line (date, item/section count) → ember band (notable
  day only) → serif h1 nameplate → lead paragraph in a ruled blockquote
  style.
- **Sumário rail**: desktop-only (`min-width: 1024px`), sticky, numbered
  list of the day's populated categories, IntersectionObserver-driven
  active-section underline. Not present on mobile — the primary reading
  context stays a plain top-to-bottom scroll, per PRODUCT.md's mobile-first
  principle.
- **Pause divider**: a plain rule + "metade do dia" label inserted at the
  midpoint of the day's *populated* category count (only when there are
  more than 3 populated categories) — a deliberate rest stop, not
  decoration.
- **Item relevância alta**: no icon. A small ink-bordered circle with a
  filled dot, placed before the item (not inside the heading), plus a
  hairline left border on the item block. Fully monochrome — solves the
  earlier "one glyph, two meanings" problem (day-rarity now uses the ember
  band exclusively; item-relevance now uses no color and no glyph shared
  with anything else).
- **Glossary chip / terms box**: unchanged structurally, restyled to the
  new tokens; `↗` character replaces the external-link icon.
- **Icons**: none. `site/js/icons.js` was deleted along with all `<svg>`
  icon markup — the previous stroke-icon set (12 category glyphs + 7 UI
  icons) is gone. This is intentional restraint, not an oversight: nothing
  in this design needs an icon that a number, a rule, or a single accent
  color doesn't already communicate.

## Accessibility & touch

- Same structural rules as before, carried forward onto the new markup:
  one `<h1>` per page (masthead nameplate on Hoje/dia, `.page-title` on the
  list pages), real `<label>` on `#categoria-select` and
  `#glossario-search`, `prefers-reduced-motion: reduce` collapsing all
  transitions, touch targets (nav links, theme toggle, chips) growing under
  `@media (pointer: coarse)` rather than a viewport breakpoint.
- The relevance mark carries `aria-label="Relevância alta"` on its own
  element, positioned before the heading in DOM order rather than inside a
  `title` attribute on the heading itself — avoids forcing verbose
  announcement on every heading read aloud (a specific screen-reader
  finding from the prior design's flag icon).

## Known gaps / next pass

- No image generation or screenshot capture was available in the build
  environment (headless Browser pane) for this pass either — verification
  here was console/network checks, computed styles, contrast computed by
  hand, and `scrollWidth`/`clientWidth` overflow checks, not a visual
  screenshot review. Re-run `/impeccable audit site` or
  `/impeccable critique site` from a session with working screenshots
  before treating this as fully finished.
- `categoria.html` now memoizes fetched day JSON in a module-level `Map`
  (previously refetched all history on every filter change) — fixed as
  part of this pass, not yet re-verified at real scale (still only 2 days
  of sample data).
- Only one real day of sample data has `destaque_do_dia: true` and several
  `relevancia: alta` items; the rarity-inflation problem flagged in the
  2026-08-04 critique (badge fires on both sample days, ~46% of items) is a
  Hermes-side classification question, not something this visual pass can
  fix — worth another look once more real days exist.
