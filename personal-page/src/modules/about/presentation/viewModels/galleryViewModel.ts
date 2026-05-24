import { getSharedContext } from "@/shared/coordinator/sharedCoordinator";

export interface GalleryPhoto {
  src: string;
  alt: string;
  orientation: "vertical" | "horizontal";
}

export interface GalleryViewState {
  title: string;
  description: string;
  images: GalleryPhoto[];
}

const GALLERY_IMAGES: GalleryPhoto[] = [
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

export const getGalleryViewModel = async (locale: string): Promise<GalleryViewState> => {
  const { dict } = getSharedContext(locale);
  return {
    title: dict.gallery.title,
    description: dict.gallery.description,
    images: GALLERY_IMAGES,
  };
};
