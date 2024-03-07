import { create } from "zustand";

export const createPostStore = create((set) => ({
  createPost: "",
  setCreatePost: () => set((state) => ({ createPost: !state })),
}));

export const usePostStore = create((set)=>({
  posts : [],
  setPosts : (newPosts) => set({posts : newPosts})
}))