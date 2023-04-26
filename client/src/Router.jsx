import { Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";

const Router = () => {
  return (
    <Routes>
      <Route path="/user_setting" element={<UserSetting />} />
      <Route path="/darkmode" element={<DarkModeTest />} />
    </Routes>
  );
};

export default Router;
