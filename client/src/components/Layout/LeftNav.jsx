// 담당: 정주현

import { Link } from "react-router-dom";
import logoDark from "/logo/logo-dark.png";
import logoLight from "/logo/logo-light.png";
import useThemeStore from "../../store/themeStore";

const LeftNav = ({ isLogin }) => {
  const fontColorB = "text-[#4f4f4f] dark:text-[#a4a4a4]";
  const isDarkMode = useThemeStore((state) => state.theme);
  const logo = isDarkMode ? logoDark : logoLight;

  return (
    <div className="absolute left-[20px] top-0 w-[fit-content] h-full">
      <Link to="/">
        <img
          src={logo}
          className="h-[50px] w-auto mx-[5px] mr-[30px] float-left relative top-[50%] -translate-y-1/2 inline-block dark:grayscale-0"
          alt="logo"
        ></img>
      </Link>
      {isLogin && (
        <Link
          to="/my-page"
          className={` float-left mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal ${fontColorB}`}
        >
          마이페이지
        </Link>
      )}
      <Link
        to="/network"
        className={`float-left mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal ${fontColorB}`}
      >
        네트워크
      </Link>
    </div>
  );
};

export default LeftNav;
