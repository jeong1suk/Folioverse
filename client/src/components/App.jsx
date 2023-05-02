//담당 : 이승현

import { useEffect } from "react";
import Layout from "./Layout/Layout";
import useThemeStore from "../store/themeStore";
import Toast from "./Notification/Toast";
import Modal from "./Notification/Modal/Modal";
import { useQueryGetRefetch } from "../utils/useQuery";
import { useQueryClient } from "react-query";
import useToastStore from "../store/toastStore";

const App = () => {
  const theme = useThemeStore((state) => !state.theme);
  const queryClient = useQueryClient();
  const setToast = useToastStore((state) => state.setToast);

  const { data: refetchMessageData, dataChanged } = useQueryGetRefetch(
    "/message",
    "getRefetchMessage"
  );

  useEffect(() => {
    if (dataChanged) {
      queryClient.invalidateQueries("getMessage");
      setToast(
        `${
          refetchMessageData.result[refetchMessageData.result.length - 1]
            .sendUserName
        } 님에게 쪽지가 왔습니다`,
        "message",
        refetchMessageData.result[refetchMessageData.result.length - 1]
          .sendUserProfileImage
      );
    }
  }, [dataChanged]);

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
