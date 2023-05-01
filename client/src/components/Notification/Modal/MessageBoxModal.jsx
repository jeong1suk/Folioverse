import { useEffect, useState } from "react";
import { useQueryDelete, useQueryGet } from "../../../utils/useQuery";
import { useQueryClient } from "react-query";

const MessageBoxModal = ({ id }) => {
  const { data } = useQueryGet("/message", "getMessage");
  const { deleteMutate } = useQueryDelete("/message");
  const [message, setMessage] = useState(null);
  const queryClient = useQueryClient();

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
      },
    });
  };

  return (
    <>
      <h1 className="pt-5 pl-5 dark:text-neutral-200 text-xl">쪽지함</h1>
      <div className="pt-3 pb-1">
        {Array.isArray(message) ? (
          message?.map((item) => (
            <div key={item._id}>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-left text-neutral-500 border border-b-0 border-neutral-200 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-800 dark:border-neutral-700 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  data-accordion-target="#accordion-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-2"
                  onClick={() => handleToggle(item._id)}
                >
                  <span>{item.title}</span>
                  <div className="flex flew-row">
                    <span>보낸 사람 : {item.sendUserName}</span>
                    <svg
                      data-accordion-icon
                      className="w-6 h-6 shrink-0"
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
                <div className="p-3 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-neutral-300">
                  <p className="px-5 mb-3">
                    받은 날짜 : {formatDate(item.date)}
                  </p>
                  <p className="whitespace-pre-wrap px-5">{item.description}</p>
                </div>
                <button
                  className="ml-7 mb-3 border px-2 py-1 rounded text-red-500 border-red-500 hover:bg-red-100"
                  onClick={() => onDelete(item._id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>받은 쪽지가 없습니다</div>
        )}
      </div>
    </>
  );
};

const dummyMessage = [
  {
    _id: 0,
    title: "ㅎㅇ",
    description: "ㅋㅋㅋㅋ",
    date: "2023-05-01",
    user: "엘리스",
  },
  {
    _id: 1,
    title: "ㅋㅋㅋ",
    description: "ㅎㅇㅎㅇㅎㅇ",
    date: "2023-05-02",
    user: "리스",
  },
];

export default MessageBoxModal;
