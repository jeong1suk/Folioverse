//담당 : 이승현

import { useState } from "react";
import { useQueryPatch } from "../../../utils/useQuery";

const MailerModal = ({ toggleOpen }) => {
  const { mutate, isLoading } = useQueryPatch("/auth/find", "post");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    mutate(
      { body: { email } },
      {
        onSuccess: (data) => {
          setAlert(true);
          setMessage(data.message ?? "이메일로 임시 비밀번호가 전송되었습니다");
        },
      }
    );
  };

  return (
    <div className="p-6 text-center">
      <EmailIcon />
      <h3 className="mb-5 text-lg font-normal text-neutral-500 dark:text-neutral-400">
        찾으실 계정의 이메일 주소를 입력하세요
      </h3>
      <input
        className={`block w-full p-1 rounded mx-auto mb-3 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300`}
        type="text"
        maxLength={250}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div
        className={`${
          !alert && "hidden"
        } flex p-4 mb-5 text-green-800 rounded-lg bg-green-50 dark:bg-neutral-800 dark:text-green-400 m-2`}
        role="alert"
      >
        <div className="ml-3 text-sm font-medium">{message}</div>
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
      <button
        data-modal-hide="popup-modal"
        type="button"
        className={`text-white bg-neutral-600 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 dark:focus:ring-neutral-800 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center mr-2`}
        onClick={onSubmit}
        disabled={isLoading}
      >
        확인
      </button>
      <button
        data-modal-hide="popup-modal"
        type="button"
        className="text-neutral-500 bg-white hover:bg-neutral-100 focus:ring-4 focus:outline-none focus:ring-neutral-200 rounded-lg border border-neutral-200 text-sm font-medium px-3 py-2 hover:text-neutral-900 focus:z-10 dark:bg-neutral-500 dark:text-neutral-300 dark:border-neutral-500 dark:hover:text-white dark:hover:bg-neutral-600 dark:focus:ring-neutral-600"
        onClick={toggleOpen}
      >
        취소
      </button>
    </div>
  );
};

const EmailIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="mx-auto mb-4 text-neutral-400 w-14 h-14 dark:text-neutral-200"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
};

export default MailerModal;
