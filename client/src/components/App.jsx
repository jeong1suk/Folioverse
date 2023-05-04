//담당 : 이승현

import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useQueryGetRefetch } from "../utils/useQuery";
import Layout from "./Layout/Layout";
import useThemeStore from "../store/themeStore";
import Toast from "./Notification/Toast";
import Modal from "./Notification/Modal/Modal";
import useToastStore from "../store/toastStore";

const App = () => {
  const theme = useThemeStore((state) => !state.theme);
  const queryClient = useQueryClient();
  const setToast = useToastStore((state) => state.setToast);

  const { data: refetchMessageData, dataChanged: messageChanged } =
    useQueryGetRefetch("/message", "getRefetchMessage");

  const { data: refetchVisitorBookData, dataChanged: bookChanged } =
    useQueryGetRefetch(`/visitor_book`, "getRefetchVisitorBook");

  useEffect(() => {
    if (messageChanged) {
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
  }, [messageChanged]);

  useEffect(() => {
    if (bookChanged) {
      queryClient.invalidateQueries("getMyVisitor");
      setToast(
        `${
          refetchVisitorBookData.result[
            refetchVisitorBookData.result.length - 1
          ].write_userName
        } 님이 방명록을 작성하였습니다`,
        "message",
        refetchVisitorBookData.result[refetchVisitorBookData.result.length - 1]
          .write_userProfileImage
      );
    }
  }, [bookChanged]);

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
