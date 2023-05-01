import { useState } from "react";

const PostModal = () => {
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handleToggle = (id) => {
    if (expandedPostId === id) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(id);
    }
  };

  return (
    <>
      <h1 className="pt-5 pl-5 dark:text-neutral-200 text-xl">글 목록</h1>
      <div data-accordion="collapse" className="pt-3">
        {dummyPost.map((item) => (
          <div key={item.id}>
            <h2>
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-neutral-500 border border-b-0 border-neutral-200 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-800 dark:border-neutral-700 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
                onClick={() => handleToggle(item.id)}
              >
                <span>{item.title}</span>
                <div className="flex flew-row">
                  <span>{item.date}</span>
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
              className={`${expandedPostId !== item.id && "hidden"}`}
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-neutral-300">
                <p>{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const dummyPost = [
  {
    id: 0,
    title: "이상한 글",
    date: "2023-05-01",
    body: `
      이상한 내용들이 가득한 글 입니다.
      이상한 내용들이 가득한 글 입니다.
      이상한 내용들이 가득한 글 입니다.
      이상한 내용들이 가득한 글 입니다.
    `,
  },
  {
    id: 1,
    title: "쓸데없는 글",
    date: "2023-04-30",
    body: `
      쓸데없는 내용만 가득한 글 입니다.
      쓸데없는 내용만 가득한 글 입니다.
      쓸데없는 내용만 가득한 글 입니다.
      쓸데없는 내용만 가득한 글 입니다.쓸데없는 내용만 가득한 글 입니다.쓸데없는 내용만 가득한 글 입니다.
      쓸데없는 내용만 가득한 글 입니다.
      쓸데없는 내용만 가득한 글 입니다.
    `,
  },
];

export default PostModal;
