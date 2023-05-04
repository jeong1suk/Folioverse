import { useRef, useState } from "react";
import FilterDropMenu from "./FilterDownMenu";
import useOnClickOutside from "../Layout/useOnClickOutside";
// 정주현

const NetworkFilter = ({ sortBy, setSortBy }) => {
  const [isTechStackFocused, setIsTechStackFocused] = useState(false);
  const [techStackList, setTechStackList] = useState([]);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsTechStackFocused(false));

  const handleFilter = (e) => {
    if (sortBy.includes(e.target.value)) {
      let filterArr = [...sortBy];
      filterArr.splice(filterArr.indexOf(e.target.value), 1);
      return setSortBy(filterArr);
    } else {
      let filterArr = [...sortBy];
      filterArr.push(e.target.value);
      return setSortBy(filterArr);
    }
  };
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const boxColor = "bg-[#d8d8d8] dark:bg-[#333333]";
  const borderColor = "border-solid border-[#9b9b9b] dark:border-[#575757]";
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";

  const filterItemStyle = `text-xs font-light ${fontColorA} ${boxColor} px-[10px] py-[5px] mx-[5px] rounded-[10px]`;
  const btnDisabled = `box-border border bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px]  `;
  const btnEnabled = `bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px] box-border border ${borderColor} ${bgColor} ${fontColorA}`;
  return (
    <div
      className={`w-[1150px] h-auto mt-2.5 m-auto p-2.5 rounded-[5px] bg-transparent ${fontColorA}`}
    >
      <h2 className="ml-[10px]">필터</h2>
      <div className={`mt-[5px]`}>
        <button
          className={sortBy.includes("비개발자") ? btnEnabled : btnDisabled}
          value="비개발자"
          onClick={handleFilter}
        >
          비개발자
        </button>
        <button
          className={sortBy.includes("개발자") ? btnEnabled : btnDisabled}
          value="개발자"
          onClick={handleFilter}
        >
          개발자
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <button
          className={
            sortBy.includes("신입 - 1년 미만") ? btnEnabled : btnDisabled
          }
          value="신입 - 1년 미만"
          onClick={handleFilter}
        >
          신입 - 1년 미만
        </button>
        <button
          className={
            sortBy.includes("경력 - 5년 미만") ? btnEnabled : btnDisabled
          }
          value="경력 - 5년 미만"
          onClick={handleFilter}
        >
          경력 - 5년 미만
        </button>
        <button
          className={
            sortBy.includes("경력 - 5년 이상") ? btnEnabled : btnDisabled
          }
          value="경력 - 5년 이상"
          onClick={handleFilter}
        >
          경력 - 5년 이상
        </button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <button
          className={sortBy.includes("프론트엔드") ? btnEnabled : btnDisabled}
          value="프론트엔드"
          onClick={handleFilter}
        >
          프론트엔드
        </button>
        <button
          className={sortBy.includes("백엔드") ? btnEnabled : btnDisabled}
          value="백엔드"
          onClick={handleFilter}
        >
          백엔드
        </button>
        <button
          className={sortBy.includes("풀스택") ? btnEnabled : btnDisabled}
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
              techStackList={techStackList}
              setTechStackList={setTechStackList}
            />
          )}
        </div>
      </div>
      <div className="mt-[10px]">
        {sortBy.length > 0 &&
          sortBy.map((item, index) => {
            return (
              <button
                key={index}
                className={filterItemStyle}
                onClick={handleFilter}
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
