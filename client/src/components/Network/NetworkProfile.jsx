// 정주현

import styles from "./Network.module.css";
import goldmedal from "/medal/gold.png";
import silvermedal from "/medal/silver.png";
import bronzemedal from "/medal/bronze.png";
import profileDefaultLight from "/profile/profile-light.png";
import { useNavigate } from "react-router-dom";
``;
import useUserStore from "../../store/userStore";

function NetworkProfile({ name, email, description, profileId, profileImg }) {
  const darkMode = "bg-white text-[#212121] dark:bg-[#212121] dark:text-white";

  const navigate = useNavigate();

  const setId = useUserStore((state) => state.setId);
  const id = useUserStore((state) => state.id);

  const handleNav = () => {
    setId(profileId);
    console.log(id);
    navigate(`/user-page`);
  };

  return (
    <div
      className={`${darkMode} relative w-[330px] h-[400px] mt-[30px] m-auto rounded-[5px] ${styles.networkProfileBox} dark:border-[#393939]`}
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
        src={profileImg ? profileImg : profileDefaultLight}
        alt="profileImg"
        className={`${darkMode} w-[180px] h-[180px] absolute -translate-x-2/4 object-cover rounded-[15px] left-2/4 top-5`}
      />
      <div
        className={`w-[250px] absolute bottom-[80px] left-[40px] ${darkMode}`}
      >
        <h4
          className={`overflow-hidden text-ellipsis  w-full whitespace-nowrap text-lg font-bold ${darkMode}`}
        >
          {name}
        </h4>
        <h5
          className={`overflow-hidden text-ellipsis w-full text-[13px] font-normal ${darkMode}`}
        >
          {email}
        </h5>
        <p
          className={`overflow-hidden text-ellipsis inline-block w-full h-[35px] text-[15px] mt-2.5 ${darkMode}`}
        >
          {description ? description : "자기소개가 없습니다"}
        </p>
      </div>
      <button
        className={`absolute -translate-x-2/4 bg-[#69b1ff] text-white dark:bg-[#3e668c] dark:text-[#ebebeb] px-[15px] py-2 rounded-[5px] border-[none]
        left-2/4 top-[340px] hover:bg-[#5581ab] hover:text-[#ebebeb] dark:hover:bg-[#2c4e6e] dark:hover:text-white transition ease-in-out duration-[0.3s]`}
        onClick={handleNav}
      >
        프로필
      </button>
    </div>
  );
}

export default NetworkProfile;
