<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) loosely (the deliverables are static HTML files, not a versioned API).

## [1.2.0] — 2026-05-20

### Added

Four more templates in a **"designed minimal"** style — the same restrained typography foundation as 21–24, with one strong visual hook each (color block, hero image, oversized date treatment, dark theme).

- **Template 25 — Loop (product launch / feature announcement).** Bold typography hero + full-bleed product screenshot, then 3 colored feature cards (violet / amber / green tints) for the highlight blocks, monospace version pill, "Also in 4.2" compact changelog list, and a contrasting dark "Coming next month" teaser section. Violet brand (`#7c3aed`).
- **Template 26 — Signal (webinar invite).** Oversized 96px date glyph ("MAR 22") in the hero next to the title, three circular speaker portraits in a 3-column grid, monospace timecodes in the agenda table, calendar-add link row (Google / Apple / Outlook). Electric blue (`#3b82f6`). Uses 3 person portraits from `26/images/`.
- **Template 27 — Verge (re-engagement / winback).** Full-bleed terracotta (`#c2410c`) hero section with bold "It's been a minute, Sam." headline, then a giant 88px "25%" offer treatment with a dashed-border code coupon box, light-touch "since you've been gone" updates, and a genuinely-toned sign-off offering a "slow down emails" alternative to unsubscribe.
- **Template 28 — Pulse (dark-mode newsletter).** Pure-black background (`#0a0a0a`), Inter + JetBrains Mono mix, gradient text effect on the headline (cyan → purple → white), short cyan accent stripe instead of full dividers, monospace category tags, sponsor block with cyan left-border. Cyan accent (`#06b6d4`).

### Notable design choices

- All four reuse the `partials/base.mjml` reset and the Inter family, so they feel like one design system across 21–28.
- Color usage is decisive but restrained: each template has exactly one accent color used as a single emphasis (the colored hero in 27, the cards in 25, the date kicker in 26, the cyan glow in 28).
- Templates 25 and 26 use placeholder images (`25/images/hero.jpg`, `26/images/speaker-*.jpg`) copied from existing template folders — swap them for your own assets. Templates 27 and 28 use zero images.
- The dark template (28) uses inline `style=""` for the CSS gradient text effect because MJML attribute values don't accept `background-image`. The gradient renders in Webkit/Blink (Apple Mail, iOS Mail, Gmail web) and degrades to solid `#fafafa` in Outlook.

## [1.1.0] — 2026-05-20

### Added

Four new templates in a **modern minimal** style (Stripe / Linear / Vercel aesthetic — Inter font, restrained color, hairline dividers, no decorative imagery) to fill major catalog gaps:

- **Template 21 — Lume (SaaS welcome / onboarding).** Headline + 3-step numbered checklist + help block. Blue accent (`#0066ff`). Fills the SaaS-onboarding gap that the original catalog had none of.
- **Template 22 — Northbound (order receipt).** Itemized table with subtotal/tax/total, shipping + payment blocks, track-order CTA, return policy. Pure black/white with hairline dividers. Universally needed transactional template.
- **Template 23 — Strata (password reset / security alert).** Reset CTA + 1-hour expiry note + raw URL fallback + request metadata (IP, location, device) + secure-account fallback. Black/white; security-email tone.
- **Template 24 — Brief (editorial newsletter).** Substack/Stratechery-style: serif (Newsreader) headings, sans-serif (Inter) body, dropcap on the lede paragraph, 640px wide instead of 600px, off-white background (`#fafaf7`), numbered "three reads", quote block, sign-off. Fills the long-form newsletter gap.

All four use 0 images — pure typography, which is on-trend and means no asset folders to manage.

### Changed

- Gallery `index.html` now groups templates into two sections: **Modern minimal (21–24)** and **Colorlib classic (1–20)**.

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
