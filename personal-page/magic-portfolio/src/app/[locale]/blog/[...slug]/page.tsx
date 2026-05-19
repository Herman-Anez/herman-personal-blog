import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash, SeriesNav } from "@/components";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { mdxBlogRepository } from "@/modules/blog/infrastructure/mdxRepository";
import { getBlogPostViewModel } from "@/modules/blog/presentation/viewModels/blogPostViewModel";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
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

  const postState = await getBlogPostViewModel(slugPath, locale);
  if (!postState) return {};

  return Meta.generate({
    title: postState.title,
    description: postState.summary,
    baseURL: baseURL,
    image: postState.image || `/api/og/generate?title=${postState.title}`,
    path: `/${locale}/blog/${postState.slug}`,
  });
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[]; locale: string }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const locale = routeParams.locale;

  const post = await getBlogPostViewModel(slugPath, locale);
  if (!post) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`/blog/${post.slug}`}
            title={post.title}
            description={post.summary}
            datePublished={post.publishedAt}
            dateModified={post.publishedAt}
            image={
              post.image ||
              `/api/og/generate?title=${encodeURIComponent(post.title)}`
            }
            author={{
              name: post.authorName || dict.person.name,
              url: `${baseURL}/about`,
              image: `${baseURL}${post.authorAvatar || "/images/avatar.jpg"}`,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href={`/${locale}/blog`}>
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
              {post.dateFormatted}
            </Text>
            <Heading variant="display-strong-m">{post.title}</Heading>
            {post.subtitle && (
              <Text 
                variant="body-default-l" 
                onBackground="neutral-weak" 
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {post.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={post.authorAvatar || "/images/avatar.jpg"} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {post.authorName || dict.person.name}
              </Text>
            </Row>
          </Row>
          {post.image && (
            <Media
              src={post.image}
              alt={post.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          {post.siblings && post.siblings.length > 1 && (
            <Column fillWidth maxWidth="s" marginBottom="16">
              <SeriesNav
                siblings={post.siblings}
                currentSlug={post.slug}
                locale={locale}
                basePath="blog"
                seriesTitle={dict.ui.series}
              />
            </Column>
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} locale={locale} />
          </Column>
          
          <ShareSection 
            title={post.title} 
            url={`${baseURL}/blog/${post.slug}`} 
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              {dict.ui.latestFromBlog}
            </Text>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" locale={locale} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}
