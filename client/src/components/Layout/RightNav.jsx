import { useState } from "react";
// 담당: 정주현

import useThemeStore from "../../store/themeStore";
import darkModeImg from "/dark-mode.png";
import darkModeProfile from "/profile/profile-dark.png";
import SearchResultView from "./SearchResultView";
import styles from "./Header.module.css";
function RightNav({ isLogin }) {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleInput(e) {
    setInputValue(e.target.value);
  }

  return (
    <div className="absolute right-[20px] top-0 w-[fit-content] h-full">
      <img
        src={darkModeProfile}
        className={`w-[40px] h-[40px] mx-[5px] float-right relative top-[50%] -translate-y-1/2
          bg-center rounded-[10px] invert-[20%] dark:invert-[0%]`}
      />
      <button
        className="w-[40px] h-[40px] mx-[5px] float-right relative top-[50%] -translate-y-1/2
         px-[10px] py-[10px] rounded-[5px] w-10 bg-gray-200 dark:bg-gray-700"
        onClick={toggleTheme}
      >
        <img src={darkModeImg} className="invert-[70%]" alt="dark mode btn" />
      </button>
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
    </div>
  );
}

export default RightNav;
