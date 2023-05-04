// 정주현
import useOnClickOutside from "./useOnClickOutside";
import SearchResultView from "./SearchResultView";
import styles from "./Header.module.css";
import { useRef, useState } from "react";

const SearchInput = () => {
  const ref = useRef();
  useOnClickOutside(ref, () => setIsInputFocused(false));
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      ref={ref}
      className="h-[40px] w-[fit-content] mx-[5px] float-right relative top-[50%] -translate-y-1/2  border-b-[1px] border-b-[#ccc] border-b-[solid]"
      onFocus={() => setIsInputFocused(true)}
    >
      <input
        placeholder="검색어를 입력해주세요."
        className={`h-[40px] w-[300px] mx-[5px] float-right relative top-[50%] -translate-y-1/2 rounded-[10px]
        bg-[rgba(181,181,181,0)] dark:bg-[rgba(26,26,26,0)] outline-none text-center ${fontColorA}`}
        onChange={handleInput}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5 "
      >
        <path
          fillRule="evenodd"
          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
          clipRule="evenodd"
        />
      </svg>

      {isInputFocused && inputValue && (
        <ul
          className={`w-[300px] h-[fit-content] max-h-[330px] relative left-[50%] top-[55px] rounded-bl-[10px] 
          rounded-br-[10px] opacity-90 dark:bg-[rgba(26,26,26,1)] overflow-y-scroll ${styles.hideScroll}`}
        >
          <SearchResultView inputValue={inputValue} />
        </ul>
      )}
    </div>
  );
};
export default SearchInput;
