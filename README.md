# Pak-Premium Watches | Luxury Mechanical Timepieces & Curated Atelier

[![Deploy to GitHub Pages](https://github.com/actions/starter-workflows/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-4.x-38b2ac.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A high-end, responsive luxury mechanical timepiece e-commerce platform and atelier catalog engineered with Swiss-inspired horological aesthetics, strict single-allocation inventory controls, bespoke cart and order pipelines, and Gemini-powered timepiece image analysis.

---

## 🏛 Leadership & Atelier Team

* **First Owner & Co-Founder**: **M. Suban Kasi**
* **Second Owner & Co-Founder**: **M. Ali Khan**
* **Lead Full-Stack Web Developer**: **M. Awais Khaild Noorzai**

---

## ✨ Core Features

* **Strict 1-of-1 Inventory Engine**: Exactly one physical piece is available per timepiece. Once an order is placed, the item is instantly marked **SOLD OUT** across the site, disabling further purchase attempts and reflecting real-time stock status.
* **Direct Order Pipeline**: Dedicated order flow supporting mobile wallet confirmations (JazzCash & EasyPaisa with TID reference tracking), automated order ID generation (`PKP-XXXX-YYYY`), and upfront delivery fee verification.
* **AI Timepiece Vision Analysis**: Identify and evaluate watch photos with Google Gemini 3.1 Pro, with built-in fallback horological appraisal when running on static hosts.
* **Interactive Luxury Experience**:
  * Slide-over shopping bag drawer with quantity clamping and real-time total recalculations.
  * Instant search modal filtering by watch model, complications, materials, and categories.
  * Interactive client reviews and feedback submission system.
  * Comprehensive timepiece detail views with high-resolution imagery and specifications.
* **Universal Deployment Readiness**: Designed to deploy flawlessly on static hosts (GitHub Pages via root, `/docs`, or GitHub Actions) or full-stack Node.js environments (Render, Railway, Docker, Cloud Run).

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* **Node.js**: v20 or higher (v22 recommended)
* **npm**: v10 or higher

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your `GEMINI_API_KEY` in `.env` if you wish to use live Gemini API calls for watch photo analysis. (The app will gracefully use the local horological appraisal engine if no key is supplied).

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 GitHub Pages Deployment Guide

The repository includes pre-configured automation for all GitHub Pages deployment options:

### Option 1: Automated GitHub Actions (Recommended)
1. Push this repository to GitHub.
2. In your repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions** from the dropdown.
4. The workflow at `.github/workflows/deploy.yml` will automatically build and deploy your site on every push to `main` or `master`.

### Option 2: Pre-built `/docs` Folder (Zero Configuration)
1. Run `npm run build` locally. This automatically syncs the latest production bundle into the `/docs` directory with `.nojekyll` and `404.html`.
2. Commit and push:
   ```bash
   git add docs/
   git commit -m "Update docs build"
   git push origin main
   ```
3. In GitHub **Settings** > **Pages**, set **Source** to **Deploy from a branch**, select **Branch: main** and **Folder: /docs**, then click **Save**.

### Option 3: 1-Click Deploy via `gh-pages`
```bash
npm run deploy
```
This builds and pushes the distribution bundle to the `gh-pages` branch. Set GitHub Pages to serve from `gh-pages` / (root).

---

## 🛠 Tech Stack

* **Frontend Framework**: React 19 with TypeScript
* **Styling & Design System**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **Icons & Animation**: Lucide React, Motion
* **Backend Runtime**: Express.js with `tsx` (Full-stack dev & production server)
* **AI & Vision Model**: `@google/genai` (Google Gemini 3.1 Pro & Flash models)
* **Build System**: Vite 8 with custom postbuild script for multi-target static hosting

---

## 📁 Repository Structure

```
├── .github/workflows/
│   └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── docs/                   # Ready-to-deploy static build folder for GitHub Pages
├── dist/                   # Production distribution build (generated via npm run build)
├── scripts/
│   └── postbuild.js        # Post-build script configuring .nojekyll, 404, and fallbacks
├── src/
│   ├── assets/images/      # Source watch imagery & photography
│   ├── components/         # Modular React UI components
│   ├── context/            # Global Cart & Inventory context (1-of-1 stock engine)
│   ├── data/               # Product catalog, specs, journal testimonials
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Main application orchestrator
│   └── main.tsx            # React application entry point
├── index.html              # HTML5 entry point with OpenGraph & Schema.org metadata
├── server.ts               # Express full-stack backend with API endpoints
├── vite.config.ts          # Vite configuration with clean ESM paths & Tailwind v4
└── package.json            # Scripts, dependencies, and project metadata
```

---

## 📄 License & Attribution

All rights reserved © Pak-Premium Watches. Developed by **M. Awais Khaild Noorzai** under executive direction of **M. Suban Kasi** and **M. Ali Khan**.
