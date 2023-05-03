// 정주현
import { Link } from "react-router-dom";

function UserDownMenu() {
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  }
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";
  const liStyle = `px-[15px] py-[10px] ${fontColorA} bg-[#d6d6d6] dark:bg-[rgba(26,26,26,9)]`;
  return (
    <>
      <li className={liStyle}>
        <Link to="/user-setting">회원설정</Link>
      </li>
      <li className={liStyle}>
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li className={liStyle}>
        <Link to="/">쪽지함</Link>
      </li>
      <li onClick={logout} className={liStyle}>
        로그아웃
      </li>
    </>
  );
}

export default UserDownMenu;
