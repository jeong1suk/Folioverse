//담당 : 이승현

import { Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";
import Layout from "./components/Layout/Layout";
import SignUp from "./components/Sign/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/dark-mode" element={<DarkModeTest />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
export default Router;
