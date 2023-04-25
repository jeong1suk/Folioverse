import useAxiosHook from "../../CustomHooks";
const host = import.meta.env.VITE_SERVER_HOST;

// 정주현
function SearchResultView({ searchText }) {
  let { data, error, loading } = useAxiosHook(`${host}/dummy/network`);
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
          (el.name.includes(searchText) || el.email.includes(searchText)) && (
            <li key={idx}>
              <img src='https://i.pinimg.com/474x/76/6f/3f/766f3fe1a49605789ccedc6cf1fb6673.jpg' />
              <div>
                {el.name}
                <br></br>({el.email})
              </div>
            </li>
          )
        );
      })}
    </>
  );
}

export default SearchResultView;
