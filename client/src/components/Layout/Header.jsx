import { useState } from "react";
// 정주현

import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logoImgDark from "/logo/logo-dark.png";
import UserNav from "./UserNav";
import GuestNav from "./GuestNav";
import { useEffect } from "react";

/** 테스트용 프로필 이미지 */

const Header = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  /** 로그인/로그아웃 상태 테스트용 변수 */
  const [isLogin, setIsLogin] = useState(false);

  return (
    <header>
      <nav>
        <h1>
          <Link to="/">
            <img src={logoImgDark} alt="logo" className={styles.logo} />
          </Link>
        </h1>
        <ul className={styles.navLeft}>
          {isLogin && (
            <li>
              <Link to={`/my-page`}>마이페이지</Link>
            </li>
          )}
          <li>
            <Link to="/network">네트워크</Link>
          </li>
        </ul>
        {isLogin ? <UserNav /> : <GuestNav />}
      </nav>
    </header>
  );
};

export default Header;
