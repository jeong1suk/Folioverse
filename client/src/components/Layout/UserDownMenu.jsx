// 정주현

import styles from "./Header.module.css";

function UserDownMenu() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  }
  return (
    <ul className={styles.profileDownMenu}>
      <li>회원설정</li>
      <li>마이페이지</li>
      <li onClick={logout}>로그아웃</li>
    </ul>
  );
}

export default UserDownMenu;
