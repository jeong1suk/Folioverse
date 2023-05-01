//담당 : 이승현

import { useNavigate } from "react-router-dom";
import Mvp from "./Mvp";
import Profile from "./Profile";
import { useEffect } from "react";
import { useQueryGet } from "../../utils/useQuery";
import MvpSelector from "./MvpSelector";
import PdfReader from "./SpeedDial/PdfReader";
import SpeedDial from "./SpeedDial/SpeedDial";
import PostList from "./PostList";

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

const UserPage = () => {
  const navigate = useNavigate();

  const { data } = useQueryGet("/user/current", "getMyInfo");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/error/auth");
    }
  }, []);

  return (
    <div className="p-5 flex flex-row dark:bg-neutral-800 min-h-screen">
      <div className="basis-1/5">
        <Profile myData={data} />
        <MvpSelector />
        <PostList id={data?._id} />
      </div>
      <main className="basis-4/5 ml-5">
        {mvpList.map((item) => (
          <Mvp key={item.id} title={item.title} />
        ))}
      </main>
      {<SpeedDial id={data?._id} />}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <PdfReader myData={data} />
      </div>
    </div>
  );
};

export default UserPage;
