import { create } from "zustand";

export const usePostStore = create((set) => ({
  post: {},
  setPost: (newPost) => set({ post: newPost }),
  posts: [],
  setPosts: (newPosts) => set({ posts: newPosts }),
  page: 1,
  setPage: (newPage) => set({ page: newPage }),
  limit: 10,
  setLimit: (newLimit) => set({ limit: newLimit }),
  order: "DESC",
  setOrder: (newOrder) => set({ order: newOrder }),
  totalPage: 0,
  setTotalPage: (newTotalPage) => set({ totalPage: newTotalPage }),
  onUpdate: false,
  setOnUpdate: (newOnUpdate) => set({ onUpdate: newOnUpdate }),
}));
