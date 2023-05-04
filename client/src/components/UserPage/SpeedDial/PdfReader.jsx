//담당 : 이승현

import Award from "../ViewMvp/Award";
import Career from "../ViewMvp/Career";
import Certificate from "../ViewMvp/Certificate";
import Education from "../ViewMvp/Education";
import Project from "../ViewMvp/Project";

const PdfReader = ({ myInfo }) => {
  return (
    <div className="pdf-area" style={{ width: "540pt" }}>
      <div className="border rounded-xl p-3">
        <h1 className="text-xl my-2">{myInfo?.name} 님의 포트폴리오</h1>
        <p className="leading-10 ml-2 text-sm text-neutral-400">
          {myInfo?.email}
        </p>
        <p className="leading-10 ml-2 text-neutral-500">
          {myInfo?.description}
        </p>
      </div>
      <h2 className="text-xl my-5">학력</h2>
      <Education isPdf={true} />
      <h2 className="text-xl my-5">직업 및 경력</h2>
      <Career isPdf={true} />
      <h2 className="text-xl my-5">프로젝트</h2>
      <Project isPdf={true} />
      <h2 className="text-xl my-5">수상 이력</h2>
      <Award isPdf={true} />
      <h2 className="text-xl my-5">자격증</h2>
      <Certificate isPdf={true} />
    </div>
  );
};

export default PdfReader;
