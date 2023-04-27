//담당 : 이승현

import { Link, Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/dark-mode" element={<DarkModeTest />} />
    </Routes>
  );
};

const Home = () => {
  return (
    <div>
      <h1>홈화면</h1>
      <Link to="/user-setting">설정 페이지</Link>
      <br />
      <Link to="/dark-mode">다크모드 테스트 페이지</Link>
    </div>
  );
};

export default Router;
