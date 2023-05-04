//담당 : 이승현

import { useNavigate, useParams } from "react-router-dom";
import Mvp from "./Mvp";
import Profile from "./Profile";
import { useEffect } from "react";
import { useQueryGet } from "../../utils/useQuery";
import MvpSelector from "./MvpSelector";
import PdfReader from "./SpeedDial/PdfReader";
import SpeedDial from "./SpeedDial/SpeedDial";
import PostList from "./PostList";
import useModalStore from "../../store/modalStore";
import useStyleClassStore from "../../store/styleClassStore";

const UserPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const isToken = localStorage.getItem("token");

  const myInfoQuery = useQueryGet("/user/current", "getMyInfo", {
    enabled: !!isToken,
  });
  const othersDataQuery = useQueryGet(`/others/${id}`, "getOthersData", {
    enabled: !!id,
  });
  const othersInfoQuery = useQueryGet(`/user/${id}`, "getOthersInfo", {
    enabled: !!id,
  });

  const followInfoQuery = useQueryGet(`/follow/${id}`, "getFollowInfo", {
    enabled: !!id,
  });

  const likeInfoQuery = useQueryGet(`/like/${id}`, "getLikeInfo", {
    enabled: !!id,
  });

  const { data: myInfo } = myInfoQuery;
  const { data: othersData } = othersDataQuery;
  const { data: othersInfo } = othersInfoQuery;
  const { data: followInfo } = followInfoQuery;
  const { data: likeInfo } = likeInfoQuery;

  useEffect(() => {
    if (!localStorage.getItem("token") && !id) {
      navigate("/error/auth");
    }
  }, []);

  useEffect(() => {
    if (isToken && id) {
      myInfo?._id === id && navigate("/my-page");
    }
  }, [params]);

  const bgColor = useStyleClassStore((state) => state.bgColor);

  useEffect(() => {
    console.log(othersData);
  }, [othersData]);

  return (
    <div
      className={`flex-col py-5 px-2 sm:px-12 lg:px-40 xl:px-60 2xl:px-80 flex md:flex-row min-h-screen ${bgColor}`}
    >
      <div className="basis-1/4 px-5 mb-2">
        <div className="sticky top-20">
          <Profile
            myInfo={myInfo}
            othersInfo={othersInfo}
            followInfo={followInfo?.result}
            likeInfo={likeInfo?.result}
          />
          <div className={id ? "hidden" : ""}>
            <MvpSelector />
          </div>
          <PostList id={id ?? myInfo?._id} />
          <div className={id ? "hidden" : ""}>
            <MessageBoxButton />
          </div>
          <div>
            <VisitorBookButton othersId={id} />
          </div>
          <div>
            <Mailer />
          </div>
        </div>
      </div>
      <main className="basis-3/4 ml-5">
        <div className="lg:flex flew-row mb-2">
          <div className="basis-1/2 mr-1">
            <Mvp
              title={"학력"}
              othersData={othersData?.education}
              customClass="h-full"
            />
          </div>
          <div className="basis-1/2 ml-1">
            <Mvp
              title={"직업 및 경력"}
              othersData={othersData?.career}
              customClass="h-full"
            />
          </div>
        </div>
        <Mvp title={"프로젝트"} othersData={othersData?.project} />
        <div className="lg:flex flew-row mb-2">
          <div className="basis-1/2 mr-1">
            <Mvp
              title={"수상 이력"}
              othersData={othersData?.award}
              customClass="h-full"
            />
          </div>
          <div className="basis-1/2 ml-1">
            <Mvp
              title={"자격증"}
              othersData={othersData?.certificate}
              customClass="h-full"
            />
          </div>
        </div>
      </main>
      <div className={id ? "hidden" : ""}>
        <SpeedDial id={myInfo?._id} />
      </div>
      <div style={{ position: "absolute", left: "-9999px" }}>
        <PdfReader myInfo={myInfo} />
      </div>
    </div>
  );
};

const MessageBoxButton = () => {
  const pointColor = useStyleClassStore((state) => state.pointColor);
  const setModal = useModalStore((state) => state.setModal);
  return (
    <button
      className={
        "text-sm w-full p-3 rounded border mt-3 dark:border-0 " + pointColor
      }
      onClick={() => {
        setModal("", "messageBox");
      }}
    >
      쪽지함 열기
    </button>
  );
};

const VisitorBookButton = ({ othersId }) => {
  const pointColor = useStyleClassStore((state) => state.pointColor);
  const setModal = useModalStore((state) => state.setModal);
  return (
    <button
      className={
        "text-sm w-full p-3 rounded border mt-3 dark:border-0 " + pointColor
      }
      onClick={() => {
        setModal(othersId, "visitorBook");
      }}
    >
      {othersId ? "방명록 작성" : "방명록 열기"}
    </button>
  );
};

const Mailer = () => {
  const setModal = useModalStore((state) => state.setModal);
  return (
    <button
      className="border p-3 w-full mt-2"
      onClick={() => setModal("", "mail")}
    >
      임시 메일 버튼
    </button>
  );
};

export default UserPage;
