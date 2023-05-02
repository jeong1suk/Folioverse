//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../utils/useQuery";
import { Link } from "react-router-dom";

const ManageFollow = () => {
  const [tab, setTab] = useState(0);
  const [getUrl, setGetUrl] = useState("/user/list");
  const { data } = useQueryGet(getUrl, "getFollow");

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
        <ul className="grid grid-cols-4 gap-4 mt-4">
          {data?.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <li className="border p-4 rounded dark:border-cyan-950">
      <img
        className="rounded-full w-16 mx-auto my-2"
        src={user.profile_image ?? "/profile/profile-dark.png"}
      />
      <p className="text-center text-black dark:text-white">{user.name}</p>
      <p className="text-center text-sm text-neutral-400">{user.email}</p>
      <p className="text-center mt-2">
        <Link to={`/user-page/${user._id}`} className="text-blue-400 text-xs">
          프로필 보기
        </Link>
      </p>
    </li>
  );
};

export default ManageFollow;
