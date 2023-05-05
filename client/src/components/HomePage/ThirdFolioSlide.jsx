// 정주현

import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useAxiosGet } from "../../CustomHooks";
import fourthImg from "/homepage/3.png";
import profileImgDefault from "/profile/profile-dark.png";
import styles from "./HomePage.module.css";
const host = import.meta.env.VITE_SERVER_HOST;

const ThirdFolioSlide = () => {
  const { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const firstRef = useRef(null);

  // 유저목록을 랜덤하게 배열
  const randomUserProfile = useMemo(() => {
    if (data) {
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      return shuffled;
    }
  }, [data]);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        observer.unobserve(entry.target);
      }
    });
  });

  useEffect(() => {
    observer.observe(firstRef.current);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div
      ref={firstRef}
      className="w-[1200px] h-[600px] relative left-[50%] translate-x-[-50%] opacity-0 transition-opacity duration-500 ease-in-out font-bold text-[50px] text-white"
    >
      <img
        src={fourthImg}
        alt="background img fourth"
        className="absolute top-[-30%] left-[40%] w-[900px] z-0 rotate-[180deg]"
      />
      <h3 className="absolute top-0 left-[50%] w-[800px] translate-x-[-50%] ">
        현재 <span className="text-[#9dcaf5]">Folioverse</span>에 등록된
      </h3>
      <h3 className="absolute top-16 left-[50%] w-[800px] translate-x-[-50%] ">
        <span className="text-[#9dcaf5]">프로필</span>을 확인해보세요.
      </h3>
      <div
        className={`${styles.userList}  overflow-y-hidden absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] w-[900px] h-[320px] px-[25px] mt-[20px] z-10 rounded-[10px]`}
      >
        <ul className="w-[3600px] h-[300px]">
          {randomUserProfile &&
            randomUserProfile.slice(0, 10).map((user, idx) => {
              return (
                <li key={idx} className="inline-block">
                  <div className="relative w-[325px] h-[280px] bg-[#3d3d3d] rounded-[10px] p-[10px] my-[20px] z-10 float-left mr-[20px]">
                    <img
                      src={user?.profile_image || profileImgDefault}
                      alt="profile img"
                      className="w-[100px] h-[100px] rounded-[10px] object-cover m-auto bg-[#9dcaf5] border-[1px] border-[#ccc] mt-[10px]"
                    />
                    <div className="float-left w-[400px] ml-[20px]">
                      <h4 className="text-[20px]">{user?.name}</h4>
                      <h5 className="text-[18px]">{user?.email}</h5>
                      <p className="text-[14px] w-[400px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {user?.description}
                      </p>
                    </div>
                    <Link
                      to={`/user-page/${user?._id}`}
                      className="text-[15px] bg-[#69b1ff] absolute right-[20px] bottom-[20px] p-[10px] rounded-[10px]"
                    >
                      프로필
                    </Link>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ThirdFolioSlide;
