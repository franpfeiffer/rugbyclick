import React, { useState, useEffect } from 'react'

export default function LatestYouTubeVideo() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const response = await fetch('/api/fetch-latest-yt-video')
        if (!response.ok) {
          throw new Error(`http error status: ${response.status}`)
        }
        const data = await response.json()
        if (data.videoId) {
          setVideoId(data.videoId)
        } else if (data.error) {
          throw new Error(data.error)
        } else {
          throw new Error("response no esperada del server")
        }
      } catch (err) {
        console.error('error fetcheando: ', err)
        setError(err instanceof Error ? err.message : "error al conseguir el video")
      } finally {
        setLoading(false)
      }
    }

    fetchLatestVideo()
  }, [])

  if (loading) return <div className="h-full flex items-center justify-center">Cargando...</div>
  if (error) return (
    <div className="h-full flex flex-col items-center justify-center">
      <p>Error: {error}</p>
      <p className="mt-2 text-sm text-gray-500">Por favor, intenta recargar la página. Si el problema persiste no podra ver el video. Lo sentimos!</p>
    </div>
  )
  if (!videoId) return <div className="h-full flex items-center justify-center">No se encontró ningún video</div>

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Último video de RugbyClick"
      className="w-full h-full"
      allowFullScreen
    ></iframe>
  )
}
