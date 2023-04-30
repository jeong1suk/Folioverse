// 정주현
import { Link } from "react-router-dom";

function UserDownMenu() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  }
  const liStyle =
    "px-[15px] py-[10px] text-[#000] dark:text-[#fff] bg-[#d6d6d6] dark:bg-[rgba(26,26,26,1)]";
  return (
    <>
      <li className={liStyle}>
        <Link to="/user-setting">회원설정</Link>
      </li>
      <li className={liStyle}>
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li onClick={logout} className={liStyle}>
        로그아웃
      </li>
    </>
  );
}

export default UserDownMenu;
