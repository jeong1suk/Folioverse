//담당 : 이승현

import Award from "../ViewMvp/Award";
import Certificate from "../ViewMvp/Certificate";
import Education from "../ViewMvp/Education";
import Project from "../ViewMvp/Project";

const PdfReader = () => {
  return (
    <div className="pdf-area" style={{ width: "540pt" }}>
      <h1 className="text-2xl text-center mb-5">포트폴리오</h1>
      <h2 className="text-xl my-5">학력</h2>
      <Education isPdf={true} />
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
