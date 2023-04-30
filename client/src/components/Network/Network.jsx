// 정주현

import { useEffect, useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
const host = import.meta.env.VITE_SERVER_HOST;

function Network() {
  const { data, error, loading } = useAxiosGet(`${host}/dummy/network`);
  const [listCur, setListCur] = useState(30);
  const [sortBy, setSortBy] = useState([]);

  // data가 불러와지지 않았을 때
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // visibleData변수에 data에서 listCur만큼 slice한 값을 추가s
  const visibleData = data.slice(0, listCur);

  return (
    <>
      <div
        className={`bg-white dark:bg-[#212121] grid grid-rows-[repeat(3)] gap-5 w-full h-full relative m-0 p-0`}
      >
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />{" "}
        {/* filter 구현 필요 */}
        <div className={`grid grid-cols-[400px_400px_400px] mb-10 m-auto`}>
          {visibleData.map((user, idx) => (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              profileUrl={`/user-page/?id=${user._id}`}
              profileImg={user.profile_image}
              key={idx}
            />
          ))}
        </div>
        {visibleData.length < data.length && (
          <button
            className={`bg-white dark:bg-[#212121] text-center text-black dark:text-[#7d7c7c] font-light text-xl p-[5px]`}
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
