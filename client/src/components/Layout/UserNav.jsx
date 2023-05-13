// 정주현

import { useRef, useState } from "react";
import UserDownMenu from "./UserDownMenu";
import darkModeProfile from "/profile/profile-dark.png";
import lightModeProfile from "/profile/profile-light.png";
import { useQueryGet } from "../../utils/useQuery";
import useThemeStore from "../../store/themeStore";
import useOnClickOutside from "./useOnClickOutside";
import RedDot from "../Notification/RedDot";

const UserNav = () => {
  const ref = useRef();
  useOnClickOutside(ref, () => setProfileView(false));
  const [profileView, setProfileView] = useState(false);
  const isDarkMode = useThemeStore((state) => state.theme);
  const profileDefault = isDarkMode ? lightModeProfile : darkModeProfile;
  const isToken = localStorage.getItem("token");

  const data = useQueryGet("/user/current", "getMyInfo");
  const profileImg = data.data?.profile_image;

  const profileViewHandler = () => {
    return setProfileView(!profileView);
  };

  const { data: myInfoQuery } = useQueryGet("/user/current", "getMyInfo", {
    enabled: !!isToken,
  });

  return (
    <div
      ref={ref}
      className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]  mx-[5px] float-right relative top-[50%] -translate-y-1/2 cursor-pointer"
    >
      <RedDot />
      <img
        src={profileImg ? profileImg : profileDefault}
        className={`w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]  rounded-[10px]`}
        onClick={profileViewHandler}
      />
      {profileView && (
        <ul className="relative w-[120px] top-[15px] right-50% translate-x-[-50%] bg-[#d6d6d6] p-2 rounded-[10px]">
          <UserDownMenu />
        </ul>
      )}
    </div>
  );
};

export default UserNav;
