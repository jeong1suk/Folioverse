//담당 : 이승현

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const mvpStore = (set) => ({
  education: true,
  project: true,
  award: true,
  certificate: true,
  career: true,
  toggleEducation: () => set((state) => ({ education: !state.education })),
  toggleProject: () => set((state) => ({ project: !state.project })),
  toggleAward: () => set((state) => ({ award: !state.award })),
  toggleCertificate: () =>
    set((state) => ({ certificate: !state.certificate })),
  toggleCareer: () => set((state) => ({ career: !state.career })),
});

const mvpSelectStore = create(
  devtools(
    persist(mvpStore, {
      name: "mvpStore",
    })
  )
);

export default mvpSelectStore;
