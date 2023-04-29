//담당 : 이승현

import { create } from "zustand";

const modalStore = (set) => ({
  isOpen: false,
  id: "",
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setModal: (id) => set((state) => ({ id, isOpen: true })),
});

const useModalStore = create(modalStore);

export default useModalStore;
