//담당 : 이승현

import { useEffect, useState } from "react";
import AddAward from "./AddAward";
import AddCertificate from "./AddCertificate";
import AddEducation from "./AddEducation";
import AddProject from "./AddProject";
import { useQueryDelete, useQueryFetch } from "../../../utils/useQuery";

const AddData = ({
  editState,
  setEditState,
  addState,
  setAddState,
  title,
  link,
  deleteLink,
  method,
  setLink,
  education,
  setEducation,
  project,
  setProject,
  award,
  setAward,
  certificate,
  setCertificate,
}) => {
  useEffect(() => {
    switch (title) {
      case "학력":
        setLink("/dummy/mvp/test-education");
        break;
      case "프로젝트":
        setLink("/dummy/mvp/test-project");
        break;
      case "수상 이력":
        setLink("/dummy/mvp/test-award");
        break;
      case "자격증":
        setLink("/dummy/mvp/test-certificate");
        break;
    }
  }, [editState, addState]);

  const { mutate } = useQueryFetch(link, method);
  const { deleteMutate } = useQueryDelete(link + deleteLink);

  const onSubmit = (e) => {
    switch (title) {
      case "학력":
        mutate({ body: education }, { onSuccess: (data) => console.log(data) });
        break;
      case "프로젝트":
        mutate({ body: project }, { onSuccess: (data) => console.log(data) });
        break;
      case "수상 이력":
        mutate({ body: award }, { onSuccess: (data) => console.log(data) });
        break;
      case "자격증":
        mutate(
          { body: certificate },
          { onSuccess: (data) => console.log(data) }
        );
        break;
    }
    setAddState(false);
  };

  const handleDelete = async () => {
    switch (title) {
      case "학력":
        deleteMutate({ onSuccess: (data) => console.log(data) });
        break;
      case "프로젝트":
        deleteMutate({ onSuccess: (data) => console.log(data) });
        break;
      case "수상 이력":
        deleteMutate({ onSuccess: (data) => console.log(data) });
        break;
      case "자격증":
        deleteMutate({ onSuccess: (data) => console.log(data) });
        break;
    }
    setAddState(false);
  };

  return (
    <form className={`${!addState && !editState && "hidden"} mt-3`}>
      {(title === "학력" && (
        <AddEducation education={education} setEducation={setEducation} />
      )) ||
        (title === "프로젝트" && (
          <AddProject project={project} setProject={setProject} />
        )) ||
        (title === "수상 이력" && (
          <AddAward award={award} setAward={setAward} />
        )) ||
        (title === "자격증" && (
          <AddCertificate
            certificate={certificate}
            setCertificate={setCertificate}
          />
        ))}
      <button
        className="border rounded py-1 px-2 mr-2 mt-2 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
        onClick={onSubmit}
      >
        확인
      </button>
      <button
        className="border rounded py-1 px-2 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
        onClick={(e) => {
          e.preventDefault();
          setAddState(false);
          setEditState(false);
        }}
      >
        취소
      </button>
      <button
        className={`${
          !editState && "hidden"
        } border rounded py-1 px-2 ml-2 mt-2 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700`}
        onClick={(e) => {
          e.preventDefault();
          handleDelete();
        }}
      >
        삭제
      </button>
    </form>
  );
};

export default AddData;
