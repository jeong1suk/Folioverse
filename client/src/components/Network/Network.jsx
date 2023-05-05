// 정주현
import { useEffect, useState } from "react";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
import { useQueryGet } from "./../../utils/useQuery";

const Network = () => {
  const { data, isLoading } = useQueryGet(`/user/list`, "getAllUsers");
  const [listCur, setListCur] = useState(30);
  const [filteredUser, setFilteredUser] = useState([]);
  const [curPage, setCurPage] = useState(0);
  const [sortBy, setSortBy] = useState({
    job: [],
    yearly: [],
    position: [],
    techStack: [],
  });
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";
  const [visibleData, setVisibleData] = useState([]);
  const page = Math.floor(visibleData?.length / 30) + 1;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getIntersection = (arr1, arr2, arr3, arr4) => {
    const nonEmptyArrays = [arr1, arr2, arr3, arr4].filter(
      (arr) => arr && arr.length > 0
    );

    if (nonEmptyArrays.length === 1) {
      return nonEmptyArrays[0];
    }

    const intersection = nonEmptyArrays.reduce((acc, arr) => {
      return acc.filter((user) => arr.some((u) => u._id === user._id));
    }, nonEmptyArrays[0]);

    return intersection;
  };

  useEffect(() => {
    const users = data.slice(0, listCur);
    const intersection = getIntersection(
      filteredUser[0],
      filteredUser[1],
      filteredUser[2],
      filteredUser[3]
    );
    if (
      filteredUser[0]?.length > 0 ||
      filteredUser[1]?.length > 0 ||
      filteredUser[3]?.length > 0 ||
      filteredUser[4]?.length < data?.length
    ) {
      ``;
      setVisibleData(intersection?.slice(0, listCur));
    } else {
      setVisibleData(users);
    }
  }, [data, listCur]);

  useEffect(() => {
    const usersJob = data?.filter(
      (user) =>
        sortBy.job.includes(user?.career?.job) ||
        (sortBy.job.includes("비개발자") && user.career?.job !== "개발자")
    );

    const usersYearly = data?.filter((user) =>
      sortBy.yearly.includes(user?.career?.yearly)
    );

    const usersPosition = data?.filter((user) =>
      sortBy.position.includes(user?.career?.position)
    );

    const usersTechStack = data?.filter((user) => {
      return sortBy.techStack.every((tech) =>
        user?.career?.tech_stack.includes(tech)
      );
    });

    setFilteredUser([usersJob, usersYearly, usersPosition, usersTechStack]);
  }, [sortBy, data]);

  useEffect(() => {
    const intersection = getIntersection(
      filteredUser[0],
      filteredUser[1],
      filteredUser[2],
      filteredUser[3]
    );
    setVisibleData(intersection?.slice(0, listCur));
  }, [filteredUser]);
  return (
    <div className={`${bgColor} w-[fit-content] md:w-full min-h-screen`}>
      <div
        className={`${bgColor} grid grid-rows-[repeat(3)] gap-5 relative m-0 p-0`}
      >
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />
        <div
          className={`grid grid-cols-[400px] sm:grid-cols-[330px_330px] md:grid-cols-[400px_400px] lg:grid-cols-[350px_350px_350px] xl:grid-cols-[400px_400px_400px] mb-10 m-auto`}
        >
          {visibleData?.slice(0, listCur).map((user, idx) => {
            return (
              <NetworkProfile
                name={user.name}
                email={user.email}
                description={user.description}
                profileId={`${user._id}`}
                profileImg={user.profile_image}
                follower={user.follower_user.length}
                like={user.like_user.length}
                key={idx}
              />
            );
          })}
        </div>
        {visibleData?.length >= 30 && curPage < data?.length / 30 - 1 && (
          <button
            className={`${bgColor} ${fontColorC} w-full text-center font-light text-xl p-[5px] pb-[20px]`}
            onClick={() => {
              setListCur(listCur + 30);
              setCurPage(curPage + 1);
            }}
          >
            More
          </button>
        )}
      </div>
      <div onClick={handleScrollToTop} className="fixed bottom-6 right-6">
        <div className="w-[45px] h-[45px] rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 ">
          <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white text-[15px] font-bold cursor-pointer">
            TOP
          </span>
        </div>
      </div>
    </div>
  );
};

export default Network;
