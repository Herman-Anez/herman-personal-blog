"use client";

import { Media, MasonryGrid } from "@once-ui-system/core";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { useParams } from "next/navigation";

const galleryImages = [
  {
    src: "/images/gallery/img-01.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-02.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-03.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-04.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-05.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-06.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-07.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-08.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-09.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-10.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-11.jpg",
    alt: "image",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/img-12.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-13.jpg",
    alt: "image",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/img-14.jpg",
    alt: "image",
    orientation: "horizontal",
  },
];

export default function GalleryView() {
  const params = useParams();
  const locale = (params?.locale as string) || "es";
  const dict = getDictionary(locale);
  const gallery = {
    display: true,
    title: dict.gallery.title,
    description: dict.gallery.description,
    images: galleryImages,
  };

  return (
    <MasonryGrid columns={2} s={{ columns: 1 }}>
      {gallery.images.map((image, index) => (
        <Media
          enlarge
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
        />
      ))}
    </MasonryGrid>
  );
}
