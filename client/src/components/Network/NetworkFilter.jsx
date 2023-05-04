// 정주현
import { useRef, useState } from "react";
import FilterDropMenu from "./FilterDownMenu";
import useOnClickOutside from "../Layout/useOnClickOutside";
const NetworkFilter = ({ sortBy, setSortBy }) => {
  const [isTechStackFocused, setIsTechStackFocused] = useState(false);
  const ref = useRef();
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const boxColor = "bg-[#d8d8d8] dark:bg-[#333333]";
  const borderColor = "border-solid border-[#9b9b9b] dark:border-[#575757]";
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";
  const filterItemStyle = `text-xs font-light ${fontColorA} ${boxColor} px-[10px] py-[5px] mx-[5px] rounded-[10px]`;
  const btnDisabled = `box-border border bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px]  `;
  const btnEnabled = `bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px] box-border border ${borderColor} ${bgColor} ${fontColorA}`;
  useOnClickOutside(ref, () => setIsTechStackFocused(false));
  const skillStackOptions = [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "JQuery",
    "NodeJs",
    "ExpressJs",
    "NestJs",
    "NextJS",
    "Remix",
    "SvelteKit",
    "Python",
    "Django",
    "Flask",
    "FastApi",
    "Java",
    "Spring",
    "ReactNative",
    "Fluter",
    "Kotilin",
    "Swift",
    "Docker",
    "AWS",
    "Firebase",
    "Dart",
    "Rust",
    "C",
    "C++",
    "C#",
    "Git",
    "GitHub",
    "RestAPI",
    "GraphQL",
    "Linux",
    "TensorFlow",
  ];
  const stackHandleFilter = (e) => {
    if (skillStackOptions.includes(e.target.value)) {
      if (sortBy.techStack.includes(e.target.value)) {
        let arr = [...sortBy.techStack];
        arr.splice(arr.indexOf(e.target.value), 1);
        return setSortBy({ ...sortBy, techStack: arr });
      }
      return setSortBy({
        ...sortBy,
        techStack: [...sortBy.techStack, e.target.value],
      });
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "비개발자" || e.target.value === "개발자") {
      if (sortBy.job === e.target.value) {
        return setSortBy({ ...sortBy, job: "" });
      }
      return setSortBy({ ...sortBy, job: e.target.value });
    }
    if (
      e.target.value === "신입 - 1년 미만" ||
      e.target.value === "경력 - 5년 미만" ||
      e.target.value === "경력 - 5년 이상"
    ) {
      if (sortBy.yearly === e.target.value) {
        return setSortBy({ ...sortBy, yearly: "" });
      }
      return setSortBy({ ...sortBy, yearly: e.target.value });
    }

    if (
      e.target.value === "프론트엔드" ||
      e.target.value === "백엔드" ||
      e.target.value === "풀스택"
    ) {
      if (sortBy.position === e.target.value) {
        return setSortBy({ ...sortBy, position: "" });
      }
      return setSortBy({ ...sortBy, position: e.target.value });
    }
  };
  return (
    <div
      className={`w-[fit-content] h-auto mt-2.5 m-auto p-2.5 rounded-[5px] bg-transparent ${fontColorA}`}
    >
      <h2 className="ml-[10px]">필터</h2>
      <div className={`mt-[5px]`}>
        <button
          className={sortBy.job === "비개발자" ? btnEnabled : btnDisabled}
          value="비개발자"
          onClick={handleFilter}
        >
          비개발자
        </button>
        <button
          className={sortBy.job === "개발자" ? btnEnabled : btnDisabled}
          value="개발자"
          onClick={handleFilter}
        >
          개발자
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <button
          className={
            sortBy.yearly === "신입 - 1년 미만" ? btnEnabled : btnDisabled
          }
          value="신입 - 1년 미만"
          onClick={handleFilter}
        >
          신입 - 1년 미만
        </button>
        <button
          className={
            sortBy.yearly === "경력 - 5년 미만" ? btnEnabled : btnDisabled
          }
          value="경력 - 5년 미만"
          onClick={handleFilter}
        >
          경력 - 5년 미만
        </button>
        <button
          className={
            sortBy.yearly === "경력 - 5년 이상" ? btnEnabled : btnDisabled
          }
          value="경력 - 5년 이상"
          onClick={handleFilter}
        >
          경력 - 5년 이상
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <button
          className={
            sortBy.position === "프론트엔드" ? btnEnabled : btnDisabled
          }
          value="프론트엔드"
          onClick={handleFilter}
        >
          프론트엔드
        </button>
        <button
          className={sortBy.position === "백엔드" ? btnEnabled : btnDisabled}
          value="백엔드"
          onClick={handleFilter}
        >
          백엔드
        </button>
        <button
          className={sortBy.position === "풀스택" ? btnEnabled : btnDisabled}
          value="풀스택"
          onClick={handleFilter}
        >
          풀스택
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <div ref={ref} className="inline-block relative">
          <button
            className={btnDisabled}
            onClick={() => setIsTechStackFocused(!isTechStackFocused)}
          >
            {isTechStackFocused ? "기술스택 △" : "기술스택 ▽"}
          </button>
          {isTechStackFocused && (
            <FilterDropMenu
              sortBy={sortBy}
              setSortBy={setSortBy}
              skillStackOptions={skillStackOptions}
            />
          )}
        </div>
      </div>
      <div className="mt-[10px]">
        {sortBy.techStack.length > 0 &&
          sortBy.techStack.map((item, index) => {
            return (
              <button
                key={index}
                className={filterItemStyle}
                onClick={stackHandleFilter}
                value={item}
              >
                {item}
              </button>
            );
          })}
      </div>
    </div>
  );
};
export default NetworkFilter;
