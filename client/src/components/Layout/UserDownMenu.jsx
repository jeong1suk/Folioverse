// 정주현

import styles from "./Header.module.css";

function UserDownMenu() {
  return (
    <ul className={styles.profileDownMenu}>
      <li>회원설정</li>
      <li>마이페이지</li>
      <li>로그아웃</li>
    </ul>
  );
}

export default UserDownMenu;
