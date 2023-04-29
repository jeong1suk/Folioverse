const MessageModal = ({ id, name, toggleOpen }) => {
  return (
    <div className="p-5">
      <h1 className="text-2xl dark:text-neutral-300">쪽지 보내기</h1>
      <div className="p-2">
        <p className="dark:text-neutral-300">받는 사람 : {name}</p>
        <p className="my-2 dark:text-neutral-300">제목</p>
        <p>
          <input
            type="text"
            className="p-1 border w-full rounded dark:bg-neutral-200 focus:outline-neutral-500"
          />
        </p>
        <p className="my-2 dark:text-neutral-300">내용</p>
        <textarea
          className="p-1 border w-full rounded dark:bg-neutral-200 focus:outline-neutral-500"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div className="text-center">
        <button className="border py-1 px-2 mx-2 rounded hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700">
          보내기
        </button>
        <button
          className="border py-1 px-2 mx-2 rounded hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          onClick={toggleOpen}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default MessageModal;
