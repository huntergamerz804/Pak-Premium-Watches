# AUREN | Luxury Mechanical Timepieces

A high-end, responsive luxury mechanical-watch e-commerce website with in-house horological curation, bespoke cart, and Gemini-powered horological advisory.

---

## Why GitHub Pages Shows a Blank White Screen & How to Fix It

There are **two common reasons** GitHub Pages shows a blank white page for Vite/React apps:

1. **GitHub Pages is serving the uncompiled root folder (`/`) instead of `/docs` or the GitHub Actions build**:
   Browsers cannot execute raw `.tsx` files (`/src/main.tsx`). GitHub Pages must serve the compiled production build located in `/docs` (or deployed via GitHub Actions).
2. **Missing inline dark styles**:
   Without styles loaded, the browser defaults to a stark white background (`#FFFFFF`). We have added inline `#050505` dark styles and a gold monogram placeholder so the screen will never be white.

---

## 2-Minute Fix on GitHub:

### Option A: Deploy from `/docs` (Simplest — 1 Step)
1. In your GitHub repository, click on **Settings** (gear icon at the top).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment > Source**, ensure **Deploy from a branch** is selected.
4. Set:
   * **Branch**: `main` (or `master`)
   * **Folder**: change `/ (root)` to **/docs**
5. Click **Save**.
6. Wait 30 seconds and refresh your site. It will be live and fully functional!

---

### Option B: Deploy via GitHub Actions (Automated CI/CD)
1. In your GitHub repository, click **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions** from the dropdown.
3. Push your code. The pre-configured `.github/workflows/deploy.yml` workflow will automatically build and deploy your site to GitHub Pages with 0 configuration.

---

## Local Development & Build

```bash
# Start local development server
npm run dev

# Build production bundle (generates both dist/ and docs/ with .nojekyll & 404.html)
npm run build
```
