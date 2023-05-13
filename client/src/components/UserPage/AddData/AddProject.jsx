//담당 : 이승현

import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const AddProject = ({ project, setProject, setIsValid }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const calendarRef = useRef();
  const calendarEndRef = useRef();

  const handleDateChange = (date) => {
    setProject({ ...project, startDate: date });
    setShowCalendar(false);
  };

  const handleEndDateChange = (date) => {
    setProject({ ...project, endDate: date });
    setShowEndCalendar(false);
  };

  useEffect(() => {
    if (project.startDate && project.endDate) {
      const startDateString = formatDate(project.startDate);
      const endDateString = formatDate(project.endDate);
      const dateRange = `${startDateString} ~ ${endDateString}`;
      setProject({ ...project, date: dateRange });
    }
  }, [project.startDate, project.endDate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return moment(date).format("YYYY-MM-DD");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
        setShowEndCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      if (project.startDate && project.endDate) {
        const startDate = new Date(project.startDate);
        const endDate = new Date(project.endDate);

        if (startDate <= endDate) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } else if (!project.startDate && !project.endDate) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  }, [project.name, project.division, project.startDate, project.endDate]);

  return (
    <>
      <div className="flex flex-row items-center mb-4">
        <input
          className="border p-2 mr-2 rounded-xl w-1/2 focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
          type="text"
          placeholder="프로젝트 이름(필수)"
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          value={project.name}
          maxLength={20}
        />
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl sm:flex dark:bg-neutral-800 dark:border-neutral-700 dark:text-white">
          <li
            className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-neutral-700"
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
          <li
            className="w-full dark:border-neutral-700"
            onClick={handleLiClick}
          >
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
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        placeholder="프로젝트 내용"
        cols="30"
        rows="10"
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
        value={project.description}
        maxLength={1000}
      ></textarea>
      <div className="flex flex-row">
        <div className="relative basis-1/2 mr-1">
          <input
            className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
            type="text"
            placeholder="시작 날짜"
            onFocus={() => setShowCalendar(true)}
            value={formatDate(project?.startDate)}
            readOnly
          />
          {showCalendar && (
            <div
              ref={calendarRef}
              className="absolute top-0 left-0 transform -translate-y-full"
            >
              <Calendar onChange={handleDateChange} value={project.startDate} />
            </div>
          )}
        </div>
        <div className="relative basis-1/2 ml-1">
          <input
            className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
            type="text"
            placeholder="종료 날짜"
            onFocus={() => setShowEndCalendar(true)}
            value={formatDate(project?.endDate)}
            readOnly
          />
          {showEndCalendar && (
            <div
              ref={calendarEndRef}
              className="absolute top-0 left-0 transform -translate-y-full"
            >
              <Calendar
                onChange={handleEndDateChange}
                value={project.endDate}
              />
            </div>
          )}
        </div>
      </div>

      <textarea
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        cols="30"
        rows="3"
        placeholder="기술 스택"
        onChange={(e) => setProject({ ...project, tech_stack: e.target.value })}
        value={project.tech_stack}
        maxLength={500}
      ></textarea>
      <textarea
        className="block border w-full p-2 mb-4 rounded-xl focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        cols="30"
        rows="3"
        placeholder="참조 링크(줄바꿈으로 구분)"
        onChange={(e) => setProject({ ...project, link: e.target.value })}
        value={project.link}
        maxLength={500}
      ></textarea>
    </>
  );
};

export default AddProject;
