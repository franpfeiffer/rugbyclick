// lo que costo esta mier yt te odio con todo mi corazon. 
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

let cache: { videoId: string; timestamp: number } | null = null;
const CACHE_EXPIRY_TIME = 10 * 60 * 1000; 

async function fetchLatestVideo() {
  const channelUrl = 'https://www.youtube.com/@RugbyClick/videos';
  const response = await fetch(channelUrl);
  const html = await response.text();

  const regex = /{"videoId":"([^"]+)"/;
  const match = html.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  throw new Error("No se encontró el video");
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
    console.error('Error fetching:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : "Error desconocido" });
  }
}
