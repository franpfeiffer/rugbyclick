'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLinkIcon, ImageIcon, VideoIcon, ImagesIcon } from "lucide-react"
import { InstagramPost } from './interfaces/insta-interface'

function InstaButtonWrapper({ post }: { post: InstagramPost }) {
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

export default function LatestNews() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const INSTAGRAM_ACCESS_TOKEN = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN
      
      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=4`)
        const data = await response.json()
        if (data.data && data.data.length > 1) {
          setPosts(data.data.slice(1, 4))
        } else {
          throw new Error("No se encontraron suficientes posts")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div className="w-full h-full flex items-center justify-center">Cargando...</div>
  if (error) return <div className="w-full h-full flex items-center justify-center">Error: {error}</div>
  if (posts.length === 0) return <div className="w-full h-full flex items-center justify-center">No se encontraron posts</div>

  return (
    <div className="bg-huesoRugbyClick">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-huesoRugbyClick rounded-lg overflow-hidden shadow-md">
            <div className="bg-huesoRugbyClick relative aspect-square">
              {post.media_type === 'VIDEO' ? (
                <video src={post.media_url} className="w-full h-full object-cover" />
              ) : (
                <Image
                  src={post.media_url}
                  alt={post.caption || "Publicación de Instagram de RugbyClick"}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <div className="absolute top-2 right-2 bg-huesoRugbyClick rounded-full p-1 shadow-md">
                {post.media_type === 'IMAGE' && <ImageIcon className="w-4 h-4 text-gray-500" />}
                {post.media_type === 'VIDEO' && <VideoIcon className="w-4 h-4 text-gray-500" />}
                {post.media_type === 'CAROUSEL_ALBUM' && <ImagesIcon className="w-4 h-4 text-gray-500" />}
              </div>
            </div>
            <InstaButtonWrapper post={post} />
          </div> 
        ))}
      </div>
    </div>
  )
}

