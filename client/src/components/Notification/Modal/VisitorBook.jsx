import { useEffect, useState } from "react";
import {
  useQueryDelete,
  useQueryGet,
  useQueryPatch,
} from "../../../utils/useQuery";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";
import Pagination from "./Pagination";

const VisitorBook = ({ id, myId }) => {
  const { mutate } = useQueryPatch("/visitor_book", "post");
  const isToken = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const myInfoQuery = useQueryGet("/user/current", "getMyInfo", {
    enabled: !!isToken,
  });
  const { data: myInfo } = myInfoQuery;
  const queryClient = useQueryClient();
  const { data: othersData } = useQueryGet(
    `/visitor_book/${id}`,
    "getOthersVisitor",
    {
      enabled: !!id,
    }
  );
  const { data: myData } = useQueryGet(`/visitor_book`, "getMyVisitor", {
    enabled: !!myInfo?._id,
  });
  const { deleteMutate } = useQueryDelete("/visitor_book");

  const [bookData, setBookData] = useState(null);
  const [description, setDescription] = useState("");
  const location = useLocation();
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (location.pathname === "/my-page") {
      setBookData(myData?.result);
    } else {
      setBookData(othersData?.result);
    }
  }, [myData, othersData]);

  const onSubmit = async () => {
    mutate(
      {
        body: {
          target_user: id,
          description,
        },
      },
      {
        onSuccess: () => {
          if (location.pathname === "/my-page") {
            queryClient.invalidateQueries("getMyVisitor");
          } else {
            queryClient.invalidateQueries("getOthersVisitor");
          }
          setAlert(true);
          setMsg("방명록을 작성하였습니다");
        },
      }
    );
  };

  const onDelete = (_id) => {
    deleteMutate(_id, {
      onSuccess: () => {
        if (location.pathname === "/my-page") {
          queryClient.invalidateQueries("getMyVisitor");
        } else {
          queryClient.invalidateQueries("getOthersVisitor");
        }
        setAlert(true);
        setMsg("방명록을 삭제하였습니다");
      },
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-5 dark:text-neutral-200">
      <h1 className="text-2xl">방명록</h1>
      <div className="flex flex-row justify-between mt-7 dark:text-neutral-400 pb-3 border-b dark:border-neutral-600">
        <span className="ml-6">내용</span>
        <span className="mr-8">작성자</span>
      </div>
      <div
        className={`flex items-stretchr justify-evenly my-3 ${
          location.pathname === "/my-page" && "hidden"
        }`}
      >
        <div>
          <textarea
            className="p-1 border rounded dark:bg-neutral-200 focus:outline-neutral-500 dark:text-neutral-300 dark:bg-neutral-800"
            cols="30"
            rows="1"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="px-2 py-1 border rounded hover:bg-neutral-200 dark:hover:bg-neutral-800"
          onClick={onSubmit}
        >
          작성
        </button>
      </div>
      <div>
        {Array.isArray(bookData) ? (
          bookData?.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
            <div
              key={item._id}
              className="flex flex-row justify-between text-sm mt-5 items-center dark:border-neutral-600"
            >
              <div className="flex flex-row justify-between w-full">
                <span>{item.description}</span>
                <span
                  className={`${
                    myInfo?._id === item.write_user ||
                    location.pathname === "/my-page"
                      ? ""
                      : "hidden"
                  } cursor-pointer`}
                  onClick={() => onDelete(item._id)}
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
                </span>
              </div>
              <div className="flex flex-row items-center">
                <img
                  src={
                    item.write_userProfileImage ?? "/profile/profile-dark.png"
                  }
                  alt="프로필 이미지"
                  className="w-10 rounded-full mr-1"
                />
                <span>{item.write_userName}</span>
              </div>
            </div>
          ))
        ) : (
          <div>작성된 방명록이 없습니다</div>
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
        content={bookData}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default VisitorBook;
