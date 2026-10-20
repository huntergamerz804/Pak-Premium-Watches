import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const docsDir = path.join(rootDir, 'docs');
const rootAssetsDir = path.join(rootDir, 'assets');

// 1. Ensure .nojekyll in root and dist
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

// 3. Accurately detect the exact generated JS and CSS files from dist/index.html
const distAssetsDir = path.join(distDir, 'assets');
if (fs.existsSync(distAssetsDir) && fs.existsSync(indexHtmlPath)) {
  const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  const jsMatch = htmlContent.match(/src=["']\.\/assets\/(index-[^"']+\.js)["']/);
  const cssMatch = htmlContent.match(/href=["']\.\/assets\/(index-[^"']+\.css)["']/);

  const jsFile = jsMatch ? jsMatch[1] : null;
  const cssFile = cssMatch ? cssMatch[1] : null;

  if (jsFile && fs.existsSync(path.join(distAssetsDir, jsFile))) {
    fs.copyFileSync(path.join(distAssetsDir, jsFile), path.join(distAssetsDir, 'index.js'));
    console.log(`✓ Synchronized production JS bundle: ${jsFile} -> index.js`);
  } else {
    // Fallback: newest index-*.js file
    const assetFiles = fs.readdirSync(distAssetsDir);
    const newestJs = assetFiles
      .filter(f => f.startsWith('index-') && f.endsWith('.js'))
      .sort((a, b) => fs.statSync(path.join(distAssetsDir, b)).mtimeMs - fs.statSync(path.join(distAssetsDir, a)).mtimeMs)[0];
    if (newestJs) {
      fs.copyFileSync(path.join(distAssetsDir, newestJs), path.join(distAssetsDir, 'index.js'));
      console.log(`✓ Synchronized newest JS bundle: ${newestJs} -> index.js`);
    }
  }

  if (cssFile && fs.existsSync(path.join(distAssetsDir, cssFile))) {
    fs.copyFileSync(path.join(distAssetsDir, cssFile), path.join(distAssetsDir, 'index.css'));
    console.log(`✓ Synchronized production CSS bundle: ${cssFile} -> index.css`);
  } else {
    // Fallback: newest index-*.css file
    const assetFiles = fs.readdirSync(distAssetsDir);
    const newestCss = assetFiles
      .filter(f => f.startsWith('index-') && f.endsWith('.css'))
      .sort((a, b) => fs.statSync(path.join(distAssetsDir, b)).mtimeMs - fs.statSync(path.join(distAssetsDir, a)).mtimeMs)[0];
    if (newestCss) {
      fs.copyFileSync(path.join(distAssetsDir, newestCss), path.join(distAssetsDir, 'index.css'));
      console.log(`✓ Synchronized newest CSS bundle: ${newestCss} -> index.css`);
    }
  }

  // 4. Clean root /assets so root deployment (/ root) has exact current compiled bundles and assets
  if (fs.existsSync(rootAssetsDir)) {
    fs.rmSync(rootAssetsDir, { recursive: true, force: true });
  }
  fs.cpSync(distAssetsDir, rootAssetsDir, { recursive: true });
}

// 5. Completely wipe and refresh docs/ so GitHub Pages "/docs" branch has exact current bundle
if (fs.existsSync(distDir)) {
  if (fs.existsSync(docsDir)) {
    fs.rmSync(docsDir, { recursive: true, force: true });
  }
  fs.cpSync(distDir, docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');
}

console.log('✓ Successfully synchronized root, dist/, and docs/ with clean bundles, .nojekyll, and 404.html for GitHub Pages!');
