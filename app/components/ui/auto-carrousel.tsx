'use client'

import { useState, useEffect, ReactNode } from "react"

interface AutoCarouselProps {
  items: ReactNode[];
  interval?: number;
}

export default function AutoCarousel({ items, interval = 3000 }: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, interval)
    return () => clearInterval(timer)
  }, [items.length, interval])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 flex justify-center items-center">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
