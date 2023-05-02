//담당 : 이승현

import { create } from "zustand";

const toastStore = (set) => ({
  content: "",
  type: "success",
  isOpen: false,
  profileImage: "",
  setToast: (content, type, profileImage) => {
    set(() => ({ content, type, profileImage, isOpen: true }));
  },
  closeToast: () => set(() => ({ isOpen: false })),
});

const useToastStore = create(toastStore);

export default useToastStore;
