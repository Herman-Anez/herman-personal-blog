import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";
import { WorkListView } from "@/components/layout-components/WorkListView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { dict } = getSharedContext(resolvedParams.locale);
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
  const { dict } = getSharedContext(resolvedParams.locale);
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
      <WorkListView
        title={title}
        locale={resolvedParams.locale}
      />
    </Column>
  );
}
