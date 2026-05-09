import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const baseUrl = 'http://localhost:3000';
const outputDir = path.join(process.cwd(), 'docs', 'screenshots', 'frontend-review');

const desktop = { width: 1440, height: 1100, deviceScaleFactor: 1 };
const mobile = { width: 375, height: 812, deviceScaleFactor: 1, isMobile: true };

const shots = [
  ['desktop-home.png', '/', desktop],
  ['desktop-work.png', '/work', desktop],
  ['desktop-case-studies.png', '/case-studies', desktop],
  ['desktop-blog.png', '/blog', desktop],
  ['desktop-contact.png', '/contact', desktop],
  ['desktop-book.png', '/book', desktop],
  ['mobile-home.png', '/', mobile],
  ['mobile-work.png', '/work', mobile],
  ['mobile-blog.png', '/blog', mobile],
  ['mobile-contact.png', '/contact', mobile],
  ['blog-article.png', '/blog/prompt-injection', desktop],
  ['project-detail.png', '/portfolio/ninja-genz', desktop],
  ['case-study-detail.png', '/case-studies/automating-agency', desktop],
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: desktop,
});

try {
  const page = await browser.newPage();

  for (const [filename, route, viewport] of shots) {
    await page.setViewport(viewport);
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.screenshot({ path: path.join(outputDir, filename), fullPage: true });
    console.log(`${filename} ${route}`);
  }

  await page.setViewport(mobile);
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.click('button[aria-controls="mobile-menu"]');
  await page.screenshot({ path: path.join(outputDir, 'mobile-nav-open.png'), fullPage: true });
  console.log('mobile-nav-open.png /');
} finally {
  await browser.close();
}
