//담당 : 이승현
const dummy = [
  {
    _id: "id값",
    name: "프로젝트명임",
    division: "유형임",
    description: "플젝내용임",
    date: "플젝기간임",
    tech_stak: "기술스택임",
    link: "링크임",
  },
];

const Project = () => {
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
          <p className="mb-2">{item.division}</p>
          <p className="mb-2">{item.description}</p>
          <p className="mb-2">{item.date}</p>
          <p className="mb-2">{item.tech_stak}</p>
          <p className="mb-2">{item.link}</p>
        </li>
      ))}
    </ul>
  );
};

export default Project;
