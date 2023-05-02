// 정주현

import Header from "./Header";
import Router from "../../Router";

function Layout() {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-[#000] h-[70px]"></div>
      <Router />
    </>
  );
}

export default Layout;
