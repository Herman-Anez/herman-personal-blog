export interface AppNavigation {
  home: string;
  about: string;
  work: string;
  blog: string;
  gallery: string;
  workFeatured: string;
  dynamicBases: readonly string[];
}

export const ROUTE_MAP = {
  home: "/",
  about: "/about",
  work: "/work",
  blog: "/blog",
  gallery: "/gallery",
} as const;

export const FEATURED_WORK_SLUG = "automate-design-handovers-with-a-figma-to-code-pipeline" as const;

export function getNavigationCoordinator(locale: string): AppNavigation {
  const base = `/${locale}`;
  return {
    home: `${base}`,
    about: `${base}/about`,
    work: `${base}/work`,
    blog: `${base}/blog`,
    gallery: `${base}/gallery`,
    workFeatured: `${base}/work/${FEATURED_WORK_SLUG}`,
    dynamicBases: [ROUTE_MAP.blog, ROUTE_MAP.work],
  };
}
