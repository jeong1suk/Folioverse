//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryGet } from "../../../utils/useQuery";
import useStyleClassStore from "../../../store/styleClassStore";

const Project = ({ setEditState, project, setProject, isPdf, othersData }) => {
  const { data } = useQueryGet("/project", "getProject");

  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    setProjectData(othersData ?? data);
  }, [othersData, data]);

  const onEdit = (item) => {
    setEditState(true);
    setProject({
      ...project,
      name: item.name,
      division: item.division,
      description: item.description,
      date: item.date,
      tech_stack: item.tech_stack,
      link: item.link,
      _id: item._id,
    });
  };

  const formatLink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      return "https://" + link;
    }
    return link;
  };

  const renderLink = (link) => {
    return (
      <a href={formatLink(link)} target="_blank">
        <span className="ml-2 text-blue-500">{link}</span>
      </a>
    );
  };

  return (
    <ul>
      {projectData?.map((item) => (
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
                {item.name}({item.division})
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
              프로젝트 내용
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10 whitespace-pre-wrap`}
            >
              {item.description}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-${
                !isPdf && "neutral-600"
              } leading-10`}
            >
              기간
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              {item.date}
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
              } leading-10 whitespace-pre-wrap`}
            >
              {item.tech_stack}
            </p>
            <div
              className={`mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              <span
                className={`text-sm text-neutral-400 dark:text-${
                  !isPdf && "neutral-600"
                } leading-10`}
              >
                참조 링크
              </span>
              {item.link.split("\n").map((link) => (
                <div key={link}>{renderLink(link)}</div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Project;
