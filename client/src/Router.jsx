//담당 : 이승현

import { Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";

const Router = () => {
  return (
    <Routes>
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/dark-mode" element={<DarkModeTest />} />
    </Routes>
  );
};

export default Router;
