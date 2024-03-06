import { create } from "zustand";

export const createPostStore = create((set) => ({
  createPost: "",
  setCreatePost: () => set((state) => ({ createPost: !state })),
}));
