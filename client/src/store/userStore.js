//담당 : 이승현

import { create } from "zustand";

const userStore = (set) => ({
  id: "",
  setId: (userId) => {
    set((state) => ({ id: userId }));
  },
  closeToast: () => set((state) => ({ isOpen: false })),
});

const useUserStore = create(userStore);

export default useUserStore;
