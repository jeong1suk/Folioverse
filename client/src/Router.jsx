//담당 : 이승현

import { Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";
import Network from "./components/Network/Network";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/network" element={<Network />} />
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/dark-mode" element={<DarkModeTest />} />
    </Routes>
  );
};

const HomePage = () => {
  return <div className="text-white">홈페이지</div>;
};

export default Router;
