//담당 : 이승현

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const themeStore = (set) => ({
  theme: false,
  toggleTheme: () => set((state) => ({ theme: !state.theme })),
});

const useThemeStore = create(
  devtools(
    persist(themeStore, {
      name: "themeStore",
    })
  )
);

export default useThemeStore;
