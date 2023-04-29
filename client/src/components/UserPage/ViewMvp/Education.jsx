//담당 : 이승현

import { useLocation } from "react-router-dom";
import { useQueryGet } from "../../../utils/useQuery";

const Education = ({
  setEditState,
  educatoin,
  setEducation,
  setMethod,
  setDeleteLink,
}) => {
  const { data } = useQueryGet("/education", "getEducation");
  const location = useLocation();
  const { pathname } = location;

  const onEdit = (item) => {
    setEditState(true);
    setEducation({
      ...educatoin,
      school_name: item.school_name,
      major: item.major,
      graduate_status: item.graduate_status,
      _id: item._id,
    });
    setMethod("patch");
    setDeleteLink(`/${item._id}`);
  };
  return (
    <ul>
      {data?.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <div>
            <p className="flex justify-between mb-2">
              <span className="text-lg dark:text-white">
                {item.school_name}({item.graduate_status})
              </span>
              <button
                className={`text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  pathname !== "/my-page" && "hidden"
                }`}
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              전공 : {item.major}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Education;
