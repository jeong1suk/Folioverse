//담당 : 이승현

import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditUserInfo from "./EditUserInfo";
import ManageFollow from "./ManageFollow";
import { useEffect } from "react";
import { useQueryGet } from "./../../utils/useQuery";
import UserStats from "./UserStats";
import useStyleClassStore from "./../../store/styleClassStore";
import useThemeStore from "../../store/themeStore";

const UserSetting = () => {
  const { data } = useQueryGet("/user/current", "getMyInfo");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/error/auth");
    }
  }, []);

  const bgColor = useStyleClassStore((state) => state.bgColor);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div
      className={
        "py-2 px-2 sm:px-24 md:px-32 lg:px-40 xl:px-60 2xl:px-80 min-h-screen " +
        bgColor
      }
    >
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="p-3 flex flew-row">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={`${
              data?.profile_image ?? theme
                ? "/profile/profile-light.png"
                : "/profile/profile-dark.png"
            }`}
            alt="프로필 사진"
          />
          <div className="my-auto ml-3">
            <h3 className="block text-xl font-bold dark:text-white">
              {data?.name}
            </h3>
            <span className="dark:text-white">{data?.email}</span>
          </div>
        </div>
        <Link
          to="/my-page"
          className="my-auto w-full sm:w-fit mx-auto sm:mx-0 p-2 border h-fit rounded whitespace-nowrap hover:bg-gray-200 dark:text-white dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-neutral-800"
        >
          프로필로 돌아가기
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row">
        <nav className="basis-1/6 mb-5 sm:mr-5">
          <ContentTab />
        </nav>
        <main className="wrapper basis-4/6">
          <Routes>
            <Route path="" element={<EditProfile data={data} />} />
            <Route
              path="edit-user-info"
              element={<EditUserInfo data={data} />}
            />
            <Route
              path="manage-follow"
              element={<ManageFollow data={data} />}
            />
            <Route path="user-stats" element={<UserStats data={data} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const ContentTab = () => {
  const params = useParams();
  useEffect(() => {}, [params]);

  const tabList = [
    {
      id: 1,
      title: "프로필 설정",
      link: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      backgroundColor: params["*"] === "" && "bg-gray-100 dark:bg-neutral-700",
    },
    {
      id: 2,
      title: "회원정보 변경",
      link: "edit-user-info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      backgroundColor:
        params["*"] === "edit-user-info" && "bg-gray-100 dark:bg-neutral-700",
    },
    {
      id: 3,
      title: "팔로우 관리",
      link: "manage-follow",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
      backgroundColor:
        params["*"] === "manage-follow" && "bg-gray-100 dark:bg-neutral-700",
    },
    {
      id: 4,
      title: "통계",
      link: "user-stats",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      backgroundColor:
        params["*"] === "user-stats" && "bg-gray-100 dark:bg-neutral-700",
    },
  ];

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-1">
      {tabList.map((item) => (
        <li key={item.id} className="text-black dark:text-white">
          <Link
            className={`${item.backgroundColor} block p-2 flex flex-row hover:bg-gray-200 dark:hover:bg-neutral-700 rounded`}
            to={item.link}
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserSetting;
