import { notFound } from "next/navigation";
import { Schema, Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";
import { Metadata } from "next";
import { projectRepository } from "@/modules/work/infrastructure/projectRepository";
import { getWorkDetailCoordinator } from "@/modules/work/presentation/workCoordinator";
import { WorkDetailView } from "@/components/work/WorkDetailView";


export async function generateStaticParams() {
  const locales = ["es", "en"];
  const posts = projectRepository.getAllProjects();
  
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

  const flow = await getWorkDetailCoordinator(slugPath, locale);
  if (flow.type !== "detail") return {};
  const projectState = flow.state;

  return Meta.generate({
    title: projectState.title,
    description: projectState.summary,
    baseURL: baseURL,
    image: projectState.images[0] || `/images/og/home.jpg`,
    path: `/${locale}/work/${projectState.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[]; locale: string }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const locale = routeParams.locale;

  const flow = await getWorkDetailCoordinator(slugPath, locale);

  if (flow.type !== "detail") {
    notFound();
  }
  const post = flow.state;

  const { dict } = getSharedContext(locale);

  return (
    <>
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`/work/${post.slug}`}
        title={post.title}
        description={post.summary}
        datePublished={post.publishedAt}
        dateModified={post.publishedAt}
        image={
          post.images[0] || `/images/og/home.jpg`
        }
        author={{
          name: dict.person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}/images/avatar.jpg`,
        }}
      />
      <WorkDetailView
        post={post}
        locale={locale}
        dict={dict}
      />
    </>
  );
}
