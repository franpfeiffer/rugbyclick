'use client'

import { useState, useEffect } from "react"
import { ExternalLinkIcon } from "lucide-react"
import { InstagramPost } from '../interfaces/insta-interface'

export default function InstaButton() {
  const [post, setPost] = useState<InstagramPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestPost = async () => {
      const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${INSTAGRAM_ACCESS_TOKEN}`)
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setPost(data.data[0])
        } else {
          throw new Error("No se encontró ningún post")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchLatestPost()
  }, [])

  if (loading) return <div className="w-full h-full flex items-center justify-center">Cargando...</div>
  if (error) return <div className="w-full h-full flex items-center justify-center">Error: {error}</div>
  if (!post) return <div className="w-full h-full flex items-center justify-center">No se encontró ningún post</div>

  return (
    <div className="p-4 bg-huesoRugbyClick">
      <a 
        href={post.permalink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full bg-azulRugbyClick hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
      >
        Ver en Instagram
        <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </a>
    </div>
  )
}

