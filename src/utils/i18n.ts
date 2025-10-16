export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export function detectLocale(pathname: string): Locale {
  return pathname.startsWith("/zh") ? "zh" : "en";
}

export function localePrefix(locale: Locale): string {
  return locale === "zh" ? "/zh" : "";
}

export function withLocalePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "zh") {
    return clean === "/" ? "/zh/" : clean.startsWith("/zh") ? clean : `/zh${clean}`;
  }
  // en: strip zh prefix if present
  return clean.replace(/^\/zh(?=\/|$)/, "") || "/";
}

export function toggleLocalePath(pathname: string): string {
  return pathname.startsWith("/zh") ? pathname.replace(/^\/zh(?=\/|$)/, "") || "/" : `/zh${pathname}`;
}

