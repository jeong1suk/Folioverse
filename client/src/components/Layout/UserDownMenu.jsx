// 정주현
import useModalStore from "../../store/modalStore";
import { Link } from "react-router-dom";

const UserDownMenu = () => {
  const setModal = useModalStore((state) => state.setModal);

  const logout = () => {
    localStorage.removeItem("token");
    location.href = "/";
  };

  const liStyle = `px-[15px] py-[10px] text-[#3e3e3e] bg-[#d6d6d6]`;
  return (
    <>
      <li className={liStyle}>
        <Link to="/user-setting">회원설정</Link>
      </li>
      <li className={liStyle}>
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li className={liStyle}>
        <button onClick={() => setModal("", "messageBox")}>쪽지함</button>
      </li>
      <li onClick={logout} className={liStyle}>
        로그아웃
      </li>
    </>
  );
};

export default UserDownMenu;
