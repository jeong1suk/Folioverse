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
      className="h-[40px] w-[300px] mx-[5px] bg-[#e3e3e3] dark:bg-[#3e3e3e] float-right absolute top-[50px] left-50% translate-x-[-50%] rounded-xl"
      onFocus={() => setIsInputFocused(true)}
    >
      <input
        placeholder="검색어를 입력해주세요."
        className={`h-[40px] w-[300px] mx-[5px] float-right relative top-[50%] -translate-y-1/2 rounded-[10px]
        bg-transparent outline-none text-center ${fontColorA}`}
        onChange={handleInput}
      />

      {isInputFocused && inputValue && (
        <ul
          className={`w-[300px] h-[fit-content] max-h-[330px] relative left-[50%] -translate-x-1/2 top-[5px] rounded-[5px] 
          opacity-100 overflow-y-scroll ${styles.hideScroll}`}
        >
          <SearchResultView inputValue={inputValue} />
        </ul>
      )}
    </div>
  );
};
export default SearchInput;
