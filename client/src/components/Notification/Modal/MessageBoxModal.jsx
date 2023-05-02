import { useEffect, useState } from "react";
import { useQueryDelete, useQueryGet } from "../../../utils/useQuery";
import { useQueryClient } from "react-query";

const MessageBoxModal = () => {
  const { data } = useQueryGet("/message", "getMessage");
  const { deleteMutate } = useQueryDelete("/message");
  const [message, setMessage] = useState(null);
  const queryClient = useQueryClient();
  const [alert, setAlert] = useState(false);

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
        <div
          className={`${
            !alert && "hidden"
          } flex p-4 mb-5 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 m-2`}
          role="alert"
        >
          <div className="ml-3 text-sm font-medium">쪽지가 삭제되었습니다</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
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
    </>
  );
};

export default MessageBoxModal;
