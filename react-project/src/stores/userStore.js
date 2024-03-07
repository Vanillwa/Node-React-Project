import { create } from "zustand";

export const useUserStore = create((set)=>({
  user : {
    id : 1,
    email : "root",
    nickname : "관리자"
  },
  setUser : (newUser) => set({user : newUser})
}))