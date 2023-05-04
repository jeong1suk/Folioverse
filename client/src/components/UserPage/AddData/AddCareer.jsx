//담당 : 이승현

import React, { useEffect } from "react";
import ReactSelect from "react-select";
import useThemeStore from "./../../../store/themeStore";

const AddCareer = ({ career, setCareer, setIsValid, resetCount }) => {
  const theme = useThemeStore((state) => !state.theme);

  useEffect(() => {
    setCareer({
      ...career,
      job: "",
      yearly: "",
      isWeb: true,
      position: "",
      tech_stack: [],
    });
  }, [resetCount]);

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    const value = selectedOption.value;

    if (name === "job") {
      setCareer((prevCareer) => ({
        ...prevCareer,
        job: value,
        isWeb: value === "개발자" ? prevCareer.isWeb : false,
        position:
          value === "개발자" && prevCareer.isWeb === false
            ? prevCareer.position
            : "",
      }));
    } else if (name === "yearly") {
      setCareer((prevCareer) => ({ ...prevCareer, yearly: value }));
    } else if (name === "isWeb") {
      setCareer((prevCareer) => ({
        ...prevCareer,
        isWeb: value === "web",
        position: value === "web" ? prevCareer.position : "",
      }));
    } else if (name === "tech_stack") {
      const skills = selectedOption
        ? selectedOption.map((skill) => skill.value)
        : [];
      setCareer((prevCareer) => ({ ...prevCareer, tech_stack: skills }));
    }
  };

  useEffect(() => {
    if (career.job && career.yearly) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [career.job, career.yearly]);

  const isEdgeOption = (index, optionsLength) => {
    return index === 0 || index === optionsLength - 1;
  };

  const customStyles = {
    option: (provided, state) => {
      const isFirstOrLast = isEdgeOption(
        state.selectProps.options.indexOf(state.data),
        state.selectProps.options.length
      );

      return {
        ...provided,
        padding: 10,
        fontSize: 14,
        backgroundColor: !theme
          ? state.isFocused
            ? "#3F3F46"
            : "#1F1F23"
          : state.isFocused
          ? "#E5E7EB"
          : "#F3F4F6",
        color: !theme ? "lightgray" : "gray",
        borderTopLeftRadius:
          isFirstOrLast && state.data === state.selectProps.options[0]
            ? "4px"
            : 0,
        borderTopRightRadius:
          isFirstOrLast && state.data === state.selectProps.options[0]
            ? "4px"
            : 0,
        borderBottomLeftRadius:
          isFirstOrLast &&
          state.data ===
            state.selectProps.options[state.selectProps.options.length - 1]
            ? "4px"
            : 0,
        borderBottomRightRadius:
          isFirstOrLast &&
          state.data ===
            state.selectProps.options[state.selectProps.options.length - 1]
            ? "4px"
            : 0,
      };
    },
    control: (provided) => ({
      ...provided,
      backgroundColor: !theme ? "#1F1F23" : "#F3F4F6",
      border: "none",
      boxShadow: "none",
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: "100%",
      borderRadius: "4px",
      width: "250px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "lightgray",
    }),
    input: (provided) => ({
      ...provided,
      color: "darkgray",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#89898a",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: !theme ? "#1F1F23" : "#F3F4F6",
      borderRadius: "4px",
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: !theme ? "lightgray" : "gray",
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: !theme ? "lightgray" : "gray",
      ":hover": {
        backgroundColor: !theme ? "#3F3F46" : "#E5E7EB",
        color: "white",
      },
    }),
  };

  return (
    <>
      <div className="items-center mb-4">
        <ReactSelect
          key={resetCount}
          options={jobOptions}
          styles={customStyles}
          name="job"
          onChange={handleSelectChange}
          value={jobOptions.find((option) => option.value === career.job)}
          placeholder="직업 유형 선택"
          isSearchable={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              neutral0: "transparent",
            },
          })}
        ></ReactSelect>
      </div>

      {career.job !== "개발자" && career.job !== "" && (
        <div className="items-center mb-4 px-2">
          <input
            className="w-full rounded p-1 border focus:outline-neutral-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
            type="text"
            placeholder="직업명을 작성하세요"
            defaultValue={""}
            onChange={(e) =>
              setCareer((prevCareer) => ({
                ...prevCareer,
                job: e.target.value,
              }))
            }
          />
        </div>
      )}

      <div className="items-center mb-4">
        <ReactSelect
          key={resetCount}
          options={yearlyOptions}
          styles={customStyles}
          name="yearly"
          onChange={handleSelectChange}
          value={yearlyOptions.find((option) => option.value === career.yearly)}
          placeholder="경력 선택"
          isSearchable={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              neutral0: "transparent",
            },
          })}
        />
      </div>

      {career.job === "개발자" && (
        <ReactSelect
          key={resetCount}
          options={developmentTypeOptions}
          styles={customStyles}
          name="isWeb"
          onChange={handleSelectChange}
          value={developmentTypeOptions.find(
            (option) => option.value === (career.isWeb ? "web" : "noWeb")
          )}
          placeholder="Select development type"
          isSearchable={true}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              neutral0: "transparent",
            },
          })}
        />
      )}

      {career.job === "개발자" && !career.isWeb && (
        <div className="items-center mt-4 mb-4 px-2">
          <input
            className="w-full rounded p-1 border focus:outline-neutral-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
            type="text"
            placeholder="개발 직군을 입력하세요"
            value={
              career.job === "개발자" && !career.isWeb ? career.position : ""
            }
            onChange={(e) =>
              setCareer((prevCareer) => ({
                ...prevCareer,
                position: e.target.value,
              }))
            }
          />
        </div>
      )}

      {career.job === "개발자" && career.isWeb && (
        <div className="items-center mt-4 mb-4">
          <ReactSelect
            key={resetCount}
            options={positionOptions}
            styles={customStyles}
            onChange={(selectedOption) => {
              setCareer({ ...career, position: selectedOption.value });
            }}
            value={positionOptions.find(
              (option) => option.value === career.position
            )}
            placeholder="Choose a position"
            isSearchable={true}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral0: "transparent",
              },
            })}
          />
        </div>
      )}

      {career.job === "개발자" && (
        <div className="items-center mb-4">
          <ReactSelect
            key={resetCount}
            options={skillStackOptions}
            styles={customStyles}
            onChange={handleSelectChange}
            placeholder="기술 스택 선택"
            isMulti
            closeMenuOnSelect={false}
            name="tech_stack"
            isSearchable={true}
            value={career.tech_stack.map((skill) =>
              skillStackOptions.find((option) => option.value === skill)
            )}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                neutral0: "transparent",
              },
            })}
          />
        </div>
      )}
    </>
  );
};

const jobOptions = [
  { value: "", label: "직업 유형 선택" },
  { value: "개발자", label: "개발자" },
  { value: "비개발자", label: "비개발자" },
];

const yearlyOptions = [
  { value: "", label: "경력 선택" },
  { value: "신입 - 1년 미만", label: "신입 - 1년 미만" },
  { value: "경력 - 1년 이상", label: "경력 - 1년 이상" },
  { value: "경력 - 5년 이상", label: "경력 - 5년 이상" },
];

const developmentTypeOptions = [
  { value: "web", label: "웹 개발자" },
  { value: "noWeb", label: "웹 이외 개발자" },
];

const positionOptions = [
  { value: "", label: "포지션 선택" },
  { value: "프론트엔드", label: "프론트엔드" },
  { value: "백엔드", label: "백엔드" },
  { value: "풀스택", label: "풀스택" },
];

const skillStackOptions = [
  { value: "HTML/CSS", label: "HTML/CSS" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "React", label: "React" },
  { value: "Vue", label: "Vue" },
  { value: "Angular", label: "Angular" },
  { value: "Svelte", label: "Svelte" },
  { value: "JQuery", label: "JQuery" },
  { value: "NodeJs", label: "NodeJs" },
  { value: "ExpressJs", label: "ExpressJs" },
  { value: "NestJs", label: "NestJs" },
  { value: "NextJS", label: "NextJS" },
  { value: "Remix", label: "Remix" },
  { value: "SvelteKit", label: "SvelteKit" },
  { value: "Python", label: "Python" },
  { value: "Django", label: "Django" },
  { value: "Flask", label: "Flask" },
  { value: "FastApi", label: "FastApi" },
  { value: "Java", label: "Java" },
  { value: "Spring", label: "Spring" },
  { value: "ReactNative", label: "ReactNative" },
  { value: "Fluter", label: "Fluter" },
  { value: "Kotilin", label: "Kotilin" },
  { value: "Swift", label: "Swift" },
  { value: "Docker", label: "Docker" },
  { value: "AWS", label: "AWS" },
  { value: "Firebase", label: "Firebase" },
  { value: "Dart", label: "Dart" },
  { value: "Rust", label: "Rust" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "Git", label: "Git" },
  { value: "GitHub", label: "GitHub" },
  { value: "RestAPI", label: "RestAPI" },
  { value: "GraphQL", label: "GraphQL" },
  { value: "Linux", label: "Linux" },
  { value: "TensorFlow", label: "TensorFlow" },
];

export default AddCareer;
