//담당 : 이승현

import { useRef, useState } from "react";
import { useQueryPatch } from "../../../utils/useQuery";
import useToastStore from "../../../store/toastStore";

const MessageModal = ({ id, name, toggleOpen }) => {
  const { mutate, isLoading } = useQueryPatch("/message", "post");
  const setToast = useToastStore((state) => state.setToast);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formRef = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    mutate(
      {
        body: {
          target_id: id,
          title,
          description,
        },
      },
      { onSuccess: (data) => console.log(data) }
    );
    formRef.current.reset();
    toggleOpen();
    setToast("쪽지를 전송하였습니다", "success");
  };

  return (
    <form className="p-5" ref={formRef}>
      <h1 className="text-2xl dark:text-neutral-300">쪽지 보내기</h1>
      <div className="p-2">
        <p className="dark:text-neutral-300">받는 사람 : {name}</p>
        <p className="my-2 dark:text-neutral-300">제목</p>
        <p>
          <input
            type="text"
            className="p-1 border w-full rounded dark:bg-neutral-200 focus:outline-neutral-500"
            maxLength={20}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p className="my-2 dark:text-neutral-300">내용</p>
        <textarea
          className="p-1 border w-full rounded dark:bg-neutral-200 focus:outline-neutral-500"
          cols="30"
          rows="10"
          maxLength={1000}
          placeholder="1000자 이내로 입력하세요"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          className="border py-1 px-2 mx-2 rounded hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          onClick={(e) => sendMessage(e)}
          disabled={isLoading}
        >
          보내기
        </button>
        <button
          className="border py-1 px-2 mx-2 rounded hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          onClick={(e) => {
            e.preventDefault();
            toggleOpen();
          }}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default MessageModal;
