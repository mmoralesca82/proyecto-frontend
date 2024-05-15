import { auth } from "@/auth"

export const config = {
  matcher: ['/dashboard/:path*']
}

export default auth(req => {
  if (!req.auth) {
    const url = req.url.replace(req.nextUrl.pathname, "/")
    return Response.redirect(url)
  }
})