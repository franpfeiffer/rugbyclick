'use client'

import { useState, useEffect } from "react"
import Image from "next/image"

import { InstagramPost } from './interfaces/insta-interface'
import InstaButton from './ui/insta-button'

import { ImageIcon, VideoIcon, ImagesIcon } from "lucide-react"

export default function LatestInstagramPost() {
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
    <div className="w-full h-full min-h-[500px] bg-white rounded-lg overflow-hidden flex flex-col}">
      <div className="flex-grow flex flex-col">
        <div className="relative flex-grow mb-1">
          {post.media_type === 'VIDEO' ? (
            <video src={post.media_url} controls className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Image
              src={post.media_url}
              alt="Última publicación de Instagram de RugbyClick"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          )}
          <div className="absolute top-2 right-2 bg-huesoRugbyClick rounded-full p-1 shadow-md">
            {post.media_type === 'IMAGE' && <ImageIcon className="w-4 h-4 text-gray-500" />}
            {post.media_type === 'VIDEO' && <VideoIcon className="w-4 h-4 text-gray-500" />}
            {post.media_type === 'CAROUSEL_ALBUM' && <ImagesIcon className="w-4 h-4 text-gray-500" />}
          </div>
        </div>
        <InstaButton />
        <p className="text-sm mb-4 overflow-y-auto max-h-24 text-gray-700">{}</p>
      </div>
    </div>
  )
}

