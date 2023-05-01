//담당 : 이승현

import { create } from "zustand";

const userStore = (set) => ({
  id: "644b8c05eb6346d15ad96670",
  setId: (userId) => {
    set((state) => ({ id: userId }));
  },
  closeToast: () => set((state) => ({ isOpen: false })),
});

const useUserStore = create(userStore);

export default useUserStore;
