//담당 : 이승현

import { useEffect } from "react";
import { useQueryGet } from "../../../utils/useQuery";
import PostList from "../PostList";
import useUserStore from "./../../../store/userStore.js";
import OthersMvp from "./OthersMvp";
import OthersProfile from "./OthersProfile";
import { useNavigate } from "react-router-dom";

const mvpList = [
  {
    id: 1,
    title: "학력",
  },
  {
    id: 2,
    title: "프로젝트",
  },
  {
    id: 3,
    title: "수상 이력",
  },
  {
    id: 4,
    title: "자격증",
  },
];

const OthersPage = () => {
  const id = useUserStore((state) => state.id);
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const { data } = useQueryGet(`/others/${id}`, "getOthersData");
  const { data: userData } = useQueryGet(`/user/${id}`, "getOthersInfo");
  const { data: myData } = isToken
    ? useQueryGet("/user/current", "getMyInfo")
    : { data: null };

  useEffect(() => {
    if (!id) {
      location.href = "/";
    }
    if (isToken) {
      myData?._id === id && navigate("/my-page");
    }
  }, []);

  return (
    <div className="p-5 flex flex-row dark:bg-neutral-800 min-h-screen">
      <div className="basis-1/5">
        <OthersProfile data={userData} />
        <PostList id={id} />
      </div>
      <main className="basis-4/5 ml-5">
        {mvpList.map((item) => (
          <OthersMvp key={item.id} title={item.title} data={data} />
        ))}
      </main>
    </div>
  );
};

export default OthersPage;
