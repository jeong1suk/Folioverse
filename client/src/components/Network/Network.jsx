// 정주현

import { useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
const host = import.meta.env.VITE_SERVER_HOST;

const Network = () => {
  const { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const [listCur, setListCur] = useState(30);
  const [sortBy, setSortBy] = useState({
    job: "",
    yearly: "",
    position: "",
    techStack: "",
  });
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";

  // data가 불러와지지 않았을 때
  if (loading)
    return (
      <div
        className={`min-h-screen min-w-screen ${bgColor} ${fontColorC} text-center`}
      >
        Loading...
      </div>
    );
  if (error)
    return (
      <div
        className={`min-h-screen min-w-screen ${bgColor} ${fontColorC} text-center`}
      >
        Error: {error.message}
      </div>
    );

  // Filter << 진짜 모르겠음..
  let filteredUser = data.filter((user) => {
    return user;
  });

  // visibleData변수에 data에서 listCur만큼 slice한 값을 추가
  const visibleData =
    filteredUser.length > 0
      ? filteredUser.slice(0, listCur)
      : data.slice(0, listCur);

  return (
    <div className={`${bgColor} w-[fit-content] md:w-screen min-h-screen`}>
      <div
        className={`${bgColor} grid grid-rows-[repeat(3)] gap-5 relative m-0 p-0`}
      >
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />
        <div
          className={`grid grid-cols-[400px] sm:grid-cols-[330px_330px] md:grid-cols-[400px_400px] lg:grid-cols-[350px_350px_350px] xl:grid-cols-[400px_400px_400px] mb-10 m-auto`}
        >
          {visibleData.map((user, idx) => {
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
        {(filteredUser.length > 0
          ? visibleData.length < filteredUser.length
          : visibleData.length < data.length) && (
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
