//담당 : 이승현

const dummy = [{ _id: "id값", name: "상이름임", date: "2023-04-01" }];

const Award = ({ setEditState, award, setAward, setMethod, setDeleteLink }) => {
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
      {dummy.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <div>
            <p className="flex justify-between mb-2">
              <span className="text-lg">{item.name}</span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100"
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500">수상 날짜 : {item.date}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Award;
