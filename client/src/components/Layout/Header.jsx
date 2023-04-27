// 정주현

import { useState } from "react";
import styles from "./Header.module.css";
import DropDownMenu from "./DropDownMenu";
import SearchResultView from "./SearchResultView";

/** 테스트용 프로필 이미지 */
const imgUrl =
  "https://images.squarespace-cdn.com/content/v1/57e1b37cd2b85735aafd5bd3/1573143174824-XVHHHWMM27EOUYEK8ZXQ/CoppersCatCommune-ProfileImg-Lg.jpg";

const Header = () => {
  const [profileView, setProfileView] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [textFocus, setTextFocus] = useState(false);

  /** 로그인/로그아웃 상태 테스트용 변수 */
  const isLoginTest = false;

  function profileViewHandler() {
    return setProfileView(!profileView);
  }

  return (
    <header>
      <nav>
        <h1>Folioverse</h1>
        <ul className={styles.navLeft}>
          {isLoginTest && <li>마이페이지</li>}
          <li>네트워크</li>
        </ul>
        {isLoginTest ? (
          <ul
            className={
              profileView
                ? `${styles.navRightLogin} ${styles.navRightLoginMenuView}`
                : `${styles.navRightLogin}`
            }
            onClick={profileViewHandler}
          >
            <li onBlur={profileViewHandler}>
              <img src={imgUrl} alt="profileImg" />
              <span>{!profileView ? "⌄" : "⌃"}</span>
            </li>
            {profileView && <DropDownMenu />}
          </ul>
        ) : (
          <ul className={styles.navRight}>
            <li>회원가입</li>
            <li>로그인</li>
          </ul>
        )}
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onFocus={() => {
              setTextFocus(true);
            }}
            onBlur={() => {
              setTextFocus(false);
            }}
          />
          <ul className={styles.navSearch}>
            {searchText && textFocus && (
              <SearchResultView searchText={searchText} />
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
