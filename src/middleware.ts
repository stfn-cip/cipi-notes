import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";
import {
  authRoutes,
  DEFAULT_LOGIN,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./lib/routes";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // update user's auth session
  const updatedRequest = await updateSession(request);
  const supabase = await createClient();

  const {
    data: { user: isSignedIn },
  } = await supabase.auth.getUser();
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  console.log("isAuthRoute", isAuthRoute);
  console.log("isPublicRoute", isPublicRoute);
  console.log("isSignedIn", isSignedIn);

  if (isAuthRoute) {
    if (isSignedIn)
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

    return updatedRequest;
  }

  if (!isPublicRoute && !isSignedIn)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN, nextUrl));

  return updatedRequest;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
