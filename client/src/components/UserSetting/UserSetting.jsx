//담당 : 이승현

import { Link, Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";
import EditUserInfo from "./EditUserInfo";
import ManageFollow from "./ManageFollow";

const UserSetting = () => {
  return (
    <div className="wrapper p-2">
      <header className="border flex flex-row justify-between">
        <p className="border">간단 프로필</p>
        <p className="border">
          <Link to="/">프로필로 돌아가기</Link>
        </p>
      </header>
      <div className="flex flex-row">
        <nav className="border basis-1/6">
          <ul>
            <li>
              <Link className="border block" to="">
                프로필 설정
              </Link>
            </li>
            <li>
              <Link className="border block" to="edit-user-info">
                회원정보 변경
              </Link>
            </li>
            <li>
              <Link className="border block" to="manage-follow">
                팔로우 관리
              </Link>
            </li>
          </ul>
        </nav>
        <main className="wrapper border basis-4/6">
          <Routes>
            <Route path="" element={<EditProfile />} />
            <Route path="edit-user-info" element={<EditUserInfo />} />
            <Route path="manage-follow" element={<ManageFollow />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default UserSetting;
