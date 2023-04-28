// 정주현
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function UserDownMenu() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  }
  return (
    <ul className={styles.profileDownMenu}>
      <li>
        <Link to="/user-setting">회원설정</Link>
      </li>
      <li>
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li onClick={logout}>로그아웃</li>
    </ul>
  );
}

export default UserDownMenu;
