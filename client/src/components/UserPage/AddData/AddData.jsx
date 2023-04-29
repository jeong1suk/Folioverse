//담당 : 이승현

import { useEffect, useState } from "react";
import AddAward from "./AddAward";
import AddCertificate from "./AddCertificate";
import AddEducation from "./AddEducation";
import AddProject from "./AddProject";
import { useQueryDelete, useQueryFetch } from "../../../utils/useQuery";
import { useQueryClient } from "react-query";

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
        setLink("/education");
        break;
      case "프로젝트":
        setLink("/project");
        break;
      case "수상 이력":
        setLink("/award");
        break;
      case "자격증":
        setLink("/certificate");
        break;
    }
  }, [editState, addState]);

  const { mutate } = useQueryFetch(link, method);
  const { deleteMutate } = useQueryDelete(link + deleteLink);
  const queryClient = useQueryClient();

  const onSubmit = (e) => {
    e.preventDefault();
    switch (title) {
      case "학력":
        mutate(
          { body: education },
          { onSuccess: () => queryClient.invalidateQueries("getEducation") }
        );
        break;
      case "프로젝트":
        mutate(
          { body: project },
          { onSuccess: () => queryClient.invalidateQueries("getProject") }
        );
        break;
      case "수상 이력":
        mutate(
          { body: award },
          { onSuccess: () => queryClient.invalidateQueries("getAward") }
        );
        break;
      case "자격증":
        mutate(
          { body: certificate },
          { onSuccess: () => queryClient.invalidateQueries("getCertificate") }
        );
        break;
    }
    setEditState(false);
    setAddState(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    switch (title) {
      case "학력":
        deleteMutate(
          { body: education },
          {
            onSuccess: () => queryClient.invalidateQueries("getEducation"),
          }
        );
        break;
      case "프로젝트":
        deleteMutate(
          { body: project },
          {
            onSuccess: () => queryClient.invalidateQueries("getProject"),
          }
        );
        break;
      case "수상 이력":
        deleteMutate(
          { body: award },
          {
            onSuccess: () => queryClient.invalidateQueries("getAward"),
          }
        );
        break;
      case "자격증":
        deleteMutate(
          { body: certificate },
          {
            onSuccess: () => queryClient.invalidateQueries("getCertificate"),
          }
        );
        break;
    }
    setEditState(false);
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
        onClick={handleDelete}
      >
        삭제
      </button>
    </form>
  );
};

export default AddData;
