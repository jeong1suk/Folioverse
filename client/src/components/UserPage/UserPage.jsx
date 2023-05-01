//담당 : 이승현

import { useLocation, useNavigate } from "react-router-dom";
import Mvp from "./Mvp";
import Profile from "./Profile";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/error/auth");
    }
  }, []);
  const location = useLocation();
  const { pathname } = location;

  const { data: myData } = useQueryGet("/user/current", "getMyInfo");

  return (
    <div className="p-5 flex flex-row dark:bg-neutral-800 min-h-screen">
      <div className="basis-1/5">
        <Profile myData={myData} />
        <MvpSelector />
        <PostList id={myData?._id} />
      </div>
      <main className="basis-4/5 ml-5">
        {mvpList.map((item) => (
          <Mvp key={item.id} title={item.title} />
        ))}
      </main>
      {pathname === "/my-page" && <SpeedDial id={myData?._id} />}
      <div style={{ position: "absolute", left: "-9999px" }}>
        <PdfReader myData={myData} />
      </div>
    </div>
  );
};

export default UserPage;
