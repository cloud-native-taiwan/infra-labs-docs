# CNTUG Design System for Docusaurus

Brand-aligned theming for any CNTUG (Cloud Native Taiwan User Group)
Docusaurus site. Built on the official CNCF brand palette with
Traditional-Chinese-first typography.

This implementation is what's currently shipping on `docs.cloudnative.tw`
(the Infra Labs documentation). It is designed to be copied unchanged
into the main CNTUG website (also Docusaurus) and any future Docusaurus
projects under the org.

---

## Files

| File | Role | Portable? |
|---|---|---|
| `cntug-tokens.css` | Source of truth: CSS custom properties for colors, typography, spacing, radii, shadows, motion. Loads webfonts. Defines light + dark theme variables. | Yes — drop into any project (React, plain HTML, another framework). No element-level rules. |
| `cntug-infima.css` | Bridge that maps the tokens above onto Infima's `--ifm-*` variables. This is what makes Docusaurus's built-in components (navbar, sidebar, footer, code blocks, admonitions) pick up the brand. | Docusaurus only. |
| `custom.css` | Docusaurus entry point. Imports the two files above; site-specific tweaks go below the imports. | Per-site. |

---

## Install on a new Docusaurus site

1. **Copy the two portable files** into the new site:

   ```
   src/css/cntug-tokens.css
   src/css/cntug-infima.css
   ```

2. **Replace `src/css/custom.css`** (Docusaurus references this from
   `docusaurus.config.js`) with:

   ```css
   @import "./cntug-tokens.css";
   @import "./cntug-infima.css";
   /* site-specific overrides here */
   ```

3. **Verify `docusaurus.config.js`** points at `custom.css`:

   ```js
   theme: {
     customCss: require.resolve('./src/css/custom.css'),
   }
   ```

4. **Restart the dev server.** The navbar primary, links, code blocks,
   admonition tints, and dark-mode surfaces will all shift to CNCF blue
   on Clarity City + Noto Sans TC.

That's it — no plugins, no Docusaurus theme swizzle, no JS.

---

## What gets rebranded

The bridge maps tokens onto these Infima variables:

- **Primary scale** — `--ifm-color-primary*` → CNCF Blue (`#0086FF`),
  desaturated to `#4DA8FF` in dark mode (Apple HIG: vibrant brand
  colors should not "buzz" against dark surfaces).
- **Type stack** — `--ifm-font-family-base`, `--ifm-heading-font-family`,
  `--ifm-font-family-monospace`. Latin glyphs render in **Clarity City**
  (CNCF's official typeface), Traditional Chinese in **Noto Sans TC**,
  code in **JetBrains Mono**. Browsers select per glyph automatically.
- **Surfaces** — page background, navbar, footer, card surfaces.
  Dark mode uses layered grays (`#1C1C1E` / `#232326` / `#2C2C2E`) per
  Apple HIG, not pure black.
- **Foregrounds** — primary / secondary content. Dark mode uses iOS
  label tiers (92% / 62% / 40%) instead of pure white.
- **Borders & emphasis** — the full neutral scale, plus a brand
  border for active/focused state.
- **Code** — inline code on `--bg-muted`; block code on near-black
  with CNCF turquoise text (the "kubectl voice" of the brand).
- **Admonitions** — info/success/warning/danger inherit semantic
  status tokens.
- **Footer** — flipped to CNCF Black, turquoise headings.
- **Focus ring** — `0 0 0 3px rgba(0, 134, 255, 0.35)`, brand-blue,
  always visible.

---

## Brand rules to remember

These are the constraints from the CNTUG design system. Honor them
when adding components or pages:

- **Single accent.** CNCF Blue (`#0086FF`) is the only CTA color.
  CNCF Turquoise (`#93EAFF`) is the only soft accent. CNCF Pink
  (`#D62293`) is reserved for emphasis tags ("New", "CFP open").
  No purple/blue gradients ever.
- **Bilingual default.** Most surfaces show **Traditional Chinese
  primary, English secondary** (or English-first technical content
  with zh-TW alongside).
- **Type cases.** Sentence case for headings ("Upcoming meetups",
  not "Upcoming Meetups"). Project names keep canonical casing
  (Kubernetes, kubectl, Helm, etcd, Prometheus, Envoy, OpenStack).
- **Backgrounds.** Predominantly white in light, layered grays in
  dark. No mesh gradients, no abstract blobs, no left-border
  accent stripes on cards.
- **Motion.** 120/180/320ms with `cubic-bezier(.2,0,0,1)`. Fades and
  4px translates only. No bouncy springs, no parallax.
- **Corner radii.** `4 / 8 / 12 / 16 / 999`. Default `8`. Pills are
  reserved for tags and avatars.
- **Icons.** Lucide via CDN at 1.5px stroke, 24px default
  (`https://unpkg.com/lucide-static@0.469.0/icons/<name>.svg`).
  Pin the version. CNCF project marks come from
  <https://github.com/cncf/artwork> — never redraw them by hand.
- **Emoji.** Sparingly, only as informational glyphs (📍 venue,
  🗓 date, 🎤 CFP). Never as bullet decoration or in nav.

---

## Using tokens in custom components

All variables are global, so a swizzled or custom React component can
reference them directly:

```css
.my-card {
  background: var(--bg-subtle);
  color: var(--fg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--dur-base) var(--ease-standard);
}
.my-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-brand);
}
```

The tokens automatically swap when `[data-theme="dark"]` flips, so you
don't write parallel dark-mode styles for surface/foreground/border
choices — only for cases where the design intentionally diverges.

---

## Updating the system

The token file is intentionally a **near-verbatim copy** of the
upstream design package's `colors_and_type.css` (with element-level
rules stripped so it doesn't fight Infima). When the upstream design
system changes, re-sync `cntug-tokens.css` first, then revisit
`cntug-infima.css` only if a new token category was introduced.

Upstream reference: CNTUG Design System bundle (Claude Design export,
`cntug-design-system/project/`).

---

## Caveats

- **Webfonts load from CDN** (jsdelivr + Google Fonts). Build-time
  network is not required, but first paint on the live site will
  briefly fall back to system fonts. Acceptable for documentation;
  self-host the woff2 files if a fully offline build is needed.
- **Clarity City via `@import`.** The CDN URL pulls the Clarity UI
  package; the `@font-face` blocks below it pin individual woff2
  weights so the family resolves even if the umbrella CSS fails.
- **Lucide icons.** Pin the version (`@0.469.0`) when introducing
  new icon usages — the unpinned URL has had 404s on individual icons
  in the past.
