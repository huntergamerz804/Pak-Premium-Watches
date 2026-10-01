import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');
const rootAssetsDir = path.join(rootDir, 'assets');

// 1. Ensure .nojekyll in root, dist, and docs
fs.writeFileSync(path.join(rootDir, '.nojekyll'), '');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
}

// 2. Ensure 404.html in dist
const indexHtmlPath = path.join(distDir, 'index.html');
const notFoundHtmlPath = path.join(distDir, '404.html');
if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
}

// 3. Find built JS and CSS files and create unhashed aliases index.js & index.css
const distAssetsDir = path.join(distDir, 'assets');
if (fs.existsSync(distAssetsDir)) {
  const assetFiles = fs.readdirSync(distAssetsDir);
  const jsFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.css'));

  if (jsFile) {
    fs.copyFileSync(path.join(distAssetsDir, jsFile), path.join(distAssetsDir, 'index.js'));
  }
  if (cssFile) {
    fs.copyFileSync(path.join(distAssetsDir, cssFile), path.join(distAssetsDir, 'index.css'));
  }

  // 4. Copy dist/assets to root /assets so root deployment (/ root) has all compiled bundles
  fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
}

// 5. Copy dist to docs for GitHub Pages "/docs" branch deployment
if (fs.existsSync(distDir)) {
  fs.cpSync(distDir, docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
}

console.log('✓ Successfully configured root, dist/, and docs/ with .nojekyll, 404.html, and unhashed asset fallbacks for GitHub Pages!');
