//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../../utils/useQuery";

const Career = ({ setEditState, career, setCareer, isPdf, othersData }) => {
  const isToken = localStorage.getItem("token");
  const { data } = useQueryGet("/career", "getCareer", { enabled: !!isToken });

  const [careerData, setCareerData] = useState(null);

  useEffect(() => {
    setCareerData(othersData ?? data);
  }, [othersData, data]);

  const onEdit = (item) => {
    setEditState(true);
    setCareer({
      ...career,
      job: "",
      yearly: "",
      isWeb: false,
      position: "",
      tech_stack: [],
      _id: item._id,
    });
  };

  return (
    <ul>
      {careerData?.map((item) => (
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
                직업 : {item.job}
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
              className={`ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              {item.yearly}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } ${!item.position && "hidden"} leading-10`}
            >
              개발 분야
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10 whitespace-pre-wrap`}
            >
              {item.isWeb && "웹 개발자"}
              {item.isWeb ? `(${item.position})` : `${item.position}`}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } ${item.tech_stack.length === 0 && "hidden"} leading-10`}
            >
              기술 스택
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10 flex flex-wrap`}
            >
              {item.tech_stack.map((stack) => (
                <span key={stack} className="mx-1">
                  {stack}
                </span>
              ))}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Career;
