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

  return (
    <div className={styles.filterContainer}>
      <h2>필터</h2>
      <div className={styles.filterList}>
        <button
          className={notMajor ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setNotMajor(!notMajor);
            setMajor(false);
          }}
        >
          비전공자
        </button>
        <button
          className={major ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setNotMajor(false);
            setMajor(!major);
          }}
        >
          전공자
        </button>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <button
          className={juniorDev ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setJuniorDev(!juniorDev);
            setSeniorDev(false);
            setExperiencedDev(false);
          }}
        >
          신입개발자
        </button>
        <button
          className={seniorDev ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setSeniorDev(!seniorDev);
            setJuniorDev(false);
            setExperiencedDev(false);
          }}
        >
          경력개발자
        </button>
        <button
          className={experiencedDev ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setExperiencedDev(!experiencedDev);
            setJuniorDev(false);
            setSeniorDev(false);
          }}
        >
          숙련개발자(8년 이상)
        </button>
        &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>기술스택 : </span>
        <button className={styles.btnDisable}>드롭다운메뉴 여기추가</button>
        <br></br>
        {/* 예시코드(삭제예정) */}
        <button className={styles.selectedStack}>
          Javascript&nbsp;&nbsp;x
        </button>
        {/* 예시코드(삭제예정) */}
      </div>
    </div>
  );
}
export default NetworkFilter;
