import { useEffect, useState } from "react";
import { useQueryGet, useQueryPatch } from "../../../utils/useQuery";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";

const VisitorBook = ({ id, myId }) => {
  const { mutate } = useQueryPatch("/visitor_book", "post");
  const queryClient = useQueryClient();
  const { data: othersData } = useQueryGet(
    `/visitor_book/${id}`,
    "getOthersVisitor",
    {
      enabled: !!id,
    }
  );
  const { data: myData } = useQueryGet(
    `/visitor_book/${myId}`,
    "getMyVisitor",
    {
      enabled: !!myId,
    }
  );
  const [bookData, setBookData] = useState(null);
  const [description, setDescription] = useState("");
  const location = useLocation();

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
        onSuccess: (data) => {
          if (location.pathname === "/my-page") {
            queryClient.invalidateQueries("getMyVisitor");
          } else {
            queryClient.invalidateQueries("getOthersVisitor");
          }
        },
      }
    );
  };

  return (
    <div className="p-5 dark:text-neutral-200 text-xl">
      <h1 className="text-2xl">방명록</h1>
      <div className="flex items-stretchr justify-evenly my-3">
        <textarea
          className="p-1 rounded"
          cols="30"
          rows="1"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className="px-2 py-1 border rounded" onClick={onSubmit}>
          작성
        </button>
      </div>
      <div>
        {Array.isArray(bookData) ? (
          bookData?.map((item) => (
            <div
              key={item._id}
              className="flex flex-row justify-between text-sm mt-5 items-center"
            >
              <div>{item.description}</div>
              <div className="flex flex-row items-center">
                <img
                  src={item.write_userProfileImage ?? "/profile/profile-dark"}
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
      </div>
    </div>
  );
};

export default VisitorBook;
