// 정주현

import { Link } from "react-router-dom";
import { useAxiosGet } from "../../CustomHooks";
import profileDefaultDark from "/profile/profile-dark.png";
const host = import.meta.env.VITE_SERVER_HOST;

function SearchResultView({ inputValue }) {
  let { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";

  const liStyle = `${fontColorA} bg-[#d6d6d6] dark:bg-[rgba(26,26,26,1)]`;

  if (loading) {
    return <li className={`${liStyle} text-center`}>Loading...</li>;
  }

  if (error) {
    return <li className={`${liStyle} text-center`}>Error!</li>;
  }

  if (!data) {
    return <li className={`${liStyle} text-center`}>데이터 응답실패!</li>;
  }

  function listHandler(data) {
    const filteredData = data.filter(
      (el) =>
        (el.name || "").toUpperCase().includes(inputValue.toUpperCase()) ||
        (el.email || "").toUpperCase().includes(inputValue.toUpperCase())
    );
    return filteredData.length > 0 ? (
      filteredData.map((el, idx) => (
        <li
          key={idx}
          className={`w-[300px] overflow-hidden px-5 py-[15px] opacity-80 m-auto ${liStyle}`}
        >
          <Link to={`/user-page/${el._id}`} className="top-[50%] block">
            <img
              src={el.profile_image || profileDefaultDark}
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
  }

  return <>{data && listHandler(data)}</>;
}

export default SearchResultView;
