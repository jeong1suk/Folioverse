// 정주현

import styles from "./Network.module.css";
import goldmedal from "/medal/gold.png";
import silvermedal from "/medal/silver.png";
import bronzemedal from "/medal/bronze.png";
import darkModeProfile from "/profile/profile-dark.png";
import lightModeProfile from "/profile/profile-light.png";
import { Link } from "react-router-dom";
import useThemeStore from "../../store/themeStore";

const NetworkProfile = ({
  name,
  email,
  description,
  profileId,
  profileImg,
}) => {
  const boxColor = "bg-[#d8d8d8] dark:bg-[#333333]";
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";
  const fontColorB = "text-[#4f4f4f] dark:text-[#a4a4a4]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";
  const darkMode = `${boxColor}`;

  const isDarkMode = useThemeStore((state) => state.theme);
  const profileDefault = isDarkMode ? darkModeProfile : lightModeProfile;

  return (
    <div
      className={`${darkMode} relative sm:grid-cols-[400px] w-[300px] md:w-[330px] h-[400px] mt-[30px] m-auto rounded-3xl ${styles.networkProfileBox}`}
    >
      <img src={goldmedal} alt="gold medal" className={styles.medalGold} />
      <img
        src={silvermedal}
        alt="silver medal"
        className={styles.medalSilver}
      />
      <img
        src={bronzemedal}
        alt="bronze medal"
        className={styles.medalBronze}
      />
      <img
        src={profileImg ? profileImg : profileDefault}
        alt="profileImg"
        className={`${darkMode} w-[180px] h-[180px] absolute -translate-x-2/4 object-cover rounded-full left-2/4 top-5`}
      />
      <div
        className={`w-[250px] absolute bottom-[80px] left-[40px] ${darkMode}`}
      >
        <h4
          className={`overflow-hidden text-ellipsis  w-full whitespace-nowrap text-lg font-bold ${darkMode} ${fontColorA}`}
        >
          {name}
        </h4>
        <h5
          className={`overflow-hidden text-ellipsis w-full text-[15px] font-normal ${darkMode} ${fontColorC}`}
        >
          {email}
        </h5>
        <p
          className={`overflow-hidden text-ellipsis inline-block w-full h-[45px] word-break text-[15px] mt-2.5 ${darkMode} ${fontColorB}`}
        >
          {description ? description : "자기소개가 없습니다"}
        </p>
      </div>
      <Link
        className={`absolute -translate-x-2/4 bg-[#69b1ff] text-white dark:bg-[#407bb3] dark:text-[#d4d4d4] px-[15px] py-2 rounded-xl border-[none]
        left-2/4 top-[340px] hover:bg-[#5581ab] hover:text-[#ebebeb] dark:hover:bg-[#2c4e6e] dark:hover:text-white transition ease-in-out duration-[0.3s]`}
        to={`/user-page/${profileId}`}
      >
        프로필
      </Link>
    </div>
  );
};

export default NetworkProfile;
