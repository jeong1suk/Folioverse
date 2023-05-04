// 정주현

import { useEffect, useState } from "react";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import { useLocation } from "react-router-dom";

/** 테스트용 프로필 이미지 */

const Header = () => {
  const location = useLocation();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/login";
  console.log(location.pathname);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  /** 로그인/로그아웃 상태 테스트용 변수 */
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header
      className={`w-full h-[70px] backdrop-blur fixed top-0 z-10 bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(26,26,26,0.7)] ${
        isHome && "bg-[rgba(0,0,0,0.7)] dark:bg-[rgba(0,0,0,0.7)]"
      }`}
    >
      <LeftNav isLogin={isLogin} />
      <RightNav isLogin={isLogin} />
    </header>
  );
};

export default Header;
