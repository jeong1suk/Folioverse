//담당 : 이승현

import { useState } from "react";
import AddData from "./AddData/AddData";
import Award from "./ViewMvp/Award";
import Certificate from "./ViewMvp/Certificate";
import Education from "./ViewMvp/Education";
import Project from "./ViewMvp/Project";
import { useLocation } from "react-router-dom";

const Mvp = ({ title }) => {
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const [link, setLink] = useState("");
  const [deleteLink, setDeleteLink] = useState("");
  const [method, setMethod] = useState("");
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
    setMethod("put");
  };

  return (
    <section className="border rounded p-5 mb-5">
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      <article>
        {(title === "학력" && (
          <Education
            setEditState={setEditState}
            education={education}
            setEducation={setEducation}
            setMethod={setMethod}
            setDeleteLink={setDeleteLink}
          />
        )) ||
          (title === "프로젝트" && (
            <Project
              setEditState={setEditState}
              project={project}
              setProject={setProject}
              setMethod={setMethod}
              setDeleteLink={setDeleteLink}
            />
          )) ||
          (title === "수상 이력" && (
            <Award
              setEditState={setEditState}
              award={award}
              setAward={setAward}
              setMethod={setMethod}
              setDeleteLink={setDeleteLink}
            />
          )) ||
          (title === "자격증" && (
            <Certificate
              setEditState={setEditState}
              certificate={certificate}
              setCertificate={setCertificate}
              setMethod={setMethod}
              setDeleteLink={setDeleteLink}
            />
          ))}
      </article>
      <button
        onClick={onAdd}
        className={`${
          (addState || editState || pathname !== "/my-page") && "hidden"
        } block w-full border-dotted border border-dotted border-neutral-400 p-2 mt-2 rounded hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700`}
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
        deleteLink={deleteLink}
        method={method}
        setLink={setLink}
        education={education}
        setEducation={setEducation}
        project={project}
        setProject={setProject}
        award={award}
        setAward={setAward}
        certificate={certificate}
        setCertificate={setCertificate}
      />
    </section>
  );
};

export default Mvp;
