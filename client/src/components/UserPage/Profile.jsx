//담당 : 이승현

import { Link, useLocation } from "react-router-dom";

const Profile = ({ myData }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside className="border rounded p-5 h-fit relative dark:border-cyan-950">
      <img
        className="w-20 rounded-full mx-auto mb-5"
        src={`${myData?.profile_image ?? "profile/profile-dark.png"}`}
      />
      <p className="text-center text-xl font-bold dark:text-white">
        {myData?.name}
      </p>
      <p className="text-center text-neutral-500">{myData?.email}</p>
      <p className="text-center dark:text-neutral-200 my-3">
        {myData?.description}
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

export default Profile;
