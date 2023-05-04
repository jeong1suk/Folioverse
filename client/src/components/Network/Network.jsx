// 정주현

import { useEffect, useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
const host = import.meta.env.VITE_SERVER_HOST;

const Network = () => {
  const { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const [listCur, setListCur] = useState(30);
  const [sortBy, setSortBy] = useState([]);

  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";
  // data가 불러와지지 않았을 때
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // visibleData변수에 data에서 listCur만큼 slice한 값을 추가
  const visibleData = data.slice(0, listCur);

  const sortByFilter = (userData) => {
    let filterdData = [];
    userData.forEach((d) => {
      if (
        sortBy.length === 0 ||
        sortBy.some(
          (s) =>
            d.career?.yearly?.includes(s) ||
            d.career?.job?.includes(s) ||
            d.career?.position?.includes(s)
        )
      ) {
        filterdData.push(d);
      }
    });
    return filterdData;
  };

  const filteredUserData = sortByFilter(data);

  return (
    <div className={`${bgColor} min-w-screen min-h-screen`}>
      <div
        className={`${bgColor} grid grid-rows-[repeat(3)] gap-5 w-full relative m-0 p-0`}
      >
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />
        <div className={`grid grid-cols-[400px_400px_400px] mb-10 m-auto`}>
          {filteredUserData.length > 0
            ? filteredUserData.map((user, idx) => {
                return (
                  <NetworkProfile
                    name={user.name}
                    email={user.email}
                    description={user.description}
                    profileId={`${user._id}`}
                    profileImg={user.profile_image}
                    key={idx}
                  />
                );
              })
            : visibleData.map((user, idx) => {
                return (
                  <NetworkProfile
                    name={user.name}
                    email={user.email}
                    description={user.description}
                    profileId={`${user._id}`}
                    profileImg={user.profile_image}
                    key={idx}
                  />
                );
              })}
        </div>
        {visibleData.length < data.length && (
          <button
            className={`${bgColor} ${fontColorC} text-center font-light text-xl p-[5px]`}
            onClick={() => {
              setListCur(listCur + 30);
            }}
          >
            More
          </button>
        )}
      </div>
    </div>
  );
};

export default Network;
