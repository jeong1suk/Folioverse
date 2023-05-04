//담당 : 이승현

import { useState } from "react";
import mvpSelectStore from "../../store/mvpSelectStore";
import useStyleClassStore from "../../store/styleClassStore";

const MvpSelector = () => {
  const pointColor = useStyleClassStore((state) => state.pointColor);
  const [openList, setOpenList] = useState(false);
  return (
    <div className="text-center mt-3">
      <button
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className={
          "w-full text-black border dark:border-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-black " +
          pointColor
        }
        type="button"
        onClick={() => setOpenList(!openList)}
      >
        항목 선택{" "}
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
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
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={item.toggle}
                onClick={(e) => e.stopPropagation()}
              />
              <label className="w-full py-2 ml-2 text-sm font-medium text-neutral-500 rounded dark:text-gray-300">
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
