# AUREN | Luxury Mechanical Timepieces

A high-end, responsive luxury mechanical-watch e-commerce website with in-house horological curation, bespoke cart, and Gemini-powered horological advisory.

## Deploying to GitHub Pages

The "blank white screen" issue on GitHub Pages happens because GitHub Pages serves sites under a repository subpath (e.g., `https://<username>.github.io/<repository-name>/`), while Vite defaults asset URLs to the root domain (`/assets/...`).

### Fix Applied:
1. **Relative Base Path**: `base: './'` is configured in `vite.config.ts`. All compiled assets, scripts, stylesheets, and images now resolve relatively (`./assets/...`), allowing the site to load properly regardless of repository name or hosting subpath.
2. **SPA Routing Fallback**: The build script now automatically outputs both `dist/index.html` and `dist/404.html` so that page reloads or deep links never 404.
3. **Static Fallback Engine**: If deployed to a static host like GitHub Pages without a Node.js server, the Horological Concierge and Watch Identifier automatically switch to client-side horological intelligence without error.

### Method 1: Automatic Deployment via GitHub Actions (Recommended)
1. Push this project to your GitHub repository.
2. In your repository settings on GitHub:
   - Navigate to **Settings > Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to `main` branch. The included `.github/workflows/deploy.yml` workflow will automatically build and deploy the `dist` folder.

### Method 2: Manual Deploy with `gh-pages`
```bash
npm run build
npx gh-pages -d dist
```

## Deploying to Hostinger

For Hostinger (hPanel / File Manager / FTP):
1. Run `npm run build`
2. Upload all files from the `dist/` directory directly into your Hostinger `public_html/` folder.
3. The website will load immediately with all luxury assets and interactive features intact.
