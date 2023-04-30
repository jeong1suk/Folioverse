// 정주현

import { Link } from "react-router-dom";
import { useAxiosGet } from "../../CustomHooks";
import profileDefaultDark from "/profile/profile-dark.png";
const host = import.meta.env.VITE_SERVER_HOST;

function SearchResultView({ inputValue }) {
  let { data, error, loading } = useAxiosGet(`${host}/dummy/network`);

  const liStyle =
    "text-[#000] dark:text-[white] bg-[#d6d6d6] dark:bg-[rgba(26,26,26,1)] text-center";

  if (loading) {
    return <li className={liStyle}>Loading...</li>;
  }

  if (error) {
    return <li className={liStyle}>Error!</li>;
  }

  if (!data) {
    return <li className={liStyle}>데이터 응답실패!</li>;
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
          className="w-[300px] overflow-hidden bg-[#d6d6d6] dark:bg-[rgba(26,26,26,1)] px-5 py-[15px] opacity-80 m-auto text-[#000] dark:text-[#fff]"
        >
          <Link to={`/user-page/${el._id}`} className="top-[50%] block">
            <img
              src={el.profile_image || profileDefaultDark}
              alt="profile"
              className="w-[40px] h-[40px] ml-1 rounded-[5px] inline-block relative top-[50%] translate-y-[-50%] "
            />
            <div className="w-[190px] overflow-hidden inline-block ml-5 relative top-[50%]">
              <h4>{el.name}</h4>
              <h5>{el.email}</h5>
            </div>
          </Link>
        </li>
      ))
    ) : (
      <li className={liStyle}>결과가 없습니다.</li>
    );
  }

  return <>{data && listHandler(data)}</>;
}

export default SearchResultView;
