//담당 : 이승현

import { useParams } from "react-router-dom";

const ErrPage = () => {
  const params = useParams();
  return (
    <h1 className="p-8 text-2xl">
      {params.type === "auth"
        ? "해당 페이지에 접근 권한이 없습니다"
        : "존재하지 않는 페이지입니다."}
    </h1>
  );
};

export default ErrPage;
