//담당 : 이승현

import { Link, useLocation } from "react-router-dom";
import { useQueryGet } from "../../utils/useQuery";
import { useEffect, useState } from "react";
import useUserStore from "../../store/userStore";
import useModalStore from "../../store/modalStore";

const Profile = () => {
  const location = useLocation();
  const { pathname } = location;
  const [data, setData] = useState(null);
  const userId = useUserStore((state) => state.id);
  const { data: myData } = useQueryGet("/user/current", "getMyInfo");
  const { data: others } = useQueryGet(`/user/${userId}`, "getOther");

  useEffect(() => {
    setData(pathname === "/my-page" ? myData : others);
  }, [pathname, myData, others]);

  return (
    <aside className="basis-1/5 border rounded p-5 h-fit relative">
      <MessageIcon pathname={pathname} id={data?._id} name={data?.name} />
      <img className="w-20 rounded-full mx-auto mb-5" src="/cat.png" />
      <p className="text-center text-xl font-bold dark:text-white">
        {data?.name}
      </p>
      <p className="text-center text-neutral-500">{data?.email}</p>
      <p className="text-center dark:text-neutral-200 my-3">
        {data?.description}
      </p>
      <div className="flex flex-row text-neutral-500 my-5">
        <div className="basis-1/2 text-center">
          <div>10</div>
          <div>팔로워</div>
        </div>
        <div className="basis-1/2 text-center">
          <div>20</div>
          <div>좋아요</div>
        </div>
      </div>
      <p className="text-center text-sm mt-3 text-blue-400">
        <Link
          className={`hover:bg-neutral-100 dark:hover:bg-neutral-700 p-5 rounded ${
            pathname !== "/my-page" && "hidden"
          }`}
          to="/user-setting"
        >
          Edit
        </Link>
      </p>
    </aside>
  );
};

const MessageIcon = ({ pathname, id, name }) => {
  const setModal = useModalStore((state) => state.setModal);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${
        pathname === "/my-page" && "hidden"
      } absolute right-5 rounded w-8 h-8 text-black dark:text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600`}
      onClick={() => setModal(id, "message", name)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
};

export default Profile;
