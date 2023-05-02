// 정주현

import Header from "./Header";
import Router from "../../Router";

function Layout() {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-[#1a1a1a] h-[70px]"></div>
      <Router />
    </>
  );
}

export default Layout;
