// lo que costo esta mier yt te odio con todo mi corazon. 
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

let cache: { videoId: string; timestamp: number } | null = null;
const CACHE_EXPIRY_TIME = 10000 * 60;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchLatestVideo() {
  const channelUrl = 'https://www.youtube.com/@RugbyClick/videos';

  const browser = await puppeteer.launch({ headless: true });
  
  const page = await browser.newPage();
  await page.goto(channelUrl, { waitUntil: 'networkidle2' });
  
  const html = await page.content();
  console.log(html);
  
  await page.waitForSelector('ytd-rich-grid-media a#thumbnail', { timeout: 5000 });
  
  const latestVideoUrl = await page.$eval(
    'ytd-rich-grid-media a#thumbnail',
    (element) => element.href
  );
  await browser.close();

  if (!latestVideoUrl) {
    throw new Error("no se encontro el video");
  }

  const videoId = new URL(latestVideoUrl, 'https://www.youtube.com').searchParams.get('v');

  if (!videoId) {
    throw new Error("no saco el id");
  }

  return videoId;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const currentTime = Date.now();

    if (cache && (currentTime - cache.timestamp < CACHE_EXPIRY_TIME)) {
      return res.status(200).json({ videoId: cache.videoId });
    }

    const videoId = await fetchLatestVideo();
    
    cache = { videoId, timestamp: currentTime };

    res.status(200).json({ videoId });
  } catch (error) {
    console.error('Error fetcheando:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : "error pero no se donde mierda ta" });
  }
}

