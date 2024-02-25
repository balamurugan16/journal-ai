import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { CookieOptions } from "@supabase/ssr";

const PUBLIC_PATHS = ["/", "/signin", "/register", "/auth/callback"];

export async function middleware(request: NextRequest) {
  const { origin, pathname, } = new URL(request.url);
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  if (PUBLIC_PATHS.includes(pathname)) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  const userInAuthPage = pathname.includes("/signin") || pathname.includes("/register");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user && !userInAuthPage) {
    return NextResponse.redirect(`${origin}/signin`);
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}

