import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const CHANNEL_ID = 'UC0R4ciFowE-JA8FrOuK_FGw'

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&type=video&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el último video de YouTube' })
  }
}
