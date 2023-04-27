//담당 : 이승현

import { Link, Route, Routes } from "react-router-dom";
import UserSetting from "./components/UserSetting/UserSetting";
import DarkModeTest from "./components/DarkModeTest";
import Layout from "./components/Layout/Layout";

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/user-setting/*' element={<UserSetting />} />
      <Route path='/dark-mode' element={<DarkModeTest />} />
    </Routes>
  );
};
export default Router;
