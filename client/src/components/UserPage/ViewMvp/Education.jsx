//담당 : 이승현

import { useQueryGet } from "../../../utils/useQuery";

const Education = ({
  setEditState,
  educatoin,
  setEducation,
  setMethod,
  setDeleteLink,
}) => {
  const { data } = useQueryGet("/dummy/mvp/education", "getEducation");

  const onEdit = (item) => {
    setEditState(true);
    setEducation({
      ...educatoin,
      name: item.name,
      major: item.major,
      graduation: item.graduation,
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
                {item.name}({item.graduation})
              </span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
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
