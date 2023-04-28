//담당 : 이승현
const dummy = [
  { _id: "id값", name: "학교명임", major: "전공임", graduation: "졸업여부임" },
];

const Education = () => {
  return (
    <ul>
      {dummy.map((item) => (
        <li key={item._id} className="text-black border">
          <p>{item.name}</p>
          <p>{item.major}</p>
          <p>{item.graduation}</p>
        </li>
      ))}
    </ul>
  );
};

export default Education;
