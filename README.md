# AUREN | Luxury Mechanical Timepieces

A high-end, responsive luxury mechanical-watch e-commerce website with in-house horological curation, bespoke cart, and Gemini-powered horological advisory.

---

## GitHub Pages Deployment (Guaranteed Working)

The project is now configured so it works with **any** deployment method on GitHub:

### Option 1: 1-Click Deployment with `npm run deploy` (Fastest)
Run this command in your project terminal:
```bash
npm run deploy
```
This automatically builds the project and pushes it to a `gh-pages` branch. In your repository on GitHub, navigate to **Settings > Pages** and select branch: `gh-pages`, folder: `/ (root)`.

---

### Option 2: Deploy from `/docs` (No Terminal Setup Needed)
1. Push your repository to GitHub (`git add . && git commit -m "Update" && git push`).
2. On GitHub, navigate to **Settings** (gear icon) > **Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Set:
   * **Branch**: `main` (or `master`)
   * **Folder**: **/docs**
5. Click **Save**. Within 30 seconds, your site is live!

---

### Option 3: Deploy via GitHub Actions (Automated CI/CD)
1. In your GitHub repository, go to **Settings > Pages**.
2. Under **Build and deployment > Source**, choose **GitHub Actions** from the dropdown.
3. Every time you push to `main`, GitHub Actions will build and deploy the site automatically using `.github/workflows/deploy.yml`.

---

### Option 4: Deploy from `/ (root)`
Even if you leave the GitHub Pages setting on the default (`main` branch, folder `/ (root)`), our updated root `index.html` has a production fallback that automatically loads `./assets/index.js` and `./assets/index.css`.
