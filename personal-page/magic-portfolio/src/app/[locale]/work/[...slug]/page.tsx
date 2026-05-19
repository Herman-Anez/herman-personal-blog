import { notFound } from "next/navigation";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { ScrollToHash, CustomMDX, SeriesNav } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/work/Projects";
import { projectRepository } from "@/modules/work/infrastructure/projectRepository";
import { getProjectDetailViewModel } from "@/modules/work/presentation/viewModels/projectDetailViewModel";
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

  const projectState = await getProjectDetailViewModel(slugPath, locale);
  if (!projectState) return {};

  return Meta.generate({
    title: projectState.title,
    description: projectState.summary,
    baseURL: baseURL,
    image: projectState.images[0] || `/api/og/generate?title=${projectState.title}`,
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

  const post = await getProjectDetailViewModel(slugPath, locale);

  if (!post) {
    notFound();
  }

  const dict = getDictionary(locale);
  const avatars = post.team.map((person) => ({
    src: person.avatar,
  }));

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`/work/${post.slug}`}
        title={post.title}
        description={post.summary}
        datePublished={post.publishedAt}
        dateModified={post.publishedAt}
        image={
          post.images[0] || `/api/og/generate?title=${encodeURIComponent(post.title)}`
        }
        author={{
          name: dict.person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}/images/avatar.jpg`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href={`/${locale}/work`}>
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.dateFormatted}
        </Text>
        <Heading variant="display-strong-m">{post.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {avatars.length > 0 && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.team.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                {member.name}
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.images[0]} />
      )}
      {post.siblings && post.siblings.length > 1 && (
        <Column fillWidth style={{ margin: "auto" }} maxWidth="xs" marginBottom="16">
          <SeriesNav
            siblings={post.siblings}
            currentSlug={post.slug}
            locale={locale}
            basePath="work"
            seriesTitle={dict.ui.series}
          />
        </Column>
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} locale={locale} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          {(dict.ui as any).relatedProjects || "Related projects"}
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} locale={locale} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
