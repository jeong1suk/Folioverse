//담당 : 이승현

import { useEffect } from "react";

const AddEducation = ({ education, setEducation, setIsValid }) => {
  const handleRadioClick = (e) => {
    const { value } = e.target;
    setEducation({
      ...education,
      graduate_status: value,
    });
  };

  const handleLiClick = (e) => {
    const radioButton = e.currentTarget.querySelector('input[type="radio"]');
    if (radioButton && !radioButton.checked) {
      radioButton.click();
    }
  };

  const radioOptions = [
    { value: "재학중", label: "재학중" },
    { value: "학사 졸업", label: "학사 졸업" },
    { value: "석사 졸업", label: "석사 졸업" },
    { value: "박사 졸업", label: "박사 졸업" },
    { value: "중퇴", label: "중퇴" },
  ];

  useEffect(() => {
    if (education.school_name && education.major) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [education.school_name, education.major]);

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded-lg focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="학교 이름(필수)"
        onChange={(e) => {
          setEducation({ ...education, school_name: e.target.value });
        }}
        value={education.school_name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded-lg focus:outline-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300"
        type="text"
        placeholder="전공(필수)"
        onChange={(e) => {
          setEducation({ ...education, major: e.target.value });
        }}
        value={education.major}
        maxLength={20}
      />
      <ul className="flex flex-col sm:flex-row lg:flex-col items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg sm:flex border dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        {radioOptions.map((option) => (
          <li
            key={option.value}
            className={`w-full ${option.value !== "중퇴" && ""}`}
            onClick={handleLiClick}
          >
            <div className="flex items-center pl-3">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                name="degree"
                type="radio"
                value={option.value}
                checked={education.graduate_status === option.value}
                onChange={handleRadioClick}
              />
              <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {option.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddEducation;
