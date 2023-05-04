import useThemeStore from "../../store/themeStore";
import darkModeImg from "/dark-mode.png";

import SearchInput from "./SearchInput";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";
import { useState, useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";
import { useLocation } from "react-router-dom";

const RightNav = ({ isLogin }) => {
  const location = useLocation();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/login";

  const ref = useRef();
  useOnClickOutside(ref, () => setSearchBtnView(false));
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [searchBtnView, setSearchBtnView] = useState(false);
  const textStyle = isHome ? "text-[#ccc]" : "text-[#919191] dark:text-[#ccc]";
  const btnStyle = isHome ? "bg-gray-700" : "bg-gray-200 dark:bg-gray-700";

  const darkmodeHandler = () => {
    if (!isHome) {
      toggleTheme();
    }
  };

  const handleSearchClick = () => {
    if (!searchBtnView) {
      setSearchBtnView(true);
    }
  };

  return (
    <div className="absolute right-[20px] top-0 w-[fit-content] h-full">
      {isLogin ? <UserNav /> : <GuestNav isHome={isHome} />}
      <button
        className={`w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] mx-[5px] float-right relative top-[50%] -translate-y-1/2
         px-[10px] py-[10px] rounded-[5px] w-10 ${btnStyle}`}
        onClick={darkmodeHandler}
      >
        <img src={darkModeImg} className="invert-[70%]" alt="dark mode btn" />
      </button>
      <div
        ref={ref}
        onClick={handleSearchClick}
        className="float-right relative top-[50%] -translate-y-1/2"
      >
        <button
          className={`w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] mx-[5px] float-right  p-4  rounded-[5px] ${btnStyle}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-auto  absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 ${textStyle}`}
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {searchBtnView && <SearchInput />}
      </div>
    </div>
  );
};

export default RightNav;
