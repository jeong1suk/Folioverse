// 정주현
import styles from "./Network.module.css";
import goldmedal from "/medal/gold.png";
import silvermedal from "/medal/silver.png";
import bronzemedal from "/medal/bronze.png";

function NetworkProfile({ name, email, description }) {
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
        src="https://www.ddengle.com/files/attach/images/11334861/457/305/015/836501b8c2508005ec25765ef8268523.jpg"
        alt="profileImg"
        className={styles.profileImg}
      />
      <div>
        <h4>{name}</h4>
        <h5>{email}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default NetworkProfile;
