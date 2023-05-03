//담당 : 이승현

import { create } from "zustand";

const modalStore = (set) => ({
  isOpen: false,
  id: "",
  type: "",
  name: "",
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setModal: (id, type, name) =>
    set((state) => ({ id, type, name, isOpen: true })),
});

const useModalStore = create(modalStore);

export default useModalStore;
