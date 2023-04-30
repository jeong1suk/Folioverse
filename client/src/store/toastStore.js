//담당 : 이승현

import { create } from "zustand";

const toastStore = (set) => ({
  content: "",
  type: "success",
  isOpen: false,
  setToast: (content, type) => {
    set((state) => ({ content, type, isOpen: true }));
  },
  closeToast: () => set((state) => ({ isOpen: false })),
});

const useToastStore = create(toastStore);

export default useToastStore;
