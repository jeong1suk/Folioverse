//담당 : 이승현

import { useQueryGet } from "../../../utils/useQuery";

const Project = ({
  setEditState,
  project,
  setProject,
  setMethod,
  setDeleteLink,
}) => {
  const { data } = useQueryGet("/dummy/mvp/project", "getProject");

  const onEdit = (item) => {
    setEditState(true);
    setProject({
      ...project,
      name: item.name,
      division: item.division,
      description: item.description,
      date: item.date,
      techStack: item.techStack,
      refLink: item.refLink,
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
                {item.name}({item.division})
              </span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              내용 : {item.description}
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              기간 : {item.date}
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              기술 스택 : {item.techStack}
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              참조 링크 : {item.refLink}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Project;
