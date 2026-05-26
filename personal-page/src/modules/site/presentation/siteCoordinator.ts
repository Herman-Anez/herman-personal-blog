import { getHomeViewModel, HomeViewState } from "./viewModels/homeViewModel";

export type HomeFlow = {
  type: "home";
  state: HomeViewState;
};

export async function getHomeCoordinator(locale: string): Promise<HomeFlow> {
  const state = await getHomeViewModel(locale);
  return { type: "home", state };
}
