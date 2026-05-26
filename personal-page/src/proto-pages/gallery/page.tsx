import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/layout-components/GalleryView";
import { baseURL } from "@/resources";
import { getGalleryCoordinator } from "@/modules/about/presentation/aboutCoordinator";
import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const flow = await getGalleryCoordinator(resolvedParams.locale);
  const gallery = flow.state;

  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/images/og/home.jpg`,
    path: `/${resolvedParams.locale}/gallery`,
  });
}

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const flow = await getGalleryCoordinator(resolvedParams.locale);
  const gallery = flow.state;
  const { person } = getSharedContext(resolvedParams.locale);
  
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={`/gallery`}
        image={`/images/og/home.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}/gallery`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView images={gallery.images} />
    </Flex>
  );
}


