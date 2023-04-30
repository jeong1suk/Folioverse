//담당 : 이승현

import { useLocation } from "react-router-dom";
import { useQueryGet } from "../../../utils/useQuery";

const Project = ({
  setEditState,
  project,
  setProject,
  setMethod,
  setDeleteLink,
  isPdf,
}) => {
  const { data } = useQueryGet("/project", "getProject");
  const location = useLocation();
  const { pathname } = location;

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
    setMethod("patch");
    setDeleteLink(`/${item._id}`);
  };

  const formatLink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      return "https://" + link;
    }
    return link;
  };

  return (
    <ul>
      {data?.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <div>
            <p className="flex justify-between mb-2">
              <span
                className={`text-lg dark:text-${!isPdf && "white"} leading-10`}
              >
                {item.name}({item.division})
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
              className={`mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              내용 : {item.description}
            </p>
            <p
              className={`mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              기간 : {item.date}
            </p>
            <p
              className={`mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              기술 스택 : {item.tech_stack}
            </p>
            <p
              className={`mb-2 text-neutral-500 dark:text-${
                !isPdf && "neutral-300"
              } leading-10`}
            >
              <a href={formatLink(item.link)} target="_blank">
                참조 링크 : <span className="text-blue-500">{item.link}</span>
              </a>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Project;
