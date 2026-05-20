# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Free, responsive HTML email templates published by Colorlib. 20 numbered template folders, served as-is to end users.

**All 20 templates are now MJML-sourced.** Each `N/index.html` is a build artifact generated from `src/N.mjml`. Never edit `N/index.html` directly — edit the source.

> Note: the global `~/.claude/CLAUDE.md` describes a Bootstrap-upgrade workflow for Colorlib *website* templates. That workflow does **not** apply here — these are email templates (table-based HTML, no Bootstrap, no jQuery, no SCSS).

## Layout

```text
src/
├── partials/
│   └── base.mjml      # shared mj-attributes defaults across all templates
├── 1.mjml             # → 1/index.html (RestoBar — restaurant)
├── 2.mjml             # → 2/index.html (Corporate — agency)
├── 3.mjml             # → 3/index.html (Agency — portfolio)
...
└── 20.mjml            # → 20/index.html (Eventos — dev conference)

scripts/
├── build.mjs          # compile all src/N.mjml → N/index.html
└── dev.mjs            # watch src/ + browser-sync live-reload

1/, 2/, ..., 20/       # build artifacts — each has index.html + images/
index.html             # gallery index linking to all 20 templates
```

## Commands

```bash
npm install            # one-time, installs mjml + browser-sync + chokidar
npm run build          # compile every src/*.mjml → N/index.html
npm run dev            # watch src/, live-reload at http://localhost:3000/
```

`npm run dev` opens the gallery index, which links to all 20 templates. Saving `src/N.mjml` rebuilds only that template; saving anything in `src/partials/` rebuilds everything.

## Editing or adding a template

To **edit** an existing template: edit `src/N.mjml`, run `npm run build`, verify in browser.

To **add** a new template: copy a structurally-similar `src/N.mjml` to `src/21.mjml`, change brand (font/colors/copy), add images to `21/images/`, run `npm run build`. The build script picks up any numeric filename matching `^\d+\.mjml$`. Add a card to `index.html` if you want it in the gallery.

### Patterns to crib from

Each existing template demonstrates a different layout vocabulary. When building a new one, start from the closest match:

- **Multi-section marketing** (hero + services + grid + counter + blog + testimonials + footer): `src/1.mjml`, `src/2.mjml`, `src/14.mjml`
- **Header with nav row**: `src/2.mjml`, `src/4.mjml`, `src/5.mjml`
- **Image grids** (2-col work/blog cards): `src/3.mjml`, `src/4.mjml`, `src/9.mjml`
- **Alternating image/text rows** (image left, text right, alternating): `src/1.mjml` meal rows
- **E-commerce product rows** (image + details + price/CTA): `src/12.mjml`, `src/18.mjml`, `src/8.mjml`
- **Single-purpose transactional** (logo + headline + one CTA + footer): `src/10.mjml`, `src/11.mjml`, `src/13.mjml`
- **Light footer** (not the standard 3-col on black): `src/10.mjml`, `src/11.mjml`, `src/6.mjml`

## MJML gotchas

- **`rgba()` is rejected in attribute values** (`color="rgba(...)"`). MJML only accepts hex/named colors in attributes. `rgba()` inside `<mj-style>` CSS or inline `style=""` is fine. Convert: `rgba(0,0,0,.4)` ≈ `#999999`, `rgba(255,255,255,.85)` on dark bg ≈ `#d9d9d9`.
- **`class="..."` on MJML components is illegal** — use `css-class="..."` instead. Plain HTML inside `<mj-text>` can use `class` normally.
- **`<mj-include>` requires `filePath` option** when called programmatically (already wired up in `scripts/build.mjs`). On the CLI it requires `--config.allowIncludes true`.
- **Overlay/positioned elements** (e.g., a play-button icon centered on top of a hero image) can't be done cleanly in MJML — the spike for template 1 stacks the play button below the image instead. This is more Outlook-safe than the original positioning anyway.
- **`mj-hero` only takes one column of content**, no side-by-side columns. For multi-column backgrounds, use `mj-section background-url="..."`.
- **Stacked image + caption side-by-side rows** (the alternating image/text panels in template 1) use two `<mj-column vertical-align="middle">` inside one section.
- **Footer is inline per template, not a partial.** Each template's footer reflects its brand and content; a shared partial would force homogenization. The 3-col-on-black + copyright row pattern is used by most templates and is easy to copy.
- **`src/partials/base.mjml` is intentionally minimal** — only truly universal resets (padding=0 on sections, default text padding, default button padding/weight). Brand fonts, colors, button styles all live inline in each template's `<mj-head>`.

## Email-HTML conventions (still apply, MJML handles them automatically)

- Table-based layout, not flexbox/grid (Outlook Windows = Word rendering engine).
- VML / `mso-*` declarations for Outlook backgrounds — MJML generates these for you in `mj-hero` and `mj-section background-url`.
- CSS lives in `<head>` `<style>` blocks; ESPs inline it at send time. Don't pre-inline.
- Image URLs are relative (`images/foo.jpg`) for local preview; production sends through an ESP that rewrites them to absolute CDN URLs.
- One Google Font per template via `<mj-font>` with system-font fallbacks defined in `mj-attributes`.
- `!important` and Outlook conditionals are load-bearing — MJML emits them. Don't strip them from compiled output.

## Git conventions

- `master` is the default branch (not `main`).
- License: MIT (`LICENSE-MIT`).
- Commits are short, imperative.
- `node_modules/` is gitignored; **every `N/index.html` (build output) is committed** because that's the public deliverable consumed by colorlib.com and end users. After editing `src/N.mjml`, always commit the regenerated `N/index.html` alongside the source.
