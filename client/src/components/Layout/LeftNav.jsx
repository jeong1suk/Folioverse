// 담당: 정주현

import { Link, useLocation } from "react-router-dom";
import logoDark from "/logo/logo-dark.png";
import logoLight from "/logo/logo-light.png";
import useThemeStore from "../../store/themeStore";

const LeftNav = ({ isLogin }) => {
  const isDarkMode = useThemeStore((state) => state.theme);
  const location = useLocation();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/login";
  const logo = !isDarkMode || isHome ? logoDark : logoLight;
  const fontColorB = isHome
    ? "text-[#a4a4a4]"
    : "text-[#4f4f4f] dark:text-[#a4a4a4]";
  const linkStyle =
    " float-left sm:text-[16px] text-[13px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal";
  return (
    <div className="absolute left-[20px] top-0 w-[fit-content] h-full">
      <Link to="/">
        <img
          src={logo}
          className="h-[40px] sm:h-[50px]  w-auto mx-[5px] mr-[30px] float-left relative top-[50%] -translate-y-1/2 inline-block dark:grayscale-0"
          alt="logo"
        ></img>
      </Link>
      <span className="hidden sm:inline">
        {isLogin && (
          <Link
            to="/my-page"
            className={`mr-[10px] ${linkStyle} ${fontColorB}`}
          >
            마이페이지
          </Link>
        )}
      </span>
      <Link to="/network" className={`mx-[5px] ${linkStyle} ${fontColorB}`}>
        네트워크
      </Link>
    </div>
  );
};

export default LeftNav;
