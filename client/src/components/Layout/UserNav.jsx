// 정주현

import { useState } from "react";
import UserDownMenu from "./UserDownMenu";
import darkModeProfile from "/profile/profile-dark.png";

function UserNav() {
  const [profileView, setProfileView] = useState(false);
  function profileViewHandler() {
    return setProfileView(!profileView);
  }

  console.log(profileView);
  return (
    <div className="h-[40px] w-[40px] mx-[5px] float-right relative top-[50%] -translate-y-1/2">
      <img
        src={darkModeProfile}
        className={`w-[40px] h-[40px] rounded-[10px] invert-[20%] dark:invert-[0%]`}
        onClick={profileViewHandler}
      />
      {profileView && (
        <ul className="relative w-[120px] top-[15px] right-50% translate-x-[-50%] bg-[#d6d6d6]  dark:bg-[rgba(26,26,26,1)] p-2 rounded-[10px]">
          <UserDownMenu />
        </ul>
      )}
    </div>
  );
}

export default UserNav;
