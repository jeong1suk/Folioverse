//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../../utils/useQuery";

const Education = ({
  setEditState,
  education,
  setEducation,
  isPdf,
  othersData,
}) => {
  const { data } = useQueryGet("/education", "getEducation");

  const [educationData, setEducationData] = useState(null);

  useEffect(() => {
    setEducationData(othersData ?? data);
  }, [othersData, data]);

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
      {educationData?.map((item) => (
        <li
          key={item._id}
          className={`text-black border p-3 rounded-xl mt-2 dark:bg-${
            isPdf ? "white" : "neutral-800 dark:border-neutral-600"
          }`}
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
                  isPdf || othersData ? " hidden" : ""
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
