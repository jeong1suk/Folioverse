//담당 : 이승현

import { useState } from "react";
import AddData from "./AddData/AddData";
import Award from "./ViewMvp/Award";
import Certificate from "./ViewMvp/Certificate";
import Education from "./ViewMvp/Education";
import Project from "./ViewMvp/Project";
import { useLocation } from "react-router-dom";
import mvpSelectStore from "../../store/mvpSelectStore";
import Career from "./ViewMvp/Career";

const Mvp = ({ title, othersData, customClass }) => {
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [resetCount, setResetCount] = useState(0);

  const educationState = mvpSelectStore((state) => state.education);
  const projectState = mvpSelectStore((state) => state.project);
  const careerState = mvpSelectStore((state) => state.career);
  const awardState = mvpSelectStore((state) => state.award);
  const certificateState = mvpSelectStore((state) => state.certificate);

  const location = useLocation();
  const { pathname } = location;

  const [link, setLink] = useState("");
  const [education, setEducation] = useState({
    school_name: "",
    major: "",
    graduate_status: "재학중",
  });
  const [project, setProject] = useState({
    name: "",
    division: "개인 프로젝트",
    description: "",
    date: "",
    tech_stack: "",
    link: "",
  });
  const [career, setCareer] = useState({
    job: "",
    yearly: 0,
    isWeb: true,
    position: "",
    tech_stack: [],
  });
  const [award, setAward] = useState({
    name: "",
    date: "",
  });
  const [certificate, setCertificate] = useState({
    name: "",
    date: "",
    agency: "",
  });

  const onAdd = () => {
    setAddState(true);
    setEducation({
      ...education,
      school_name: "",
      major: "",
      graduate_status: "재학중",
    });
    setProject({
      ...project,
      name: "",
      division: "개인 프로젝트",
      description: "",
      date: "",
      tech_stack: "",
      link: "",
    });
    setAward({ ...award, name: "", date: "" });
    setCertificate({ ...certificate, name: "", date: "", agency: "" });
    setResetCount((prevCount) => prevCount + 1);
  };

  return (
    <section
      className={`border rounded p-5 mb-5 dark:border-cyan-950 ${customClass} ${
        (title === "학력" && !educationState && "hidden") ||
        (title === "직업 및 경력" && !careerState && "hidden") ||
        (title === "프로젝트" && !projectState && "hidden") ||
        (title === "수상 이력" && !awardState && "hidden") ||
        (title === "자격증" && !certificateState && "hidden")
      }`}
    >
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      <article>
        {(title === "학력" && (
          <Education
            setEditState={setEditState}
            education={education}
            setEducation={setEducation}
            othersData={othersData}
          />
        )) ||
          (title === "프로젝트" && (
            <Project
              setEditState={setEditState}
              project={project}
              setProject={setProject}
              othersData={othersData}
            />
          )) ||
          (title === "수상 이력" && (
            <Award
              setEditState={setEditState}
              award={award}
              setAward={setAward}
              othersData={othersData}
            />
          )) ||
          (title === "자격증" && (
            <Certificate
              setEditState={setEditState}
              certificate={certificate}
              setCertificate={setCertificate}
              othersData={othersData}
            />
          )) ||
          (title === "직업 및 경력" && (
            <Career
              setEditState={setEditState}
              career={career}
              setCareer={setCareer}
              othersData={othersData}
            />
          ))}
      </article>
      <button
        onClick={onAdd}
        className={`${
          (addState || editState || pathname !== "/my-page") && "hidden"
        } block w-full border-dotted border border-dotted border-neutral-400 p-2 mt-2 rounded hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:border-cyan-950`}
      >
        +
      </button>
      <AddData
        title={title}
        editState={editState}
        setEditState={setEditState}
        addState={addState}
        setAddState={setAddState}
        link={link}
        setLink={setLink}
        education={education}
        setEducation={setEducation}
        career={career}
        setCareer={setCareer}
        project={project}
        setProject={setProject}
        award={award}
        setAward={setAward}
        certificate={certificate}
        setCertificate={setCertificate}
        resetCount={resetCount}
      />
    </section>
  );
};

export default Mvp;
