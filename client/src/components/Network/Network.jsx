// 정주현
import { useEffect, useState } from "react";
import LoadingOverLay from "../LoadingOverLay";
import { useAxiosGet } from "../../CustomHooks";
import NetworkProfile from "./NetworkProfile";
import NetworkFilter from "./NetworkFilter";
const host = import.meta.env.VITE_SERVER_HOST;
import { useQueryGet } from "./../../utils/useQuery";

const Network = () => {
  // const { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const { data, isLoading } = useQueryGet(`/user/list`, "getAllUsers");
  const [listCur, setListCur] = useState(30);
  const [filteredUser, setFilteredUser] = useState([]);
  const [sortBy, setSortBy] = useState({
    job: [],
    yearly: [],
    position: [],
    techStack: [],
  });
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";

  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    const users = data.slice(0, listCur);
    setVisibleData(users);
  }, [data, listCur]);

  // // visibleData변수에 data에서 listCur만큼 slice한 값을 추가
  // const visibleData =
  //   filteredUser.length > 0
  //     ? filteredUser.slice(0, listCur)
  //     : data.slice(0, listCur);

  useEffect(() => {
    const usersJob = data?.filter((user) =>
      sortBy.job.includes(user?.career?.job)
    );

    const usersYearly = data?.filter((user) =>
      sortBy.yearly.includes(user?.career?.yearly)
    );

    const usersPosition = data?.filter((user) =>
      sortBy.position.includes(user?.career?.position)
    );

    //user?.career?.techStack

    const usersTechStack = data?.filter((user) => {
      return sortBy.techStack.every((tech) =>
        user?.career?.tech_stack.includes(tech)
      );
    });

    setFilteredUser([usersJob, usersYearly, usersPosition, usersTechStack]);
    // setFilteredUser(
    //   data?.filter((user) => {
    //     if (sortBy.job.includes(user.career?.job)) {
    //       return user;
    //     }
    //   })
    // );
  }, [sortBy, data]);

  useEffect(() => {
    console.log(filteredUser);
  }, [filteredUser]);

  return (
    <div className={`${bgColor} w-[fit-content] md:w-screen min-h-screen`}>
      <div
        className={`${bgColor} grid grid-rows-[repeat(3)] gap-5 relative m-0 p-0`}
      >
        <NetworkFilter sortBy={sortBy} setSortBy={setSortBy} />
        <div
          className={`grid grid-cols-[400px] sm:grid-cols-[330px_330px] md:grid-cols-[400px_400px] lg:grid-cols-[350px_350px_350px] xl:grid-cols-[400px_400px_400px] mb-10 m-auto`}
        >
          {visibleData?.map((user, idx) => {
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
