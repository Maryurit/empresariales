import { create } from "zustand";
import { getItems } from "../services/movies.service";

export const useMoviesStore = create((set) => ({
  items: [],
  getItems: async (resource) => {
    const data = await getItems(resource);
    set({ items: data });
  },
}));
