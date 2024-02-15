import { NextRequest, NextResponse } from "next/server";
import { supabaseServerHandler } from "./lib/supabase";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { origin, pathname } = new URL(request.url)
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });
  const userInSigninPage = pathname.includes("/signin")
  const supabase = supabaseServerHandler(cookies())
  const { data: { session } } = await supabase.auth.getSession();
  console.log(session)
  if (!session && !userInSigninPage) {
    return NextResponse.redirect(`${origin}/signin`)
  }
  if (session && userInSigninPage) {
    return NextResponse.redirect(origin)
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)', "/signin"],
}
