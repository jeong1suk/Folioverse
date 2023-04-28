//담당 : 이승현

const dummy = [
  {
    _id: "id값",
    name: "프로젝트명임",
    division: "팀 프로젝트",
    description: "플젝내용임",
    date: "플젝기간임",
    techStack: "기술스택임",
    refLink: "링크임",
  },
];

const Project = ({
  setEditState,
  project,
  setProject,
  setMethod,
  setDeleteLink,
}) => {
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
      {dummy.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <div>
            <p className="flex justify-between mb-2">
              <span className="text-lg">
                {item.name}({item.division})
              </span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100"
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500">내용 : {item.description}</p>
            <p className="mb-2 text-neutral-500">기간 : {item.date}</p>
            <p className="mb-2 text-neutral-500">
              기술 스택 : {item.tech_stak}
            </p>
            <p className="mb-2 text-neutral-500">참조 링크 : {item.link}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Project;
