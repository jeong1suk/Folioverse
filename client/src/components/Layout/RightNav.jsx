// 담당: 정주현

import useThemeStore from "../../store/themeStore";
import darkModeImg from "/dark-mode.png";

import SearchInput from "./SearchInput";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";

const RightNav = ({ isLogin }) => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div className="absolute right-[20px] top-0 w-[fit-content] h-full">
      {isLogin ? <UserNav /> : <GuestNav />}
      <button
        className="w-[40px] h-[40px] mx-[5px] float-right relative top-[50%] -translate-y-1/2
         px-[10px] py-[10px] rounded-[5px] w-10 bg-gray-200 dark:bg-gray-700"
        onClick={toggleTheme}
      >
        <img src={darkModeImg} className="invert-[70%]" alt="dark mode btn" />
      </button>
      <SearchInput></SearchInput>
    </div>
  );
};

export default RightNav;
