//담당 : 이승현

import { useEffect } from "react";
import Layout from "./Layout/Layout";
import useThemeStore from "../store/themeStore";
import Toast from "./Notification/Toast";
import DeleteModal from "./Notification/DeleteModal";

const App = () => {
  const theme = useThemeStore((state) => !state.theme);

  useEffect(() => {
    document.body.classList[theme ? "remove" : "add"]("dark");
  }, [theme]);

  return (
    <>
      <Layout />
      <Toast />
      <DeleteModal />
    </>
  );
};

export default App;
