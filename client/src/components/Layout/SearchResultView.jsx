// 정주현

import { Link } from "react-router-dom";
import { useAxiosGet } from "../../CustomHooks";
import profileDefaultDark from "/profile/profile-dark.png";
import profileDefaultLight from "/profile/profile-light.png";
import useThemeStore from "../../store/themeStore.js";
const host = import.meta.env.VITE_SERVER_HOST;

const SearchResultView = ({ inputValue }) => {
  const isDarkMode = useThemeStore((state) => state.theme);
  const defaultProfile = isDarkMode ? profileDefaultLight : profileDefaultDark;

  let { data, error, loading } = useAxiosGet(`${host}/user/list`);

  const liStyle = `text-[#3e3e3e] bg-[#d6d6d6] dark:text-[#fff] dark:bg-[#3e3e3e] hover:bg-[#bababa] dark:hover:bg-[#575757] cursor-pointer`;

  if (loading) {
    return <li className={`${liStyle} text-center`}>Loading...</li>;
  }

  if (error) {
    return <li className={`${liStyle} text-center`}>Error!</li>;
  }

  if (!data) {
    return <li className={`${liStyle} text-center`}>데이터 응답실패!</li>;
  }

  const listHandler = (data) => {
    const filteredData = data.filter(
      (el) =>
        (el.name || "").toUpperCase().includes(inputValue.toUpperCase()) ||
        (el.email || "").toUpperCase().includes(inputValue.toUpperCase())
    );
    return filteredData.length > 0 ? (
      filteredData.map((el, idx) => (
        <li
          key={idx}
          className={`w-[300px] overflow-hidden px-5 py-[15px] m-auto ${liStyle}`}
        >
          <Link to={`/user-page/${el._id}`} className="top-[50%] block">
            <img
              src={el.profile_image || defaultProfile}
              alt="profile"
              className="w-[40px] h-[40px] ml-1 object-cover rounded-[5px] inline-block relative top-[50%] translate-y-[-50%] "
            />
            <div className="w-[190px] overflow-hidden inline-block ml-5 relative top-[50%]">
              <h4>{el.name}</h4>
              <h5>{el.email}</h5>
            </div>
          </Link>
        </li>
      ))
    ) : (
      <li className={`${liStyle} text-center`}>결과가 없습니다.</li>
    );
  };

  return <>{data && listHandler(data)}</>;
};

export default SearchResultView;
