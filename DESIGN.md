# Design

<!-- impeccable:design-schema 1 -->

## World

Field notebook — a naturalist/survey log, not a news dashboard. Each day is a
dated field entry; the twelve Hermes categories are taxonomic orders; the
glossary is a specimen index that grows entry by entry; `destaque_do_dia` is
a rare sighting, stamped. Dark mode is the night vigil: a headlamp on the
same page, never a different product. Deliberately avoids the two ruts a
literal reading of "Radar IA" invites: a sweeping radar/sonar screen, and the
generic warm-cream-paper/serif/lamplight bookish default.

## Color

Strategy: Committed. One saturated rust (`--rust-band`, `#7c3216`, constant
across both themes) carries the header band, the day badge, and the active
nav tab — real page-scale surface, not an accent dot. Everything else reads
off two paper tones (`--paper`, `--paper-raised`) plus ink.

Category "stamp" inks cycle through five field colors (rust, indigo, pine,
mustard, olive) rather than twelve unique hues — restraint over a rainbow
dashboard. `--rust` and `--rust-deep` intentionally invert lightness between
themes (dark ink on light paper / light ink on dark paper) since they are
used for text and icons on the themed paper surface. `--rust-band` does
**not** invert — it is the one color that must stay legible under a fixed
cream label (header, badge, active tab) in both themes; do not merge it back
into `--rust-deep`.

Light: paper `#e7e1d0`, ink `#241f16`.
Dark: paper `#15130d`, ink `#eee6d3`.

## Type

- Display / stamped headings (brand, category heads, glossary headwords,
  badge, box labels): Big Shoulders 600/700, self-hosted. Condensed
  industrial/survey-signage character — first pick was Space Grotesk, but
  the design hook correctly flagged it as its own new AI-generated-UI
  cliché, so it was swapped. Always set in a moderate-to-large size with
  uppercase + positive letter-spacing; never used for small dense UI
  chrome, where condensed type hurts legibility.
- Small UI chrome (nav links, theme toggle, category `<select>`): IBM Plex
  Sans 600, not the display face — these need mixed-case legibility at
  small sizes more than they need personality.
- Body / reading copy: IBM Plex Sans 400/500/600, self-hosted.
- Dates, source tags, field data: IBM Plex Mono 400/500/600, self-hosted.

Workhorse faces, chosen for Read-mode: this is a 10-15 minute daily read,
comprehension outranks display personality.

## Components

- **Header band**: solid `--rust-band`, cream wordmark + drawn compass mark,
  tab-style nav, theme toggle as a labeled sun/moon pill.
- **Day summary**: raised paper card, mono dateline, stamp badge for
  `destaque_do_dia`.
- **Category section**: heading rule colored per category ink, item count in
  a mono pill. Items are a plain vertical list (no card grid) — the field
  mark (small flag glyph) replaces a colored left-border for `relevancia:
  alta`, since bordered accent stripes are off the table.
- **Glossary chip / terms box**: paper-band background, links into
  `glossario.html#<term>`.
- **Icons**: `site/js/icons.js` — one authored stroke-icon set (24×24,
  stroke-width 1.6, round joins), no emoji, no icon font. One glyph per
  Hermes category plus a handful of UI icons (book, search, sun, moon,
  arrow, flag, compass, chevron).

## Texture

A faint two-axis grid-line background (`--grid-line`, low contrast against
`--paper`) reads as graph/field paper. This is the one place the build
intentionally uses a "grid background," and it is a deliberate world choice
(a field log is a measurement surface) rather than a generic dashboard
habit — `impeccable detect` flags it as an advisory `codex-grid-background`
finding; the advisory is accepted, not a miss.

## Accessibility & touch

- Each page has exactly one `<h1>`: the day's dateline (`Registro de campo —
  <date>`, prefix visually hidden via `.sr-only`) on Hoje/dia, a visible
  `.page-title` ("Histórico" / "Glossário" / "Categorias") on the list
  pages. Don't add a second, competing h1 — the date *is* the page title on
  the digest views.
- `#categoria-select` and `#glossario-search` both carry a real `<label>`
  (visible `.select-label` for the category filter, `.sr-only` for search —
  the search box's placeholder already carries enough visible context next
  to the "Glossário" h1).
- Touch targets (nav links, theme toggle, glossary chips) size up under
  `@media (pointer: coarse)`, not a viewport breakpoint — a touch laptop or
  landscape tablet needs the same room a phone does, and a resized desktop
  window with a mouse doesn't. Keep new tappable chrome inside this query
  rather than hand-tuning padding per breakpoint.
- `prefers-reduced-motion: reduce` collapses the two hover transforms
  (history-item slide, source-link arrow nudge) to `none`. Any new motion
  needs the same escape hatch.

## Known gaps / next pass

- No image generation or screenshot capture was available in the build
  environment (headless Browser pane), so the finish review here was manual:
  computed-style checks (contrast ratios computed by hand, font loading,
  scrollWidth/clientWidth for overflow) rather than the shipped
  `impeccable-finish-reviewer` visual pass. Re-run `/impeccable audit site`
  or `/impeccable critique site` from a session with working screenshots
  before treating this as fully finished.
- Only one real day of sample data exists; list/history views are unverified
  at scale (many days, long glossary, empty categories across a longer
  history).
