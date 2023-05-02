// 정주현

import SearchResultView from "./SearchResultView";
import styles from "./Header.module.css";
import { useState } from "react";

function SearchInput() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  return (
    <div
      className="h-[40px] w-[fit-content] mx-[5px] float-right relative top-[50%] -translate-y-1/2"
      onFocus={() => setIsInputFocused(true)}
      onBlur={() => setIsInputFocused(false)}
    >
      <input
        placeholder="검색어를 입력해주세요."
        className="h-[40px] w-[300px] mx-[5px] float-right relative top-[50%] -translate-y-1/2 rounded-[10px]
        bg-[rgba(161,161,161,0.7)] dark:bg-[rgba(26,26,26,0.9)] outline-none text-center text-[#212121] dark:text-[#b5b5b5]"
        onChange={handleInput}
      />
      {isInputFocused && inputValue && (
        <ul
          className={`w-[300px] h-[fit-content] max-h-[400px] relative left-[50%] top-[55px] rounded-bl-[10px] rounded-br-[10px] opacity-90 dark:bg-[rgba(26,26,26,1)] overflow-y-scroll scrollbar-hide ${styles.hideScroll}`}
        >
          <SearchResultView inputValue={inputValue} />
        </ul>
      )}
    </div>
  );
}
export default SearchInput;
