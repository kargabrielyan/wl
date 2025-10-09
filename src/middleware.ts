import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Временно отключаем проверку роли для тестирования
    // if (req.nextUrl.pathname.startsWith('/admin')) {
    //   if (req.nextauth.token?.role !== 'ADMIN') {
    //     return NextResponse.redirect(new URL('/login', req.url))
    //   }
    // }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Временно разрешаем доступ ко всем страницам
        return true
        // if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/profile')) {
        //   return !!token
        // }
        // return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*']
}
