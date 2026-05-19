import { Flex, Meta, Schema } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL } from "@/resources";
import { getDictionary } from "@/shared/i18n/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.locale);
  const title = dict.gallery.title;
  const description = dict.gallery.description;

  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/images/og/home.jpg`,
    path: `/${resolvedParams.locale}/gallery`,
  });
}

export default async function Gallery({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const dict = getDictionary(resolvedParams.locale);
  const title = dict.gallery.title;
  const description = dict.gallery.description;
  const personName = dict.person.name;
  
  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={title}
        description={description}
        path={`/gallery`}
        image={`/images/og/home.jpg`}
        author={{
          name: personName,
          url: `${baseURL}/gallery`,
          image: `${baseURL}/images/avatar.jpg`,
        }}
      />
      <GalleryView />
    </Flex>
  );
}
