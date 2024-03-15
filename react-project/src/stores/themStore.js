import { create } from "zustand";

let sessionTheme = sessionStorage.getItem("theme");

export const useThemeStore = create((set) => ({
  theme: sessionTheme != null ? sessionTheme : "light",
  setTheme: (newTheme) => set({ theme: newTheme }),
}));
