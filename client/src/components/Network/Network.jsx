// 정주현

import { useEffect, useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
import "./Network.css";
import NetworkProfile from "./NetworkProfile";
const host = import.meta.env.VITE_SERVER_HOST;

function Network() {
  const { data, error, loading } = useAxiosGet(`${host}/dummy/network`);
  const [visibleData, setVisibleData] = useState([]);
  const [listPrev, setListPrev] = useState(0);
  const [listCur, setListCur] = useState(50);

  // useEffect(() => {
  //   if (data) {
  //     setVisibleData(data.slice(0, 50));
  //   }
  // }, [data]);

  useEffect(() => {
    setVisibleData((prevVisibleData) => [
      ...prevVisibleData,
      ...data.slice(listPrev, listCur),
    ]);
  }, [data, listCur, listPrev]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='network-center-frame'>
      <div className='network-container'>
        {visibleData.map((user) => {
          return (
            <NetworkProfile
              name={user.name}
              email={user.email}
              description={user.description}
              key={user.id}
            />
          );
        })}
      </div>
      (
      <div className='moreData-wrapper'>
        <button
          className='moreData'
          onClick={() => {
            let curVal = listCur;
            let prevVal = listPrev;
            setListCur(curVal + 50);
            setListPrev(prevVal + 50);
          }}
        >
          More
        </button>
      </div>
      )
    </div>
  );
}

export default Network;
