// 정주현

import Header from "./Header";
import Router from "../../Router";

function Layout() {
  return (
    <>
      <Header />
      <div className="blank-top" style={{ height: "50px" }}></div>
      <Router />
    </>
  );
}

export default Layout;
