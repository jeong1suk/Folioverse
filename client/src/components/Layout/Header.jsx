// 정주현

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logoImgDark from "/logo/logo-dark.png";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";

/** 테스트용 프로필 이미지 */

const Header = () => {
  /** 로그인/로그아웃 상태 테스트용 변수 */
  const isLoginTest = false;

  return (
    <header>
      <nav>
        <h1>
          <img src={logoImgDark} alt="logo" className={styles.logo} />
        </h1>
        <ul className={styles.navLeft}>
          {isLoginTest && (
            <li>
              <Link to={`/mypage`}>마이페이지</Link>
            </li>
          )}
          <li>
            <Link to="/network">네트워크</Link>
          </li>
        </ul>
        {isLoginTest ? <UserNav /> : <GuestNav />}
      </nav>
    </header>
  );
};

export default Header;
