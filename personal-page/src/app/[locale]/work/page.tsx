import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.locale);
  const title = dict.work.title;
  const description = dict.work.description;

  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/images/og/home.jpg`,
    path: `/${resolvedParams.locale}/work`,
  });
}

export default async function Work({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.locale);
  const title = dict.work.title;
  const description = dict.work.description;
  const personName = dict.person.name;
  
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={`/work`}
        title={title}
        description={description}
        image={`/images/og/home.jpg`}
        author={{
          name: personName,
          url: `${baseURL}/about`,
          image: `${baseURL}/images/avatar.jpg`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {title}
      </Heading>
      <Projects locale={resolvedParams.locale} />
    </Column>
  );
}
