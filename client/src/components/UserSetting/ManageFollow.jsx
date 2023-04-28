//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../utils/useQuery";

const ManageFollow = () => {
  const [tab, setTab] = useState(true);
  const [getUrl, setGetUrl] = useState("/dummy/mvp/follow/1");
  const { data } = useQueryGet(getUrl, "getFollow");

  useEffect(() => {
    setGetUrl(tab ? "/dummy/mvp/follow/1" : "/dummy/mvp/followed/1");
  }, [tab]);

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2">팔로우 관리</h1>
      <nav className="mt-3">
        <ul className="flex flex-row">
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${
              tab && "bg-gray-100 dark:bg-neutral-700 border-b-0"
            }`}
          >
            <button
              className="w-full text-black dark:text-white"
              onClick={() => setTab(true)}
            >
              내가 팔로우한 유저
            </button>
          </li>
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg hover:bg-gray-100 dark:hover:bg-neutral-700 ${
              !tab && "bg-gray-100 dark:bg-neutral-700 border-b-0"
            }`}
          >
            <button
              className="w-full text-black dark:text-white"
              onClick={() => setTab(false)}
            >
              나를 팔로우한 유저
            </button>
          </li>
        </ul>
      </nav>
      <section>
        <ul className="grid grid-cols-4 gap-4 mt-4">
          {data?.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </ul>
      </section>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <li className="border p-4 rounded">
      <img className="rounded-full w-16 mx-auto my-2" src="/cat.png" />
      <p className="text-center text-black dark:text-white">{user.name}</p>
      <p className="text-center text-sm text-neutral-400">{user.email}</p>
      <p className="text-center mt-2">
        <a className="text-blue-400 text-xs" href="#">
          프로필 보기
        </a>
      </p>
    </li>
  );
};

export default ManageFollow;
