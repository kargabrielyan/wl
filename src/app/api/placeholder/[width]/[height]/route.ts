import { NextRequest, NextResponse } from 'next/server'

// GET /api/placeholder/{width}/{height} - генерирует placeholder изображение
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ width: string; height: string }> }
) {
  try {
    const { width: widthParam, height: heightParam } = await params
    const width = parseInt(widthParam) || 300
    const height = parseInt(heightParam) || 300
    
    // Создаем SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" 
              fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
          ${width} × ${height}
        </text>
      </svg>
    `
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    })
  } catch (error) {
    console.error('Error generating placeholder:', error)
    return NextResponse.json(
      { error: 'Failed to generate placeholder' },
      { status: 500 }
    )
  }
}
