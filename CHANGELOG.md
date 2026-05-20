# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) loosely (the deliverables are static HTML files, not a versioned API).

## [1.0.0] — 2026-05-20

The repository moved from hand-coded HTML email templates to **MJML sources with a proper build pipeline**. Every `N/index.html` is now generated from `src/N.mjml`; the previous 800–900-line table-soup files are replaced by 80–270-line semantic MJML sources.

### Added

- **MJML build pipeline.** `npm run build` compiles every `src/*.mjml` to `N/index.html` via `mjml@5.2.2`. `npm run dev` runs the same compiler in watch mode with browser-sync live-reload (saving `src/N.mjml` rebuilds just that template; saving `src/partials/*` rebuilds everything).
- **`src/` directory** with one `.mjml` file per template (1–20) plus `src/partials/base.mjml` for shared `mj-attributes` resets.
- **Gallery index** at `index.html` linking to all 20 templates with brand/category labels. Used as the default dev-server landing page.
- **CLAUDE.md** documenting MJML gotchas (rgba in attributes, `class` vs `css-class`, hero limitations), the per-template inline-footer convention, and which existing templates to crib from for each layout type.
- **`package.json`** declaring devDependencies (`mjml`, `browser-sync`, `chokidar`) and engine requirement (`node >=20.19`).
- **`.gitignore`** for `node_modules/`, `.DS_Store`, log files.

### Changed

- **Every `N/index.html` is now a build artifact**, regenerated from `src/N.mjml`. Edit the source, not the output. Build outputs are still committed (they're the public deliverable consumed by colorlib.com).
- **Outlook compatibility improved.** MJML auto-generates ~87 MSO conditional blocks and VML fallbacks per template — substantially more thorough than the previous hand-coded HTML. Hero backgrounds, column collapsing on mobile, and table-cell padding are all more bulletproof.
- **All templates now source brand fonts via `<mj-font>`** with consistent system-font fallbacks declared in `mj-attributes`, instead of inline `<link>` tags scattered through each file.
- **Footer pattern unified** — most templates now use a 3-column-on-`#000000` footer + copyright row layout (templates 1–5, 7, 14–17, 19, 20). Templates 6, 8, 10–13 keep light-bg footers matching their original brand.
- **Copyright years updated** from 2018 → 2026 across all templates.

### Fixed

Bugs in the original hand-coded templates that surfaced during the MJML rewrite:

- **Template 2 (Corporate)** — services section referenced `images/001-diet.png` and `images/003-recipe-book.png`, neither of which exist in `2/images/`. Replaced with the existing `checked.png`.
- **Template 5 (Travel)** — "Swetzerland" typo (8 occurrences across destination cards) corrected to "Switzerland".
- **Template 16 (Fitness)** — Body Form Program row had a leftover `<p class="meta">Posted on Feb 18, 2019 · Food</p>` copy-pasted from a blog template; removed.
- **Template 14 (Business)** — counter columns used `rgba(241,198,56,.9/1/.8)` per-cell opacity in inline styles; MJML attributes reject `rgba()` so this consolidated to a single solid `#f1c638` background (visually indistinguishable, Outlook-safer).
- **All templates** — unsubscribe link styling now consistent with proper underline + low-contrast color, vs. the previous mix of `rgba(0,0,0,.8)` / `rgba(255,255,255,.4)`.

### Notable layout compromises

Documented honestly so future template work knows the limits:

- **Hero overlays.** Templates 1, 9, 15, 16 originally used absolute-positioned elements on top of hero background images (play buttons, gradient overlays, badge text). MJML can't reliably render positioned overlays in Outlook; these elements are now stacked below the hero image or simplified to solid-color fallbacks. The result is more Outlook-safe than the original.
- **Gradient backgrounds.** Template 15's hero used `linear-gradient(45deg, #033fff, #52c8ff)` over `bg_1.jpg`. MJML's `mj-hero` only supports a solid `background-color` fallback under the image; the gradient is lost but the background image still carries the visual.

### Removed

- **Hand-coded duplicate CSS resets** at the top of every old `N/index.html`. MJML emits a tighter, more thorough reset automatically.
- **`<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">`** nested ~5 levels deep throughout each template. MJML emits the same structure but you no longer write it by hand.

### Dependencies

- `mjml` `^5.2.2` (compiler — async API; the build script awaits the returned promise)
- `browser-sync` `^3.0.4` (dev server with live-reload)
- `chokidar` `^5.0.0` (file watcher; ESM-only, requires Node ≥20.19)
