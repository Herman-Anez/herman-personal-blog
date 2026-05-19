import { baseURL, routes as routesConfig } from "@/resources";
import { dictionaries } from "@/shared/i18n/dictionaries";
import { mdxBlogRepository } from "@/modules/blog/infrastructure/mdxRepository";
import { projectRepository } from "@/modules/work/infrastructure/projectRepository";

export default async function sitemap() {
  const locales = Object.keys(dictionaries);
  let allRoutes: { url: string; lastModified: string }[] = [];

  locales.forEach((locale) => {
    const blogs = mdxBlogRepository.getAllPosts().map((post) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

    const works = projectRepository.getAllProjects().map((post) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }));

    const activeRoutes = Object.keys(routesConfig).filter(
      (route) => routesConfig[route as keyof typeof routesConfig],
    );

    const routes = activeRoutes.map((route) => ({
      url: `${baseURL}/${locale}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    }));

    allRoutes = [...allRoutes, ...routes, ...blogs, ...works];
  });

  return allRoutes;
}
