//담당 : 이승현

import { create } from "zustand";

const modalStore = (set) => ({
  isOpen: false,
  id: "",
  type: "",
  name: "",
  id2: "",
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setModal: (id, type, name, id2) =>
    set((state) => ({ id, type, name, id2, isOpen: true })),
});

const useModalStore = create(modalStore);

export default useModalStore;
