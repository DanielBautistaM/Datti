import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"];
const DEFAULT_LOCALE = "es";

function detectLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  const langs = acceptLang
    .split(",")
    .map((s) => s.split(";")[0].trim().toLowerCase().slice(0, 2));
  for (const lang of langs) {
    if (LOCALES.includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already on a locale path — let through
  const hasLocale = LOCALES.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocale) return;

  // Skip internals and standalone pages
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/agendar" ||
    pathname === "/schedule"
  ) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
