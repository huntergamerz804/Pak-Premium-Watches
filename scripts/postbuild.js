import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');

// 1. Ensure .nojekyll in dist
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

// 2. Ensure 404.html in dist
const indexHtmlPath = path.join(distDir, 'index.html');
const notFoundHtmlPath = path.join(distDir, '404.html');
if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
}

// 3. Copy dist to docs for GitHub Pages "/docs" branch deployment
if (fs.existsSync(distDir)) {
  fs.cpSync(distDir, docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
}

console.log('✓ Successfully configured dist/ and docs/ with .nojekyll and 404.html for GitHub Pages!');
