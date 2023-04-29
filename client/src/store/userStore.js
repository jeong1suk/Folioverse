//담당 : 이승현

import { create } from "zustand";

const userStore = (set) => ({
  id: "644be62dac170f1848d5eeb2",
  setId: (userId) => {
    set((state) => ({ userId }));
  },
  closeToast: () => set((state) => ({ isOpen: false })),
});

const useUserStore = create(userStore);

export default useUserStore;
