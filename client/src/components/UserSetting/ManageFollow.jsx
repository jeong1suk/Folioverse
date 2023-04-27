//담당 : 이승현

import { useEffect, useState } from "react";
import { useGetAxios } from "../../utils/useQuery";

const ManageFollow = () => {
  const url = import.meta.env.VITE_SERVER_HOST;
  const [tab, setTab] = useState(true);
  const [getUrl, setGetUrl] = useState(url + "/dummy/mvp/follow/1");
  const { data } = useGetAxios(getUrl, "getFollow");

  useEffect(() => {
    setGetUrl(
      tab ? url + "/dummy/mvp/follow/1" : url + "/dummy/mvp/followed/1"
    );
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
        <ul>
          {data?.map((item) => (
            <li key={item.id}>
              <span className="mr-5">이름 : {item.name}</span>
              <span>이메일: {item.email}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ManageFollow;
