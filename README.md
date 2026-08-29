<p align="center">
  Personal portfolio website built with React, TypeScript and Tailwind CSS, showcasing projects, technical skills and professional background.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-in%20development-orange" alt="Status">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white" alt="Lucide React">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

<p align="center">
  <b>Click the buttons below to open the project:</b>
</p>

<p align="center">
  <a href="https://portifolio-5w7zhuw4f-murilotecoteco-s-projects.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://github.com/murilotecoteco/Portifolio">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge" alt="GitHub Repository">
  </a>
</p>

---

# Table of Contents

* [About](#about)
* [Why this project](#why-this-project)
* [Screenshots](#screenshots)
* [Features](#features)
* [Technology Stack](#technology-stack)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Deployment](#deployment)
* [Known Limitations](#known-limitations)
* [Roadmap](#roadmap)
* [License](#license)

---

# About

This is my personal portfolio website — a single-page application built with React 19, TypeScript and Tailwind CSS v4, deployed on Vercel. The site presents who I am, the projects I've built, the technologies I work with and my contact information.

The project demonstrates modern frontend development practices including component-based architecture with React, static typing with TypeScript, utility-first styling with Tailwind CSS v4 and production deployment via Vercel.

---

# Why this project

This project was built to:

* Have a public-facing professional presence online
* Demonstrate frontend development skills with a modern stack
* Serve as a living showcase for all other projects I build
* Practice component-based architecture with React and TypeScript
* Apply Tailwind CSS v4 and its new Vite plugin integration
* Explore UI animation with Framer Motion

---

# Screenshots

## Home

<p align="center">
  <!-- Add screenshot here -->
</p>

---

# Features

* ✅ Sticky navbar with backdrop blur and smooth scroll navigation
* ✅ Hero section with name, role, description, call-to-action buttons and tech tags
* ⏳ Projects section
* ⏳ Tech stack section
* ⏳ About section
* ⏳ Contact section
* ⏳ Page animations with Framer Motion
* ⏳ Mobile hamburger menu

---

# Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Bundler | Vite 8 |
| Animations | Framer Motion 13 |
| Icons | Lucide React |
| Linting | ESLint + typescript-eslint |
| Deployment | Vercel |
| Version Control | Git & GitHub |

> **Note on versions:** This project intentionally uses cutting-edge releases — React 19, TypeScript 6, Vite 8 and Tailwind CSS v4 — to stay current with the modern frontend ecosystem.

---

# Architecture

```text
User (Browser)
      │
      ▼
  Vercel CDN
      │
      ▼
 React SPA (Vite build)
      │
  ┌───┴────────────────┐
  │                    │
  ▼                    ▼
Navbar              Sections
(fixed, all pages)  (home, projects,
                     stack, about,
                     contact)
```

The application is a fully static single-page application. There is no backend, no database and no external API calls. All content is rendered client-side from the React component tree. Vercel serves the compiled `dist/` folder directly from its CDN with no server-side processing.

---

# Project Structure

```text
Portifolio/
│
├── public/
│   ├── favicon.svg          # Site icon
│   └── icons.svg            # SVG sprite sheet (GitHub, X, Discord, Bluesky)
│
├── src/
│   ├── assets/
│   │   └── hero.png         # Hero section image
│   ├── components/
│   │   ├── Navbar.tsx       # Fixed navigation bar with section links
│   │   └── Hero.tsx         # Hero component (in progress)
│   ├── App.tsx              # Root component — renders Navbar and page sections
│   ├── index.css            # Global styles and Tailwind v4 import
│   └── main.tsx             # Entry point — mounts <App /> into #root
│
├── index.html               # HTML shell
├── vite.config.ts           # Vite config with React and Tailwind CSS plugins
├── tsconfig.json            # TypeScript project references
├── tsconfig.app.json        # TS config for application source code
├── tsconfig.node.json       # TS config for vite.config.ts
├── eslint.config.js         # ESLint flat config with typescript-eslint
└── package.json
```

---

# Getting Started

## Prerequisites

* Node.js 18+

## Installation

```bash
git clone https://github.com/murilotecoteco/Portifolio.git
cd Portifolio
npm install
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all TypeScript files |

---

# Deployment

The application is deployed on **Vercel** as a static site. No environment variables or server-side configuration are required.

The build command is:

```bash
tsc -b && vite build
```

Vercel serves the compiled `dist/` folder directly from its CDN.

Production URL:

```
https://portifolio-5w7zhuw4f-murilotecoteco-s-projects.vercel.app/
```

---

# Known Limitations

* The navbar links for `#projetos`, `#stack`, `#sobre` and `#contato` are rendered but their corresponding page sections are not yet implemented, so clicking them has no visible effect.
* No mobile navigation menu is implemented. On screens narrower than the `md` breakpoint, the navbar links are hidden with no hamburger menu alternative.

---

# Roadmap

* [x] Project scaffold (React + TypeScript + Vite + Tailwind CSS v4)
* [x] Sticky navbar with backdrop blur
* [x] Hero section
* [ ] Projects section
* [ ] Tech stack section
* [ ] About section
* [ ] Contact section
* [ ] Framer Motion page animations
* [ ] Mobile hamburger menu

---

# License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
