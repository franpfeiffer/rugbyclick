import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN

  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    )
    const data = await response.json()
    const latestPost = data.data[0]
    res.status(200).json(latestPost)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la última publicación de Instagram' })
  }
}
