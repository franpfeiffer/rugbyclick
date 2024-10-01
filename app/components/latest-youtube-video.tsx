"use client"

import React, { useState, useEffect } from 'react';

export default function LatestYouTubeVideo() {
  const [videoId, setVideoId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
      const CHANNEL_ID = 'UC0R4ciFowE-JA8FrOuK_FGw';
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=1&order=date&type=video&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoId(data.items[0].id.videoId);
        } else {
          throw new Error("No se encontraron videos");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchLatestVideo();
  }, []);

  if (loading) return <div className="h-full flex items-center justify-center">Cargando...</div>;
  if (error) return <div className="h-full flex items-center justify-center">Error: {error}</div>;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      title="Último video de RugbyClick"
      className="w-full h-full"
      allowFullScreen
    ></iframe>
  );
}
