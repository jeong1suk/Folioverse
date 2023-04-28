// 정주현

import { Link } from "react-router-dom";
import { useAxiosGet } from "../../CustomHooks";
import profileDefaultDark from "/profile/profile-dark.png";
import profileDefaultLight from "/profile/profile-light.png";
const host = import.meta.env.VITE_SERVER_HOST;

function SearchResultView({ searchText, setFocus }) {
  let { data, error, loading } = useAxiosGet(`${host}/dummy/network`);
  if (loading) {
    return (
      <>
        <li>Loading...</li>
      </>
    );
  }

  if (error) {
    return (
      <>
        <li>Error!</li>
      </>
    );
  }
  return (
    <>
      {data.map((el, idx) => {
        return (
          (el.name.toUpperCase().includes(searchText.toUpperCase()) ||
            el.email.toUpperCase().includes(searchText.toUpperCase())) && (
            <li key={idx}>
              <Link to={`/network/profile/${el.id}`}>
                <img src={profileDefaultDark} alt="profile" />
                <div>
                  {el.name}
                  <br></br>({el.email})
                </div>
              </Link>
            </li>
          )
        );
      })}
    </>
  );
}

export default SearchResultView;
