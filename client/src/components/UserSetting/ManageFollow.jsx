//담당 : 이승현

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryDelete, useQueryGet } from "../../utils/useQuery";
import useStyleClassStore from "../../store/styleClassStore";
import useThemeStore from "../../store/themeStore";
import { useQueryClient } from "react-query";
import useToastStore from "../../store/toastStore";

const ManageFollow = ({ data }) => {
  const [tab, setTab] = useState(0);
  const { data: followers } = useQueryGet(
    `/follow/followers/${data?._id}`,
    "getAllFollowers",
    {
      enabled: !!data,
    }
  );

  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    setUsersData(
      tab === 0
        ? followers?.result.followByMeUsers
        : followers?.result.followByThemUsers
    );
  }, [followers, tab]);

  const bgColor = useStyleClassStore((state) => state.bgColor);

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2 dark:border-neutral-800">
        팔로우 관리
      </h1>
      <nav className="mt-3">
        <ul className="flex flex-row">
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:border-neutral-800 ${
              tab === 0
                ? `${bgColor} border-b-0`
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-white"
            }`}
          >
            <button
              className="w-full text-black dark:text-white"
              onClick={() => setTab(0)}
            >
              내가 팔로우한 유저
            </button>
          </li>
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 dark:border-neutral-800 ${
              tab === 1
                ? `${bgColor} border-b-0`
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-white"
            }`}
          >
            <button
              className="w-full text-black dark:text-white"
              onClick={() => setTab(1)}
            >
              나를 팔로우한 유저
            </button>
          </li>
        </ul>
      </nav>
      <section>
        <ul className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
          {usersData?.map((user) => (
            <UserCard user={user} key={user?._id} tab={tab} />
          ))}
        </ul>
      </section>
    </div>
  );
};

const UserCard = ({ user, tab }) => {
  const theme = useThemeStore((state) => state.theme);
  const { deleteMutate: unFollow, isLoading: loadingUnFollow } =
    useQueryDelete("/follow");
  const queryClient = useQueryClient();
  const setToast = useToastStore((state) => state.setToast);

  const handdleClick = (e) => {
    e.stopPropagation();
    unFollow(user?._id, {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllFollowers");
        setToast("팔로우를 취소하였습니다", "success");
      },
    });
  };
  return (
    <div className="relative">
      <Link to={`/user-page/${user?._id}`}>
        <li className="border p-4 rounded-2xl dark:border-neutral-800 flex flex-col min-h-[200px] dark:bg-neutral-800 dark:hover:bg-neutral-900">
          <div className="w-full h-4/5 mt-2 flex items-center justify-center">
            <img
              className="rounded-full w-16 h-16 object-cover"
              src={
                user?.profile_image ??
                (!theme
                  ? "/profile/profile-dark.png"
                  : "/profile/profile-light.png")
              }
              alt={user?.name}
            />
          </div>
          <p className="text-center text-black dark:text-white flex-1">
            {user?.name}
          </p>
          <p className="text-center text-sm text-neutral-400 flex-1 truncate max-w-full">
            {user?.email}
          </p>
        </li>
      </Link>
      <button
        className={`${
          tab === 1 && "hidden"
        } absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center border hover:bg-neutral-100 text-neutral-500 dark:border-neutral-700 rounded-lg w-fit mx-auto px-3 dark:bg-neutral-900 dark:hover:bg-neutral-700`}
        onClick={handdleClick}
      >
        Unfollow
      </button>
    </div>
  );
};

export default ManageFollow;
