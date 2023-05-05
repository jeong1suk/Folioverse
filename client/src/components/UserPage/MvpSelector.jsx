//담당 : 이승현

import { useState } from "react";
import mvpSelectStore from "../../store/mvpSelectStore";

const MvpSelector = () => {
  const [openList, setOpenList] = useState(false);
  return (
    <div className="text-center mt-3">
      <button
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className={
          "w-full mt-1 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2"
        }
        type="button"
        onClick={() => setOpenList(!openList)}
      >
        항목 선택
      </button>
      <MvpSelectBox openList={openList} />
    </div>
  );
};

const MvpSelectBox = ({ openList }) => {
  const education = mvpSelectStore((state) => state.education);
  const career = mvpSelectStore((state) => state.career);
  const project = mvpSelectStore((state) => state.project);
  const award = mvpSelectStore((state) => state.award);
  const certificate = mvpSelectStore((state) => state.certificate);

  const toggleEducation = mvpSelectStore((state) => state.toggleEducation);
  const toggleCareer = mvpSelectStore((state) => state.toggleCareer);
  const toggleProject = mvpSelectStore((state) => state.toggleProject);
  const toggleAward = mvpSelectStore((state) => state.toggleAward);
  const toggleCertificate = mvpSelectStore((state) => state.toggleCertificate);

  const mvpList = [
    {
      id: 0,
      title: "학력",
      value: education,
      toggle: toggleEducation,
    },
    {
      id: 1,
      title: "직업 및 경력",
      value: career,
      toggle: toggleCareer,
    },
    {
      id: 2,
      title: "프로젝트",
      value: project,
      toggle: toggleProject,
    },
    {
      id: 3,
      title: "수상 이력",
      value: award,
      toggle: toggleAward,
    },
    {
      id: 4,
      title: "자격증",
      value: certificate,
      toggle: toggleCertificate,
    },
  ];

  return (
    <div
      className={`${
        !openList && "hidden"
      } bg-white rounded shadow w-60 dark:bg-neutral-700 mt-2 w-full`}
    >
      <ul
        className="px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton"
      >
        {mvpList.map((item) => (
          <li key={item.id} onClick={item.toggle}>
            <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-600">
              <input
                type="checkbox"
                checked={item.value}
                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={item.toggle}
                onClick={(e) => e.stopPropagation()}
              />
              <label className="w-full py-2 ml-2 text-sm font-medium text-neutral-500 rounded dark:text-gray-300 cursor-pointer">
                {item.title}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MvpSelector;
