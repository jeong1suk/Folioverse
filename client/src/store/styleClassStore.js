//담당 : 이승현

import { create } from "zustand";

const styleClassStore = (set) => ({
  bgColor: "bg-white dark:bg-[#1a1a1a]",
  boxColor: "bg-[#d8d8d8] dark:bg-[#333333]",
  borderColor: "border-solid border-[#9b9b9b] dark:border-[#575757]",
  fontColorA: "text-[#3e3e3e] dark:text-[#fff]",
  fontColorB: "text-[#4f4f4f] dark:text-[#a4a4a4]",
  fontColorC: "text-[#808080] dark:text-[#868686]",
  pointColor:
    "bg-[#69b1ff] dark:bg-[#407bb3] dark:text-[#d4d4d4] text-white hover:bg-[#5581ab] hover:text-[#ebebeb] dark:hover:bg-[#2c4e6e] dark:hover:text-white",
});

const useStyleClassStore = create(styleClassStore);

export default useStyleClassStore;
