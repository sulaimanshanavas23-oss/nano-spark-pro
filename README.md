# Nano Spark — Technology Education & Innovation Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

> **Empowering students to build real-world technology through hands-on robotics, electronics, AI, embedded systems, and STEM learning.**

---

## 🌟 Overview

**Nano Spark** is a technology and STEM innovation startup making practical technology education accessible to students, schools, and aspiring innovators. We combine STEM, robotics, electronics, embedded systems, IoT, and emerging tech for hands-on, project-based learning.

### Key Focus Areas
- **STEM & Electronics Education** — Hands-on learning programs that make electronics and science fun, practical and accessible
- **Robotics & Automation** — Design, build and program robots — from line followers to fully automated systems
- **Embedded Systems** — Microcontrollers, sensors and firmware — the brains behind every smart device
- **IoT & Smart Technology** — Connect devices to the internet and build smart, sensor-driven solutions
- **AI & Emerging Technologies** — Introductions to AI, agentic AI, automation and the technologies of tomorrow
- **Innovation & Project Development** — Turn ideas into working prototypes through guided project development

---

## 🚀 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, CSS Variables |
| **Animation** | Framer Motion |
| **Routing** | React Router DOM v6 |
| **Icons** | React Icons (Feather) |
| **Deployment** | Vercel / Netlify |

---

## 📦 Project Structure

```
nano-spark/
├── public/                 # Static assets
│   ├── images/             # Images (logos, team, hero, etc.)
│   └── hero-video.mp4      # Hero background video
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CircuitBackground.tsx
│   │   ├── Card.tsx
│   │   ├── ConnectedSteps.tsx
│   │   ├── Footer.tsx
│   │   ├── LetterReveal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Page.tsx
│   │   ├── PuzzleReveal.tsx
│   │   ├── Reveal.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── TestimonialMarquee.tsx
│   │   └── ...
│   ├── lib/                # Constants, config, utilities
│   │   ├── site.ts         # Site configuration, content
│   │   ├── validate.ts     # Form validation
│   │   └── brochure.ts     # Brochure data
│   ├── pages/              # Route pages
│   │   ├── Home.tsx        # Homepage with video hero
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Workshops.tsx
│   │   ├── Team.tsx
│   │   ├── Contact.tsx
│   │   └── ...
│   ├── App.tsx             # Root component with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles, Tailwind imports
├── index.html              # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ (or pnpm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nano-spark.git
cd nano-spark

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🎨 Design System

### Colors (Tailwind Config)
```css
/* Primary Brand */
--nsYellow: #FFC107;        /* Primary accent */
--nsBlack: #111111;         /* Primary dark */
--nsWhite: #FFFFFF;         /* Primary light */
--nsGray-light: #F5F5F4;    /* Subtle backgrounds */

/* Gradients */
--gold-gradient: linear-gradient(135deg, #FFC107 0%, #FFD600 100%);
```

### Typography
- **Headings**: Baloo 2 (Google Fonts) — bold, expressive
- **Body**: Inter / system UI — clean, readable

### Component Classes
- `.btn-yellow` — Primary CTA (yellow bg, black text)
- `.btn-dark` — Secondary CTA (black bg, white text)
- `.btn-outline` — Outline variant
- `.section-heading` — Standardized section header

---

## 🎬 Homepage Hero Video

The homepage features a **full-screen autoplaying video** showcasing students building a voice-controlled car. The video:

- ✅ Autoplays, muted, loops continuously
- ✅ Plays inline on mobile (no fullscreen takeover)
- ✅ Subtle dark gradient overlay for text readability
- ✅ Picture-in-picture inset with live project highlight
- ✅ Poster fallback image for loading states

Video source: `/hero-video.mp4` (in `public/`)

---

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — Hero, stats, testimonials, focus areas, ecosystem, vision, CTA |
| `/about` | Company story, founder, vision, bigger vision |
| `/products` | STEM kits, robotics kits, electronics kits |
| `/workshops` | Workshop catalog, booking |
| `/team` | Core team, mentors |
| `/community` | Ambassador program, community links |
| `/achievements` | Awards, recognitions, milestones |
| `/careers` | Open positions, culture |
| `/feedback` | Student/parent testimonials |
| `/contact` | Contact form, info, map |
| `/support` | FAQ, help center |
| `/book-session` | Workshop booking flow |

---

## 🔧 Customization

### Site Configuration
Edit `src/lib/site.ts` to update:
- Company name, tagline, contact info
- Social links
- Founder details
- Student count statistics
- MSME/Startup registration info

### Theme Colors
Modify `tailwind.config.js` → `theme.extend.colors` for brand colors.

### Content
- Page content: Edit respective files in `src/pages/`
- Testimonials: `src/lib/site.ts` → `TESTIMONIALS` array
- Focus areas: `src/pages/Home.tsx` → `FOCUS_AREAS` constant

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "vite", "preview", "--host", "--port", "3000"]
```

---

## 📄 License

MIT License — feel free to use for learning and reference.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

**Nano Spark**  
📧 nanospark46@gmail.com  
📞 +91 8148774546  
🌐 [LinkedIn](https://www.linkedin.com/in/nano-spark-4300a23bb) · [Instagram](https://www.instagram.com/nano_spark_) · [YouTube](https://youtube.com/@nanosparkbytes)

---

**Built with ❤️ for the next generation of innovators.**  
*Nano Spark — Turning curiosity into innovation.*