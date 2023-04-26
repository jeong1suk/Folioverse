// 정주현

import goldmedal from "/medal/gold.png";
import silvermedal from "/medal/silver.png";
import bronzemedal from "/medal/bronze.png";

function NetworkProfile({ name, email, description }) {
  return (
    <div className='network-profile-box'>
      <img src={goldmedal} alt='gold medal' className='medal-gold' />
      <img src={silvermedal} alt='silver medal' className='medal-silver' />
      <img src={bronzemedal} alt='bronze medal' className='medal-bronze' />
      <img
        src='https://www.ddengle.com/files/attach/images/11334861/457/305/015/836501b8c2508005ec25765ef8268523.jpg'
        alt='profileImg'
        className='profile-img'
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
