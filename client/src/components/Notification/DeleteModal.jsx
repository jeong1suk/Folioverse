import { useEffect, useState } from "react";
import useModalStore from "../../store/modalStore";
import { useQueryDelete } from "../../utils/useQuery";

const DeleteModal = () => {
  const [isValid, setIsVaid] = useState(false);
  const [input, setInput] = useState("");
  const isOpen = useModalStore((state) => state.isOpen);
  const id = useModalStore((state) => state.id);
  const toggleOpen = useModalStore((state) => state.toggleOpen);

  const { deleteMutate } = useQueryDelete(`/auth/${id}`);

  const deleteUser = () => {
    deleteMutate();
    localStorage.removeItem("token");
    location.href = "/";
  };

  useEffect(() => {
    setIsVaid(input === "계정 삭제" ? true : false);
  }, [input]);

  return (
    <div
      tabIndex="-1"
      className={`fixed inset-0 z-50 p-4 overflow-x-hidden overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md ${
        !isOpen && "hidden"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent top:bg-gray-200 top:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
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
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              정말 계정을 삭제하시겠습니까?
            </h3>
            <label className="text-black dark:text-neutral-400">
              아래에 "계정 삭제" 를 입력하세요
            </label>
            <input
              className="block w-80 my-3 mx-auto rounded p-1 focus:outline-gray-300"
              type="text"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              data-modal-hide="popup-modal"
              type="button"
              className={`text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 ${
                !isValid && "bg-red-900 hover:bg-red-900"
              }`}
              disabled={!isValid}
              onClick={deleteUser}
            >
              네 삭제하겠습니다
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              onClick={toggleOpen}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
