// 정주현

import styles from "./Network.module.css";
import goldmedal from "/medal/gold.png";
import silvermedal from "/medal/silver.png";
import bronzemedal from "/medal/bronze.png";
import profileDefaultDark from "/profile/profile-dark.png";
import profileDefaultLight from "/profile/profile-light.png";
import { Link } from "react-router-dom";

function NetworkProfile({ name, email, description, profileUrl, profileImg }) {
  return (
    <div className={styles.networkProfileBox}>
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
        src={profileImg ? profileImg : profileDefaultDark}
        alt="profileImg"
        className={styles.profileImg}
      />
      <div>
        <h4>{name}</h4>
        <h5>{email}</h5>
        <p>{description ? description : "자기소개가 없습니다"}</p>
      </div>
      <Link to={`${profileUrl}`} className={styles.linkBtn}>
        Profile
      </Link>
    </div>
  );
}

export default NetworkProfile;
