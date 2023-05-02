import { useEffect, useState } from "react";
import { useQueryGet } from "../../../utils/useQuery";

const Career = ({ setEditState, career, setCareer, isPdf, othersData }) => {
  const { data } = useQueryGet("/career", "getCareer");

  const [careerData, setCareerData] = useState(null);

  useEffect(() => {
    setCareerData(othersData ?? data);
  }, [othersData, data]);

  const onEdit = (item) => {
    setEditState(true);
    setCareer({
      ...career,
      job: item.name,
      yearly: item.division,
      isWeb: item.description,
      position: item.date,
      tech_stack: item.tech_stack,
      _id: item._id,
    });
  };

  return (
    <ul>
      {careerData?.map((item) => (
        <li
          key={item._id}
          className="text-black border p-3 rounded mt-2 dark:border-cyan-950"
        >
          <div>
            <p className="flex justify-between mb-2">
              <span
                className={`text-lg dark:text-${!isPdf && "white"} leading-10`}
              >
                직업 : {item.job}({item.yearly})
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
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } leading-10`}
            >
              개발 분야
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10 whitespace-pre-wrap`}
            >
              {item.isWeb}({item.position})
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } leading-10`}
            >
              기술 스택
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              {item.tech_stack}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Career;
