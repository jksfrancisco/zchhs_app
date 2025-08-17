// /libs/stores/useAuthStore.ts
import { create } from "zustand";

interface AuthState {
  user: any | null; // Replace `any` with your User type if you have one
  setUser: (user: any | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
