// 정주현

import Header from "./Header";
import Router from "../../Router";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isHome =
    location.pathname === "/" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/login";
  return (
    <>
      <Header />
      <div
        className={`${
          isHome ? "bg-black h-[70px]" : "bg-white dark:bg-[#1a1a1a] h-[70px]"
        }`}
      ></div>
      <Router />
    </>
  );
};

export default Layout;
