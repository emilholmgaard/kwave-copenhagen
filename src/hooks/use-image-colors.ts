'use client'

import { useEffect, useState } from 'react'

export interface ImageColors {
  primary: string
  secondary: string
  tertiary: string
}

export function useImageColors(imageSrc: string | undefined): ImageColors | null {
  const [colors, setColors] = useState<ImageColors | null>(null)

  useEffect(() => {
    if (!imageSrc) {
      setColors(null)
      return
    }

    const img = new Image()
    // Try to set crossOrigin, but it might fail for same-origin images
    try {
      img.crossOrigin = 'anonymous'
    } catch (e) {
      // Ignore if crossOrigin can't be set
    }
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          setColors(null)
          return
        }

        ctx.drawImage(img, 0, 0)
        
        // Sample colors from different areas of the image
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        
        // Extract dominant colors using a simple k-means approach
        const colorMap = new Map<string, number>()
        
        // Sample every 10th pixel for performance
        for (let i = 0; i < pixels.length; i += 40) {
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]
          
          // Quantize colors to reduce noise
          const qr = Math.floor(r / 32) * 32
          const qg = Math.floor(g / 32) * 32
          const qb = Math.floor(b / 32) * 32
          
          const key = `${qr},${qg},${qb}`
          colorMap.set(key, (colorMap.get(key) || 0) + 1)
        }
        
        // Helper function to convert RGB to hex
        const rgbToHex = (r: number, g: number, b: number): string => {
          return '#' + [r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
          }).join('')
        }
        
        // Get top 3 most common colors
        const sortedColors = Array.from(colorMap.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([key]) => {
            const [r, g, b] = key.split(',').map(Number)
            return rgbToHex(r, g, b)
          })
        
        // If we have less than 3 colors, duplicate the last one or use defaults
        while (sortedColors.length < 3) {
          sortedColors.push(sortedColors[sortedColors.length - 1] || '#fff1be')
        }
        
        setColors({
          primary: sortedColors[0] || '#fff1be',
          secondary: sortedColors[1] || '#ee87cb',
          tertiary: sortedColors[2] || '#b060ff',
        })
      } catch (error) {
        console.error('Error extracting colors:', error)
        setColors(null)
      }
    }
    
    img.onerror = () => {
      setColors(null)
    }
    
    img.src = imageSrc
  }, [imageSrc])

  return colors
}

