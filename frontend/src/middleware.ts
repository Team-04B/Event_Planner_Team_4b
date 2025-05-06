import { type NextRequest, NextResponse } from "next/server"
import { jwtDecode } from "jwt-decode"

type Role = keyof typeof roleBasedPrivateRoutes

const authRoutes = ["/login", "/register"]

const roleBasedPrivateRoutes = {
  USER: [/^\/dashboard/],
  ADMIN: [/^\/dashboard/],
}

const roleDashboardPaths = {
  USER: "/dashboard",
  ADMIN: "/dashboard",
}

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl

  // ✅ Get the accessToken directly from cookies
  const accessToken = request.cookies.get("accessToken")?.value
  let userInfo = null

  if (accessToken) {
    try {
      userInfo = jwtDecode(accessToken) as any
    } catch (err) {
      console.error("Invalid access token", err)
    }
  }

  // If user is not authenticated
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      )
    }
  }

  const role = userInfo?.role as Role

  // Check if user has access to the current route based on their role
  if (role && roleBasedPrivateRoutes[role]) {
    const routes = roleBasedPrivateRoutes[role]
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next()
    }
  }

  // Redirect to dashboard if not already there
  if (role && roleDashboardPaths[role]) {
    if (pathname !== roleDashboardPaths[role]) {
      return NextResponse.redirect(new URL(roleDashboardPaths[role], request.url))
    } else {
      return NextResponse.next()
    }
  }

  // Fallback redirect to home page
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: ["/login", "/register", "/dashboard", "/dashboard/:path*"],
}
