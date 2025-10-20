'use client'

import { useEffect, useState } from 'react'
// Remove direct Image usage for masked rendering

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: 'dot' | 'image'
}

interface TwinklingStarsProps {
  count?: number
  className?: string
  imageStarRatio?: number
}

export default function TwinklingStars({ 
  count = 50, 
  className = '',
  imageStarRatio = 0.2
}: TwinklingStarsProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = []
      for (let i = 0; i < count; i++) {
        const isImageStar = Math.random() < imageStarRatio
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: isImageStar ? Math.random() * 20 + 15 : Math.random() * 3 + 1,
          delay: Math.random() * 3,
          duration: Math.random() * 2 + 1,
          type: isImageStar ? 'image' : 'dot'
        })
      }
      setStars(newStars)
    }
    generateStars()
  }, [count, imageStarRatio])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`
          }}
        >
          {star.type === 'image' ? (
            <div className="w-full h-full star-mask" />
          ) : (
            <div className="w-full h-full rounded-full bg-white" />
          )}
        </div>
      ))}
    </div>
  )
}
