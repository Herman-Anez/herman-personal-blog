import { notFound } from "next/navigation";
import { Schema, Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";
import { mdxBlogRepository } from "@/modules/blog/infrastructure/mdxRepository";
import { getBlogPostCoordinator } from "@/modules/blog/presentation/blogCoordinator";
import { Metadata } from "next";
import { BlogPostView } from "@/components/layout-components/BlogPostView";


export async function generateStaticParams() {
  const locales = ["es", "en"];
  const posts = mdxBlogRepository.getAllPosts();
  
  const paths: { locale: string; slug: string[] }[] = [];
  locales.forEach((locale) => {
    posts.forEach((post) => {
      paths.push({
        locale,
        slug: post.slug.split("/"),
      });
    });
  });
  
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[]; locale: string }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const locale = routeParams.locale;

  const flow = await getBlogPostCoordinator(slugPath, locale);
  if (flow.type !== "post") return {};
  const postState = flow.state;

  return Meta.generate({
    title: postState.title,
    description: postState.summary,
    baseURL: baseURL,
    image: postState.image || `/images/og/home.jpg`,
    path: `/${locale}/blog/${postState.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[]; locale: string }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const locale = routeParams.locale;

  const flow = await getBlogPostCoordinator(slugPath, locale);
  if (flow.type !== "post") {
    notFound();
  }
  const post = flow.state;

  const { dict } = getSharedContext(locale);

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`/blog/${post.slug}`}
        title={post.title}
        description={post.summary}
        datePublished={post.publishedAt}
        dateModified={post.publishedAt}
        image={
          post.image || `/images/og/home.jpg`
        }
        author={{
          name: post.authorName || dict.person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${post.authorAvatar || "/images/avatar.jpg"}`,
        }}
      />
      <BlogPostView
        post={post}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
