//담당 : 이승현
import { useQueryGet } from "./../../../utils/useQuery";

const Award = ({ setEditState, award, setAward, setMethod, setDeleteLink }) => {
  const { data } = useQueryGet("/award", "getAward");

  const onEdit = (item) => {
    setEditState(true);
    setAward({
      ...award,
      name: item.name,
      date: item.date,
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
              <span className="text-lg dark:text-white">{item.name}</span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              수상 날짜 : {item.date}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Award;
