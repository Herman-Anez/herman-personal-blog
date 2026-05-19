import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL } from "@/resources";
import { getDictionary } from "@/shared/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.locale);
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
  const dict = getDictionary(resolvedParams.locale);
  const title = dict.blog.title;
  const description = dict.blog.description;
  const personName = dict.person.name;
  
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
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail locale={resolvedParams.locale} />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" locale={resolvedParams.locale} />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          {(dict.ui as any).earlierPosts || "Earlier posts"}
        </Heading>
        <Posts range={[4]} columns="2" locale={resolvedParams.locale} />
      </Column>
    </Column>
  );
}
