//담당 : 이승현

import { useEffect } from "react";

const AddAward = ({ award, setAward, setIsValid }) => {
  useEffect(() => {
    if (award.name && award.date) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [award.name, award.date]);

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="수상 내역(필수)"
        onChange={(e) => setAward({ ...award, name: e.target.value })}
        value={award.name}
        maxLength={20}
        required
      />
      <input
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="수상 날짜(필수)"
        onChange={(e) => setAward({ ...award, date: e.target.value })}
        value={award.date}
        maxLength={20}
        required
      />
    </>
  );
};

export default AddAward;
