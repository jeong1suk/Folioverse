//담당 : 이승현

import { Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";
import Network from "./components/Network/Network";
import SignUp from "./components/Sign/SignUp";
import UserPage from "./components/UserPage/UserPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/network" element={<Network />} />
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/dark-mode" element={<DarkModeTest />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/my-page" element={<UserPage />} />
    </Routes>
  );
};

const HomePage = () => {
  return <div className="text-white">홈페이지</div>;
};

export default Router;
