//담당 : 이승현
const dummy = [{ _id: "id값", name: "상이름임", date: "받은날짜임" }];

const Award = () => {
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
        </li>
      ))}
    </ul>
  );
};

export default Award;
