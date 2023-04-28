//담당 : 이승현

const dummy = [
  { _id: "id값", name: "자격증이름임", date: "취득일임", agency: "발급기관임" },
];

const Certificate = ({
  setEditState,
  certificate,
  setCertificate,
  setMethod,
  setDeleteLink,
}) => {
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
            <p className="mb-2 text-neutral-500">취득일 : {item.date}</p>
            <p className="mb-2 text-neutral-500">발급 기관 : {item.agency}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Certificate;
