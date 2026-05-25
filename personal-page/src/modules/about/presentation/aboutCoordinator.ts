import { getAboutViewModel, AboutViewState } from "./viewModels/aboutViewModel";
import { getGalleryViewModel, GalleryViewState } from "./viewModels/galleryViewModel";

export type AboutFlow = {
  type: "about";
  state: AboutViewState;
};

export type GalleryFlow = {
  type: "gallery";
  state: GalleryViewState;
};

export async function getAboutCoordinator(locale: string): Promise<AboutFlow> {
  const state = await getAboutViewModel(locale);
  return { type: "about", state };
}

export async function getGalleryCoordinator(locale: string): Promise<GalleryFlow> {
  const state = await getGalleryViewModel(locale);
  return { type: "gallery", state };
}
