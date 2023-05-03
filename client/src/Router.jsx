//담당 : 이승현

import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserSetting from "./components/UserSetting/UserSetting";
import Network from "./components/Network/Network";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import UserPage from "./components/UserPage/UserPage";
import ErrPage from "./components/ErrPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/network" element={<Network />} />
      <Route path="/user-setting/*" element={<UserSetting />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/my-page" element={<UserPage />} />
      <Route path="/error/:type" element={<ErrPage />} />
      <Route path="/user-page/:id" element={<UserPage />} />
    </Routes>
  );
};

export default Router;
