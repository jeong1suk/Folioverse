// 정주현

import styles from "./Header.module.css";
import darkModeImg from "/dark-mode.png";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";

function GuestNav() {
  return (
    <ul className={styles.navRight}>
      <SearchInput login={false} />
      <li>
        <img
          src={darkModeImg}
          alt="darkModeImg"
          className={styles.darkModeImg}
        ></img>
      </li>
      <li>
        <Link to={"/register"}>회원가입</Link>
      </li>
      <li>
        <Link to={"/login"}>로그인</Link>
      </li>
    </ul>
  );
}

export default GuestNav;
