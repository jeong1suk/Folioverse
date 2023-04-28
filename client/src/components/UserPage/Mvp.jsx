//담당 : 이승현

import { useState } from "react";
import AddData from "./AddData/AddData";
import Award from "./ViewMvp/Award";
import Certificate from "./ViewMvp/Certificate";
import Education from "./ViewMvp/Education";
import Project from "./ViewMvp/Project";

const Mvp = ({ title }) => {
  const [addState, setAddState] = useState(false);
  const clickAdd = () => {
    setAddState(true);
  };
  return (
    <section className="border rounded p-5 mb-5">
      <h1>{title}</h1>
      <article>
        {(title === "학력" && <Education />) ||
          (title === "프로젝트" && <Project />) ||
          (title === "수상 이력" && <Award />) ||
          (title === "자격증" && <Certificate />)}
      </article>
      <button
        onClick={clickAdd}
        className={`${
          addState && "hidden"
        } block w-full border-dotted border border-dotted border-neutral-400 p-2 mt-2 rounded hover:bg-neutral-100`}
      >
        +
      </button>
      <AddData title={title} addState={addState} setAddState={setAddState} />
    </section>
  );
};

export default Mvp;
