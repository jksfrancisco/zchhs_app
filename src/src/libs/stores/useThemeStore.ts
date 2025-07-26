import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light",
      toggleMode: () => {
        set({ mode: get().mode === "light" ? "dark" : "light" });
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
