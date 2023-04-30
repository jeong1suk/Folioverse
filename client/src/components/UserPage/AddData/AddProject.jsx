//담당 : 이승현

import { useEffect } from "react";

const AddProject = ({ project, setProject, setIsValid }) => {
  const handleRadioClick = (e) => {
    const { value } = e.target;
    setProject({
      ...project,
      division: value,
    });
  };

  const handleLiClick = (e) => {
    const radioButton = e.currentTarget.querySelector('input[type="radio"]');
    if (radioButton && !radioButton.checked) {
      radioButton.click();
    }
  };

  useEffect(() => {
    if (project.name && project.division) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [project.name, project.division]);

  return (
    <>
      <div className="flex flex-row items-center mb-4">
        <input
          className="border p-2 mr-2 rounded w-1/2 focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
          type="text"
          placeholder="프로젝트 이름(필수)"
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          value={project.name}
          maxLength={20}
        />
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-neutral-800 dark:border-cyan-950 dark:text-white">
          <li
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-cyan-950"
            onClick={handleLiClick}
          >
            <div className="flex items-center pl-3">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                name="degree"
                type="radio"
                value="개인 프로젝트"
                checked={project.division === "개인 프로젝트"}
                onChange={handleRadioClick}
              />
              <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                개인 프로젝트
              </label>
            </div>
          </li>
          <li className="w-full dark:border-cyan-950" onClick={handleLiClick}>
            <div className="flex items-center pl-3">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                name="degree"
                type="radio"
                value="팀 프로젝트"
                checked={project.division === "팀 프로젝트"}
                onChange={handleRadioClick}
              />
              <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                팀 프로젝트
              </label>
            </div>
          </li>
        </ul>
      </div>
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
        placeholder="프로젝트 내용"
        cols="30"
        rows="10"
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
        value={project.description}
        maxLength={1000}
      ></textarea>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
        type="text"
        placeholder="프로젝트 기간"
        onChange={(e) => setProject({ ...project, date: e.target.value })}
        value={project.date}
        maxLength={50}
      />
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
        cols="30"
        rows="3"
        placeholder="기술 스택"
        onChange={(e) => setProject({ ...project, tech_stack: e.target.value })}
        value={project.tech_stack}
        maxLength={500}
      ></textarea>
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
        cols="30"
        rows="3"
        placeholder="참조 링크"
        onChange={(e) => setProject({ ...project, link: e.target.value })}
        value={project.link}
        maxLength={500}
      ></textarea>
    </>
  );
};

export default AddProject;
