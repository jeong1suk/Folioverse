// 정주현

import { useEffect, useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import styles from "./Network.module.css";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
const host = import.meta.env.VITE_SERVER_HOST;

function Network() {
  const { data, error, loading } = useAxiosGet(`${host}/dummy/network`);
  const [listCur, setListCur] = useState(30);
  const [sortBy, setSortBy] = useState("");

  // data가 불러와지지 않았을 때
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // visibleData변수에 data에서 listCur만큼 slice한 값을 추가
  const visibleData = data.slice(0, listCur);

  return (
    <>
      <div className={styles.networkCenterFrame}>
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />{" "}
        {/* filter 구현 필요 */}
        <div className={styles.networkContainer}>
          {visibleData.map((user, idx) => (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              profileUrl={`/user-page/${user._id}`}
              profileImg={user.profile_image}
              key={idx}
            />
          ))}
        </div>
        {visibleData.length < data.length && (
          <button
            className={styles.moreData}
            onClick={() => {
              setListCur(listCur + 30);
            }}
          >
            More
          </button>
        )}
      </div>
    </>
  );
}

export default Network;
