//담당 : 이승현

import Award from "./MvpService/Award";
import Certificate from "./MvpService/Certificate";
import Education from "./MvpService/Education";
import Project from "./MvpService/Project";

const Mvp = ({ title }) => {
  return (
    <section className="border rounded p-5 mb-5">
      <h1>{title}</h1>
      <article>
        {(title === "학력" && <Education />) ||
          (title === "프로젝트" && <Project />) ||
          (title === "수상 이력" && <Award />) ||
          (title === "자격증" && <Certificate />)}
      </article>
    </section>
  );
};

export default Mvp;
