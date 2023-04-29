//담당 : 이승현

import { Link } from "react-router-dom";
import { useQueryGet } from "../../utils/useQuery";

const Profile = () => {
  const { data } = useQueryGet("/user/current", "getMyInfo");

  return (
    <aside className="basis-1/5 border rounded p-5 h-fit">
      <img className="w-20 rounded-full mx-auto mb-5" src="/cat.png" />
      <p className="text-center text-xl font-bold dark:text-white">
        {data?.name}
      </p>
      <p className="text-center text-neutral-500">{data?.email}</p>
      <p className="text-center dark:text-neutral-200 my-3">
        {data?.description}
      </p>
      <p className="text-center text-sm mt-3 text-blue-400">
        <Link
          className="hover:bg-neutral-100 dark:hover:bg-neutral-700 p-5 rounded"
          to="/user-setting"
        >
          Edit
        </Link>
      </p>
    </aside>
  );
};

export default Profile;
