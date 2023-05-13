// 정주현
import useModalStore from "../../store/modalStore";
import { Link } from "react-router-dom";
import RedDot from "../Notification/RedDot";

const UserDownMenu = () => {
  const setModal = useModalStore((state) => state.setModal);

  const openMessage = () => {
    setModal("", "messageBox");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mvpStore");
    localStorage.removeItem("themeStore");
    localStorage.removeItem("reactQueryDevtoolsSortFn");
    localStorage.removeItem("reactQueryDevtoolsOpen");
    location.href = "/";
  };

  const liStyle = `relative w-full text-left px-[15px] py-[10px] text-[#3e3e3e] bg-[#d6d6d6] hover:bg-[#bababa] transition-all ease-in duration-75`;

  return (
    <>
      <li className={liStyle}>
        <Link to="/user-setting">회원설정</Link>
      </li>
      <li className={`${liStyle} cursor-point`}>
        {" "}
        {/** nav로 수정 */}
        <Link to="/my-page">마이페이지</Link>
      </li>
      <li className={liStyle}>
        <div className="absolute top-2 right-7">
          <RedDot />
        </div>
        <button className="relative" onClick={openMessage}>
          쪽지함
        </button>
      </li>
      <li>
        <button onClick={logout} className={liStyle}>
          로그아웃
        </button>
      </li>
    </>
  );
};

export default UserDownMenu;
