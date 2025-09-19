import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path starts with a locale that is not in our allowed list
  const pathnameHasLocale = pathname.split("/")[1];
  const allowedLocales = ["en", "es"];

  if (pathnameHasLocale && !allowedLocales.includes(pathnameHasLocale)) {
    // If it's not a valid locale, redirect to a non-existent route to trigger not-found.tsx
    const url = request.nextUrl.clone();
    url.pathname = "/en/not-found";
    return Response.redirect(url);
  }

  // If no locale is present, redirect to default locale
  if (!pathnameHasLocale && pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return Response.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
