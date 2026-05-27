import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';


export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          supabaseResponse = NextResponse.next({
            request,
          });
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Single getUser call refreshes the session, sets cookies, and checks the user simultaneously.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  console.log(`[Middleware] Path: ${path}, User: ${user?.email || "none"}, Error: ${error?.message || "none"}, Cookies: ${request.cookies.getAll().map(c => `${c.name}=${c.value.substring(0, 10)}...`).join(", ")}`);

  const isProtectedRoute = [
    '/dashboard',
    '/transactions',
    '/categories',
    '/wallets',
    '/budgets',
    '/goals',
    '/ocr',
    '/reports',
    '/profile'
  ].some((route) => path === route || path.startsWith(route + '/'));

  if (isProtectedRoute && !user) {
    console.log(`[Middleware] Redirecting unauthorized user from ${path} to /account/signin`);
    const url = request.nextUrl.clone();
    url.pathname = '/account/signin';
    url.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
