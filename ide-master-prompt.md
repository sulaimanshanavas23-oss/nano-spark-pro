# NANO SPARK IDE — MASTER PROMPT

Use this as the single source of truth when generating any screen, component, or flow of the **Nano Spark IDE**. Follow every rule below without deviation.

---

## 1. Product Identity

- **Product name:** Nano Spark IDE
- **Tagline:** Technology · Innovations · Solutions
- **Audience:** Students & makers learning STEM / Robotics / IoT / Coding
- **Personality:** Bold, energetic, playful-but-professional. "A spark of yellow inside a focused dark workspace."
- **Tech stack:** React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + react-icons

---

## 2. Color Schema (Tailwind token names must be used exactly)

### Core Brand
| Token | Hex | Usage |
|---|---|---|
| `spark.DEFAULT` | `#FFC107` | Primary accent: active tabs, buttons, selection highlights, focus rings |
| `spark.dark` | `#F7B500` | Hover states on accent elements, pressed buttons |
| `spark.light` | `#FFD54F` | Gradients, subtle highlights, badge fills |

### Workspace Surfaces (dark-first IDE)
| Token | Hex | Usage |
|---|---|---|
| `ink.DEFAULT` | `#111111` | App background base |
| `ink.deep` | `#0B0B0B` | Title bar, status bar, activity bar |
| `ink.panel` | `#161616` | Sidebar, terminal panel, dropdowns |
| `ink.editor` | `#1A1A1A` | Editor background |
| `ink.raised` | `#222222` | Cards, popovers, modals, inputs |
| `ink.line` | `#2E2E2E` | Borders, dividers, separators |

### Text
| Token | Hex | Usage |
|---|---|---|
| `nsWhite` | `#FFFFFF` | Headings, active labels |
| `nsGray.medium` | `#9CA3AF` | Secondary text, inactive icons, placeholders |
| `nsGray.light` | `#F7F7F5` | Light-theme surfaces only |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `ok` | `#22C55E` | Success, build passed, connected device |
| `warn` | `#FFC107` | Warnings, unsaved dot |
| `err` | `#EF4444` | Errors, breakpoints, failed build |
| `info` | `#38BDF8` | Info messages, links |

### Rules
- Dark theme is default. Light theme (`bg-nsWhite`, text on `ink.DEFAULT`) is optional secondary.
- Yellow is an ACCENT — max ~10% of any screen. Never large yellow backgrounds except splash/loading.
- All interactive focus states: `ring-2 ring-spark ring-offset-2 ring-offset-ink-editor`.
- Selection highlight in editor: `rgba(255,193,7,0.18)`.

---

## 3. Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display / headings / logo | `Baloo 2` | 600, 700 | Rounded, friendly, brand voice |
| UI body / labels / menus | `Inter` | 400, 500, 600 | `font-body`, tracking-normal |
| Code / terminal / editor | `JetBrains Mono` | 400, 500, 700 | `font-mono`, fallbacks: Fira Code, Consolas, monospace |

Scale (px / line-height): display 24/32 · h1 20/28 · h2 16/24 · body 14/20 · small 12/16 · code 13/20.
Editor font-size adjustable 12–20 via settings; default 14.

---

## 4. Layout Schema (fixed geometry)

```
┌────────────────────────── Title Bar (h-12) ──────────────────────────┐
│ logo · menus · ⌘K Command Palette · window controls                  │
├───┬────────────┬─────────────────────────────────────┬──────────────┤
│ A │  Sidebar   │            Editor Area              │   Minimap    │
│ c │  (w-64)    │   Tab Strip (h-10)                  │   (w-20)     │
│ t │            │   Breadcrumbs (h-8)                 │              │
│ i │  Explorer  │   Code Editor (flex-1)              │              │
│ v │  Search    │                                     │              │
│ i │  Git       ├─────────────────────────────────────┴──────────────┤
│ t │  Devices   │        Bottom Panel (h-60, collapsible)             │
│ y │  Extensions│   Terminal · Problems · Output · Serial Monitor     │
│   │            │                                                     │
│(w-14)           │                                                     │
├───┴────────────┴─────────────────────────────────────────────────────┤
│ Status Bar (h-7): branch · errors/warnings · lang · Ln,Col · Run ▶  │
└──────────────────────────────────────────────────────────────────────┘
```

- Activity bar: w-14, icons 24px, active icon = `text-spark` + left 2px yellow indicator bar.
- Sidebar: w-64, collapsible to w-0 with animation.
- Tab strip: h-10; active tab has top 2px `spark` border + `bg-ink-raised`; modified file shows amber dot.
- Bottom panel: h-60 default, drag-resizable, collapsible.
- Status bar: h-7, `bg-spark text-ink-deep` in normal state, `bg-err text-white` when errors exist.
- Radii: inputs/buttons `rounded-lg`, cards/popovers `rounded-xl`, modals `rounded-2xl`.
- Shadows: `shadow-soft` (rest), `shadow-lift` (hover/floating), `shadow-glow` (primary CTA, Run button).

---

## 5. Motion System (Framer Motion)

### Global tokens
- Durations: micro `120ms` · standard `200ms` · layout/slide `280ms` · hero/splash `600ms`
- Easing: standard `cubic-bezier(0.4, 0, 0.2, 1)` · entrance `[0.16, 1, 0.3, 1]` (easeOutExpo) · springs `{ stiffness: 300, damping: 30 }`

### Component motions
| Element | Animation |
|---|---|
| Logo / splash | `pulseGlow 2.5s ease-in-out infinite` (existing keyframe) |
| Page/screen switch | fade + 8px rise: opacity 0→1, y 8→0, 280ms easeOutExpo |
| Sidebar toggle | width w-64 ⇄ w-0, 280ms spring; content fades 120ms |
| Terminal open/close | height 0 ⇄ h-60, 280ms spring, chevron rotates 180° |
| New tab | scaleX 0.9→1 + fade, 200ms; closing tab: reverse 150ms then remove |
| Dropdown / palette | scale 0.96→1, y -4→0, fade, 160ms; backdrop blur fade 120ms |
| Modal | backdrop fade 200ms + card spring scale 0.92→1 |
| Buttons | hover: `-translate-y-0.5 shadow-lift` 120ms; press: `scale-[0.97]`; primary CTA keeps `animate-pulseGlow` |
| List items (files, settings) | stagger children 30ms, each fades + x -6→0 |
| Toast/notification | slide from bottom-right y 16→0, auto-dismiss with progress bar shrinking linearly |
| Caret/cursor | blink 1s steps(2) infinite; line-number of current line turns `text-spark` |
| Run button | on click: icon swaps ▶→⏱ spin once; success → green check pop (spring), fail → shake x ±4px ×3, 300ms |
| Serial data rows | new row slides up 6px + fade 120ms |
| Loading | 3 bouncing dots in spark/dark/light yellow, stagger 120ms |
| Reduced motion | respect `prefers-reduced-motion`: all animations become instant opacity toggles |

---

## 6. Component Checklist (every one follows §2–§5)

Title bar · Command palette (⌘K, fuzzy search, keyboard nav) · File explorer tree · Tabs + breadcrumbs · Code editor (syntax theme below) · Minimap · Global search/replace · Source control view · Device/board manager (IoT) · Serial monitor · Terminal · Problems panel · Settings modal · Notifications/toasts · Context menus · Status bar · Onboarding/splash screen.

### Editor syntax colors (dark)
keywords `#FFD54F` · strings `#86EFAC` · numbers `#FCA5A5` · comments `#6B7280` italic · functions `#93C5FD` · variables/plain `#E5E7EB` · types/classes `#FBBF24` · operators `#FFC107`.

---

## 7. Quality Bar

- Keyboard-first: every action reachable via shortcuts; visible focus rings everywhere.
- WCAG AA contrast minimum; never yellow-on-white for text.
- No animation blocks interaction longer than 300ms; all lists virtualized beyond 200 items.
- Icons: `react-icons` (Feather set style), stroke 2px, 16/20/24px only.
