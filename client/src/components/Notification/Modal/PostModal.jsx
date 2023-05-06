//담당 : 이승현

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import Pagination from "./Pagination";
import {
  useQueryDelete,
  useQueryGet,
  useQueryPatch,
} from "./../../../utils/useQuery";
import moment from "moment";

const PostModal = ({ id }) => {
  const [expandedPostId, setExpandedPostId] = useState(null);
  const { data } = useQueryGet(`/post/${id}`, "getPost");
  const [posts, setPosts] = useState(null);
  const { deleteMutate, isLoading: loadingDelete } = useQueryDelete("/post");
  const { mutate: editMutate, isLoading: loadingPatch } = useQueryPatch(
    "/post",
    "patch"
  );
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const location = useLocation();
  const { pathname } = location;
  const isMyPost = pathname === "/my-page";

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    setPosts(data?.result);
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return moment(date).format("YYYY-MM-DD");
  };

  const handleToggle = (id) => {
    if (expandedPostId === id) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(id);
    }
  };

  const onDelete = (_id) => {
    deleteMutate(_id, {
      onSuccess: () => {
        queryClient.invalidateQueries("getPost");
        setEdit(false);
        setMsg("게시글이 삭제되었습니다");
        setAlert(true);
      },
    });
  };

  const onPatch = (_id) => {
    editMutate(
      {
        body: {
          _id,
          title,
          description,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getPost");
          setEdit(false);
          setMsg("게시글이 수정되었습니다");
          setAlert(true);
          titleRef.current.value = "";
          descriptionRef.current.value = "";
        },
      }
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h1 className="pt-5 pl-5 dark:text-neutral-200 text-xl">글 목록</h1>
      <div className="flex flex-row justify-between mt-7 dark:text-neutral-400 pb-3">
        <span className="ml-6">제목</span>
        <span className="mr-8">작성일</span>
      </div>
      <div data-accordion="collapse" className="pt-3 pb-1">
        {Array.isArray(posts) ? (
          posts?.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
            <div key={item._id}>
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full p-5 font-medium text-left text-neutral-500 border border-b-0 border-neutral-200 focus:ring-4 focus:ring-neutral-200 dark:focus:ring-neutral-800 dark:border-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  data-accordion-target="#accordion-collapse-body-2"
                  aria-expanded="false"
                  aria-controls="accordion-collapse-body-2"
                  onClick={() => handleToggle(item._id)}
                >
                  <span>{item.title}</span>
                  <div className="flex flew-row">
                    <span>{formatDate(item.date)}</span>
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
                className={`${expandedPostId !== item._id && "hidden"}`}
                aria-labelledby="accordion-collapse-heading-2"
              >
                <div className="p-3 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-neutral-300">
                  <p className="whitespace-pre-wrap px-5">{item.description}</p>
                </div>

                <div className={`${!edit && "hidden"} p-3`}>
                  <div>
                    <h2 className="text-lg my-3 dark:text-neutral-300">제목</h2>
                    <input
                      type="text"
                      className="w-full rounded border p-1 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-800 dark:border-cyan-950 dark:text-neutral-300"
                      defaultValue={item.title}
                      onChange={(e) => setTitle(e.target.value)}
                      ref={titleRef}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg my-3 dark:text-neutral-300">내용</h2>
                    <textarea
                      className="w-full rounded border p-1 focus:outline-neutral-300 focus:outline-neutral-500 dark:bg-neutral-800 dark:border-cyan-950 dark:text-neutral-300"
                      defaultValue={item.description}
                      cols="30"
                      rows="10"
                      onChange={(e) => setDescription(e.target.value)}
                      ref={descriptionRef}
                    ></textarea>
                  </div>
                  <div className="text-center mt-2">
                    <button
                      className="border px-2 py-1 rounded mx-1 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
                      onClick={() => onPatch(item._id)}
                      disabled={loadingPatch}
                    >
                      저장
                    </button>
                    <button
                      className="border px-2 py-1 rounded mx-1 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-600"
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit(false);
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    (edit || !isMyPost) && "hidden"
                  } text-center pb-3`}
                >
                  <button
                    className="border px-2 py-1 rounded mx-2 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:bg-neutral-600"
                    onClick={() => setEdit(true)}
                    disabled={loadingPatch}
                  >
                    수정
                  </button>
                  <button
                    className="border px-2 py-1 rounded mx-2 text-red-500 border-red-500 hover:bg-red-100"
                    onClick={() => onDelete(item._id)}
                    disabled={loadingDelete}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 dark:text-neutral-400 text-center">
            아직 작성하신 글이 없습니다
          </div>
        )}
        <div
          className={`${
            !alert && "hidden"
          } flex p-4 mb-5 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 m-2`}
          role="alert"
        >
          <div className="ml-3 text-sm font-medium">{msg}</div>
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
      <Pagination
        content={posts}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default PostModal;
