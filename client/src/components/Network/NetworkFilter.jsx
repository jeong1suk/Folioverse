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
            setJuniorDev(false);
            setSeniorDev(false);
            setExperiencedDev(false);
          }}
        >
          비전공자
        </button>
        <button
          className={major ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setNotMajor(false);
            setMajor(!major);
            setJuniorDev(false);
            setSeniorDev(false);
            setExperiencedDev(false);
          }}
        >
          전공자
        </button>
        <button
          className={juniorDev ? styles.btnEnable : styles.btnDisable}
          onClick={() => {
            setJuniorDev(!juniorDev);
            setNotMajor(false);
            setMajor(false);
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
            setNotMajor(false);
            setMajor(false);
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
            setNotMajor(false);
            setMajor(false);
            setJuniorDev(false);
            setSeniorDev(false);
          }}
        >
          경력개발자(N년 이상)
        </button>
      </div>
    </div>
  );
}
export default NetworkFilter;
