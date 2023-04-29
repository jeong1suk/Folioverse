//담당 : 이승현

import { useLocation } from "react-router-dom";
import { useQueryGet } from "../../../utils/useQuery";

const Certificate = ({
  setEditState,
  certificate,
  setCertificate,
  setMethod,
  setDeleteLink,
}) => {
  const { data } = useQueryGet("/certificate", "getCertificate");

  const location = useLocation();
  const { pathname } = location;

  const onEdit = (item) => {
    setEditState(true);
    setCertificate({
      ...certificate,
      name: item.name,
      date: item.date,
      agency: item.agency,
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
                className={`text-blue-400 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                  pathname !== "/my-page" && "hidden"
                }`}
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              취득일 : {item.date}
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              발급 기관 : {item.agency}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Certificate;
