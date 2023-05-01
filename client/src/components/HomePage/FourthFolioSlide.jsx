// 정주현

import { useState } from "react";
import { useAxiosGet } from "../../CustomHooks";
const host = import.meta.env.VITE_SERVER_HOST;

function FourthFolioSlide() {
  const { data, error, loading } = useAxiosGet(`${host}/user/list`);
  const [curPage, setCurPage] = useState(0);
  let endPage = 0;
  const slideBtn = "text-[20px] relative top-[50%] translate-y-[-50%]";

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    endPage = data.length;
  }

  return (
    <div className="w-800 mx-auto relative">
      <h3>
        현재 Folioverse에 등록된
        <br></br>프로필을 확인해보세요.
      </h3>
      <div className="relative top-[100%]">
        {curPage > 1 && (
          <button
            className={`float-left ${slideBtn}`}
            onClick={() => setCurPage(curPage - 1)}
          >
            Prev
          </button>
        )}
        {curPage < endPage && (
          <button
            className={`float-right ${slideBtn}`}
            onClick={() => setCurPage(curPage + 1)}
          >
            Next
          </button>
        )}
      </div>
      <ul className="w-800 mx-auto">{data && <>{}</>}</ul>
    </div>
  );
}

export default FourthFolioSlide;
