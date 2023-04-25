// 정주현
import { useState } from "react";
import "./Header.css";
import DropDownMenu from "./DropDownMenu";

/** 테스트용 프로필 이미지 */
const imgUrl =
  "https://images.squarespace-cdn.com/content/v1/57e1b37cd2b85735aafd5bd3/1573143174824-XVHHHWMM27EOUYEK8ZXQ/CoppersCatCommune-ProfileImg-Lg.jpg";

const Header = () => {
  const [profileView, setProfileView] = useState(false);

  /** 로그인/로그아웃 상태 테스트용 변수 */
  const isLoginTest = true;

  function profileViewHandler() {
    return setProfileView(!profileView);
  }

  return (
    <header>
      <nav>
        <h1>Folioverse</h1>
        <ul className='nav-left'>
          {isLoginTest && <li>마이페이지</li>}
          <li>네트워크</li>
        </ul>
        {isLoginTest ? (
          <ul
            className={
              profileView
                ? "nav-right-login nav-right-login-menuView"
                : "nav-right-login"
            }
            onClick={profileViewHandler}
          >
            <li>
              <img src={imgUrl} />
              <span>{!profileView ? "⌄" : "⌃"}</span>
            </li>
            {profileView && <DropDownMenu />}
          </ul>
        ) : (
          <ul className='nav-right'>
            <li>회원가입</li>
            <li>로그인</li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
