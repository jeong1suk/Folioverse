//담당 : 이승현

import { useEffect } from "react";
import Layout from "./Layout/Layout";
import useThemeStore from "../store/themeStore";
import Toast from "./Notification/Toast";
import Modal from "./Notification/Modal/Modal";

const App = () => {
  const theme = useThemeStore((state) => !state.theme);

  useEffect(() => {
    document.body.classList[theme ? "remove" : "add"]("dark");
  }, [theme]);

  return (
    <>
      <Layout />
      <Toast />
      <Modal />
    </>
  );
};

export default App;
