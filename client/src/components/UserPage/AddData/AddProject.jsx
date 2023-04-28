import { useState } from "react";

const AddProject = () => {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [techStack, setTechStack] = useState("");
  const [refLink, setRefLink] = useState("");

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="프로젝트 이름"
        onChange={(e) => setName(e.target.value)}
        value={name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="프로젝트 유형"
        onChange={(e) => setDivision(e.target.value)}
        value={division}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="프로젝트 내용"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="프로젝트 기간"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="기술 스택"
        onChange={(e) => setTechStack(e.target.value)}
        value={techStack}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="참조 링크"
        onChange={(e) => setRefLink(e.target.value)}
        value={refLink}
        maxLength={20}
      />
    </>
  );
};

export default AddProject;
