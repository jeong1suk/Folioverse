//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useQueryDelete, useQueryGet } from "../../../utils/useQuery";
import Pagination from "./Pagination";
import useThemeStore from "../../../store/themeStore";
import useModalStore from "../../../store/modalStore";

const MessageBoxModal = () => {
  const { data } = useQueryGet("/message", "getMessage");
  const { deleteMutate, isLoading } = useQueryDelete("/message");
  const [message, setMessage] = useState(null);
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(false);

  const setModal = useModalStore((state) => state.setModal);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const theme = useThemeStore((state) => state.theme);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };
  const [expandedMessageId, setExpandedMessageId] = useState(null);

  useEffect(() => {
    setMessage(data?.result);
  }, [data]);

  const handleToggle = (id) => {
    if (expandedMessageId === id) {
      setExpandedMessageId(null);
    } else {
      setExpandedMessageId(id);
    }
  };

  const onDelete = (_id) => {
    deleteMutate(_id, {
      onSuccess: () => {
        queryClient.invalidateQueries("getMessage");
        setAlert(true);
      },
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const onReply = (id, name) => {
    setModal(id, "message", name);
  };

  return (
    <>
      <h1 className="pt-5 pl-5 dark:text-neutral-200 text-xl">쪽지함</h1>
      <div className="flex flex-row justify-between mt-7 dark:text-neutral-400 pb-3">
        <span className="ml-6">제목</span>
        <span className="mr-8">보낸사람</span>
      </div>
      <div className="pt-3 pb-1">
        {message?.length > 0 ? (
          message?.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
            <div key={item._id}>
              <h2>
                <button
                  type="button"
                  className="flex flex-row items-center w-full p-5 font-medium text-neutral-500 border border-b-0 border-neutral-200 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-800 dark:border-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  data-accordion-target="#accordion-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-2"
                  onClick={() => handleToggle(item._id)}
                >
                  <span className="w-3/5 text-left pr-10">{item.title}</span>
                  <div className="inline-flex flex-row items-center w-2/5 justify-end">
                    <img
                      src={
                        item.sendUserProfileImage ??
                        (theme
                          ? "/profile/profile-dark.png"
                          : "/profile/profile-light.png")
                      }
                      className="w-10 rounded-full mr-1"
                      alt="프로필이미지"
                    />
                    <span className="break-words whitespace-normal">
                      {item.sendUserName}
                    </span>
                    <svg
                      data-accordion-icon
                      className="w-6 h-6 shrink-0 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </button>
              </h2>
              <div
                className={`${expandedMessageId !== item._id && "hidden"}`}
                aria-labelledby="accordion-collapse-heading-2"
              >
                <div className="p-3 border border-b-0 border-neutral-200 dark:border-neutral-700 dark:text-neutral-300">
                  <p className="px-5 mb-3">
                    받은 날짜 : {formatDate(item.date)}
                  </p>
                  <p className="whitespace-pre-wrap px-5 break-words">
                    {item.description}
                  </p>
                </div>
                <div>
                  <button
                    className="ml-7 mb-3 border px-2 py-1 rounded text-neutral-200 border-neutral-500 hover:bg-neutral-500"
                    onClick={() => onReply(item.sendUser, item.sendUserName)}
                  >
                    답장
                  </button>
                  <button
                    className="ml-2 mb-3 border px-2 py-1 rounded text-red-500 border-red-500 hover:bg-red-100"
                    onClick={() => onDelete(item._id)}
                    disabled={isLoading}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mb-3 dark:text-neutral-400">
            받은 쪽지가 없습니다
          </div>
        )}
        <div
          className={`${
            !alert && "hidden"
          } flex p-4 mb-5 text-green-800 rounded-lg bg-green-50 dark:bg-neutral-800 dark:text-green-400 m-2`}
          role="alert"
        >
          <div className="ml-3 text-sm font-medium">쪽지가 삭제되었습니다</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-neutral-800 dark:text-green-400 dark:hover:bg-neutral-700"
            data-dismiss-target="#alert-3"
            aria-label="Close"
            onClick={() => setAlert(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <Pagination
        content={message}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default MessageBoxModal;
