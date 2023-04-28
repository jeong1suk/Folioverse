//담당 : 이승현
const dummy = [
  { _id: "id값", name: "자격증이름임", date: "취득일임", agency: "발급기과임" },
];

const Certificate = () => {
  return (
    <ul>
      {dummy.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <p className="flex justify-between mb-2">
            <span>{item.name}</span>
            <button className="border p-1 rounded hover:bg-neutral-100">
              수정
            </button>
          </p>
          <p className="mb-2">{item.date}</p>
          <p className="mb-2">{item.agency}</p>
        </li>
      ))}
    </ul>
  );
};

export default Certificate;
