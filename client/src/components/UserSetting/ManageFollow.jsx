//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../utils/useQuery";
import { Link } from "react-router-dom";

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

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2 dark:border-cyan-950">
        팔로우 관리
      </h1>
      <nav className="mt-3">
        <ul className="flex flex-row">
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:border-cyan-950 ${
              tab === 0 && "bg-gray-100 dark:bg-neutral-700 border-b-0"
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
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-gray-100 dark:hover:bg-neutral-700 dark:border-cyan-950 ${
              tab === 1 && "bg-gray-100 dark:bg-neutral-700 border-b-0"
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
            <UserCard user={user} key={user._id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <li className="border p-4 rounded dark:border-cyan-950 flex flex-col">
      <div className="w-full h-3/5 flex items-center justify-center">
        <img
          className="rounded-full w-16 h-16 object-cover"
          src={user.profile_image ?? "/profile/profile-dark.png"}
          alt={user.name}
        />
      </div>
      <p className="text-center text-black dark:text-white flex-1">
        {user.name}
      </p>
      <p className="text-center text-sm text-neutral-400 flex-1">
        {user.email}
      </p>
      <p className="text-center mt-2 flex-1">
        <Link to={`/user-page/${user._id}`} className="text-blue-400 text-xs">
          View profile
        </Link>
      </p>
    </li>
  );
};

export default ManageFollow;
