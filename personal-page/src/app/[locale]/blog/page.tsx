import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";
import { BlogListView } from "@/components/layout-components/BlogListView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { dict } = getSharedContext(resolvedParams.locale);
  const title = dict.blog.title;
  const description = dict.blog.description;

  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/images/og/home.jpg`,
    path: `/${resolvedParams.locale}/blog`,
  });
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { dict } = getSharedContext(resolvedParams.locale);
  const title = dict.blog.title;
  const description = dict.blog.description;
  const personName = dict.person.name;
  const earlierPostsLabel = (dict.ui as any).earlierPosts || "Earlier posts";
  
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={title}
        description={description}
        path={`/blog`}
        image={`/images/og/home.jpg`}
        author={{
          name: personName,
          url: `${baseURL}/blog`,
          image: `${baseURL}/images/avatar.jpg`,
        }}
      />
      <BlogListView
        title={title}
        locale={resolvedParams.locale}
        earlierPostsLabel={earlierPostsLabel}
      />
    </Column>
  );
}
