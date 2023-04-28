//담당 : 이승현

const dummy = [
  { _id: "id값", name: "학교명임", major: "전공임", graduation: "박사졸업" },
  {
    _id: "awt45tawrfawet",
    name: "학교명임2",
    major: "전공임2",
    graduation: "석사졸업",
  },
];

const Education = ({
  setEditState,
  educatoin,
  setEducation,
  setMethod,
  setDeleteLink,
}) => {
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
      {dummy.map((item) => (
        <li key={item._id} className="text-black border p-3 rounded mt-2">
          <div>
            <p className="flex justify-between mb-2">
              <span className="text-lg">
                {item.name}({item.graduation})
              </span>
              <button
                className="text-blue-400 p-1 rounded hover:bg-neutral-100"
                onClick={() => onEdit(item)}
              >
                수정
              </button>
            </p>
            <p className="mb-2 text-neutral-500">전공 : {item.major}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Education;
