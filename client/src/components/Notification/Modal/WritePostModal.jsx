import { useState } from "react";
import { useQueryPatch } from "../../../utils/useQuery";
import { useQueryClient } from "react-query";
import useToastStore from "../../../store/toastStore";

const WritePostModal = ({ toggleOpen }) => {
  const { mutate } = useQueryPatch("/post", "put");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const setToast = useToastStore((state) => state.setToast);

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      { body: { title, description } },
      {
        onSuccess: () => {
          setToast("게시글이 추가되었습니다", "success");
          queryClient.invalidateQueries("getPost");
          toggleOpen();
        },
      }
    );
  };

  return (
    <form className="p-5">
      <h1 className="text-2xl dark:text-neutral-300">게시글 작성</h1>
      <div>
        <h2 className="text-lg my-3 dark:text-neutral-300">제목</h2>
        <input
          type="text"
          className="w-full rounded border p-1 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-800 dark:border-cyan-950 dark:text-neutral-300"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-lg my-3 dark:text-neutral-300">내용</h2>
        <textarea
          className="w-full rounded border p-1 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-800 dark:border-cyan-950 dark:text-neutral-300"
          cols="30"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="text-center mt-2">
        <button
          className="border px-2 py-1 rounded mx-1 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
          onClick={onSubmit}
        >
          저장
        </button>
        <button
          className="border px-2 py-1 rounded mx-1 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
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

export default WritePostModal;
