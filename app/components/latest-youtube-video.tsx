'use client'

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
          throw new Error(`Error de HTTP: ${response.status}`)
        }
        const data = await response.json()
        if (data.videoId) {
          setVideoId(data.videoId)
        } else {
          throw new Error(data.error || "Respuesta inesperada del servidor")
        }
      } catch (err) {
        console.error('Error al obtener el video:', err)
        setError(err instanceof Error ? err.message : "Error al obtener el video")
      } finally {
        setLoading(false)
      }
    }

    fetchLatestVideo()
  }, [])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-lg">Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
        <p className="mt-2 text-sm text-gray-500">
          Por favor, intenta recargar la página. Si el problema persiste, no podrás ver el video. ¡Lo sentimos!
        </p>
      </div>
    )
  }

  if (!videoId) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-lg">No se encontró ningún video</p>
      </div>
    )
  }

  return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Último video de RugbyClick"
        className="w-full h-full"
        allowFullScreen
      ></iframe>
  )
}
