//담당 : 이승현

import { useLocation } from "react-router-dom";
import { useQueryGet } from "../../../utils/useQuery";

const Education = ({ setEditState, education, setEducation, isPdf }) => {
  const { data } = useQueryGet("/education", "getEducation");
  const location = useLocation();
  const { pathname } = location;

  const onEdit = (item) => {
    setEditState(true);
    setEducation({
      ...education,
      school_name: item.school_name,
      major: item.major,
      graduate_status: item.graduate_status,
      _id: item._id,
    });
  };
  return (
    <ul>
      {data?.map((item) => (
        <li
          key={item._id}
          className="text-black border p-3 rounded mt-2 dark:border-cyan-950"
        >
          <div>
            <p className="flex justify-between mb-2">
              <span
                className={`text-lg dark:text-${!isPdf && "white"} leading-10`}
              >
                {item.school_name}({item.graduate_status})
              </span>
              <button
                className={`text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  (pathname !== "/my-page" && "hidden", isPdf && "hidden")
                }`}
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p
              className={`ml-2 mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              {item.major}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Education;
