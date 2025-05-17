import { create } from "zustand";
import type { UserType } from "../interfaces";

const useUserStore = create((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
}));
export default useUserStore;
export type UserStoreType = {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType) => void;
  clearCurrentUser: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};
