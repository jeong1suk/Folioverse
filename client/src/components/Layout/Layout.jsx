// 정주현

import "./Header.css";
import Header from "./Header";
import Network from "../Network/Network";

function Layout() {
  return (
    <>
      <Header />
      <div className='blank-top' style={{ height: "50px" }}></div>
      <Network />
    </>
  );
}

export default Layout;
