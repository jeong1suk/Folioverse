// 정주현

import { useEffect, useState } from "react";
import styles from "./Network.module.css";

function NetworkFilter({ sortBy, setSortBy }) {
  const [notMajor, setNotMajor] = useState(false);
  const [major, setMajor] = useState(false);
  const [juniorDev, setJuniorDev] = useState(false);
  const [seniorDev, setSeniorDev] = useState(false);
  const [experiencedDev, setExperiencedDev] = useState(false);

  useEffect(() => {
    let sort = "";
    if (notMajor) sort = "notMajor ";
    if (major) sort = "major ";
    if (juniorDev) sort = "juniorDev ";
    if (seniorDev) sort = "seniorDev ";
    if (experiencedDev) sort = "experiencedDev ";
    setSortBy(sort);
  }, [notMajor, major, juniorDev, seniorDev, experiencedDev]);

  const btnDisabled = `bg-transparent font-light text-sm text-black m-[3px] px-3.5 py-[3px] rounded-[20px] ${styles.disabledFilterBorder} dark:text-[#b5b5b5]`;
  const btnEnabled = `bg-[#737070] font-light text-sm text-white m-[3px] px-3.5 py-[3px] rounded-[20px] ${styles.enabledFilterBorder} dark:text-[#b5b5b5] dark:bg-[rgba(26,26,26,1)]`;
  return (
    <div
      className={`w-[1150px] h-auto mt-2.5 m-auto p-2.5 rounded-[5px] bg-transparent text-black dark:text-white`}
    >
      <h2 className="ml-[10px]">필터</h2>
      <div className={`mt-[5px]`}>
        <button
          className={notMajor ? btnEnabled : btnDisabled}
          onClick={() => {
            setNotMajor(!notMajor);
            setMajor(false);
          }}
        >
          비전공자
        </button>
        <button
          className={major ? btnEnabled : btnDisabled}
          onClick={() => {
            setNotMajor(false);
            setMajor(!major);
          }}
        >
          전공자
        </button>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <button
          className={juniorDev ? btnEnabled : btnDisabled}
          onClick={() => {
            setJuniorDev(!juniorDev);
            setSeniorDev(false);
            setExperiencedDev(false);
          }}
        >
          신입개발자
        </button>
        <button
          className={seniorDev ? btnEnabled : btnDisabled}
          onClick={() => {
            setSeniorDev(!seniorDev);
            setJuniorDev(false);
            setExperiencedDev(false);
          }}
        >
          경력개발자
        </button>
        <button
          className={experiencedDev ? btnEnabled : btnDisabled}
          onClick={() => {
            setExperiencedDev(!experiencedDev);
            setJuniorDev(false);
            setSeniorDev(false);
          }}
        >
          숙련개발자(8년 이상)
        </button>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>기술스택 : </span>
        <button className={btnDisabled}>드롭다운메뉴 여기추가</button>
        <br></br>
        {/* 예시코드(삭제예정) */}
        <button
          className={`bg-[#878787] text-xs px-[5px] py-0.5 rounded-[3px] text-white dark:bg-[#3e3e3e]`}
        >
          Javascript&nbsp;&nbsp;x
        </button>
        {/* 예시코드(삭제예정) */}
      </div>
    </div>
  );
}
export default NetworkFilter;
