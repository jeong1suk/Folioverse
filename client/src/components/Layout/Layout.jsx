// 정주현

import Header from "./Header";
import Router from "../../Router";

function Layout() {
  return (
    <>
      <Header />
      <div
        className="blank-top"
        style={{ height: "70px", backgroundColor: "#1a1a1a" }}
      ></div>
      <Router />
    </>
  );
}

export default Layout;
