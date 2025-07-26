import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  drawerOpen: boolean;
  settingsOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  toggleSettings: () => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      drawerOpen: false,
      settingsOpen: false,
      toggleDrawer: () =>
        set((state) => ({ drawerOpen: !state.drawerOpen, settingsOpen: false })),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleSettings: () =>
        set((state) => ({ settingsOpen: !state.settingsOpen })),
      setSettingsOpen: (open) => set({ settingsOpen: open }),
    }),
    {
      name: "layout-storage", // localStorage key
    }
  )
);
