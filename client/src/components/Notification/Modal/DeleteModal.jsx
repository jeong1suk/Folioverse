import { useEffect, useState } from "react";
import { useQueryDelete } from "../../../utils/useQuery";

const DeleteModal = ({ id, toggleOpen }) => {
  const [isValid, setIsVaid] = useState(false);
  const [input, setInput] = useState("");
  const { deleteMutate } = useQueryDelete(`/auth/${id}`);

  const deleteUser = () => {
    deleteMutate(null, {
      onSuccess: (data) => {
        if (data.result) {
          localStorage.removeItem("token");
          location.href = "/";
        } else {
          console.log("회원 탈퇴에 실패하였습니다.");
        }
      },
    });
  };

  useEffect(() => {
    setIsVaid(input === "계정 삭제" ? true : false);
  }, [input]);

  return (
    <div className="p-6 text-center">
      <svg
        aria-hidden="true"
        className="mx-auto mb-4 text-neutral-400 w-14 h-14 dark:text-neutral-200"
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
      <h3 className="mb-5 text-lg font-normal text-neutral-500 dark:text-neutral-400">
        정말 계정을 삭제하시겠습니까?
      </h3>
      <label className="text-black dark:text-neutral-400">
        아래에 "계정 삭제" 를 입력하세요
      </label>
      <input
        className={`block w-full p-1 rounded m-3 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300`}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        maxLength={5}
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
        className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-neutral-200 rounded-lg border border-neutral-200 text-sm font-medium px-5 py-2.5 hover:text-neutral-900 focus:z-10 dark:bg-neutral-500 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600"
        onClick={toggleOpen}
      >
        취소
      </button>
    </div>
  );
};

export default DeleteModal;
