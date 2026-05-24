import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";
import { getAboutViewModel } from "@/modules/about/presentation/viewModels/aboutViewModel";
import { AboutView } from "@/components/about/AboutView";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { about } = await getAboutViewModel(resolvedParams.locale);

  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/images/og/home.jpg`,
    path: `/${resolvedParams.locale}${about.path}`,
  });
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { dict } = getSharedContext(resolvedParams.locale);
  const { about, person, social } = await getAboutViewModel(resolvedParams.locale);

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/images/og/home.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <AboutView
        about={about}
        person={person}
        social={social}
        dict={dict}
      />
    </Column>
  );
}