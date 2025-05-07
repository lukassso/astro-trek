import { chromium } from 'playwright';

export const prerender = false;

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url).searchParams.get('url');
  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing URL' }), { status: 400 });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForSelector('body', { timeout: 10000 });

    const data = await page.evaluate(() => {
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || null,
        ogImage: document.querySelector('meta[property="og:image"]')?.content || null,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText),
        text: document.body.innerText.trim().slice(0, 5000),
        links: Array.from(document.querySelectorAll('a')).map(a => a.href),
      };
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    await browser.close();
  }
}
