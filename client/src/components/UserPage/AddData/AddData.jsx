//담당 : 이승현

import { useEffect, useState } from "react";
import AddAward from "./AddAward";
import AddCertificate from "./AddCertificate";
import AddEducation from "./AddEducation";
import AddProject from "./AddProject";
import { useQueryDelete, useQueryPatch } from "../../../utils/useQuery";
import { useQueryClient } from "react-query";
import useToastStore from "../../../store/toastStore";

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

  const { mutate } = useQueryPatch(link, method);
  const { deleteMutate } = useQueryDelete(link + deleteLink);
  const queryClient = useQueryClient();

  const setToast = useToastStore((state) => state.setToast);

  const [isValid, setIsValid] = useState(false);

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
    setToast(
      addState ? "데이터가 추가되었습니다" : "데이터가 수정되었습니다",
      "success"
    );
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
    setToast("데이터가 삭제되었습니다", "success");
    setEditState(false);
  };

  return (
    <form className={`${!addState && !editState && "hidden"} mt-3`}>
      {(title === "학력" && (
        <AddEducation
          setIsValid={setIsValid}
          education={education}
          setEducation={setEducation}
        />
      )) ||
        (title === "프로젝트" && (
          <AddProject
            setIsValid={setIsValid}
            project={project}
            setProject={setProject}
          />
        )) ||
        (title === "수상 이력" && (
          <AddAward setIsValid={setIsValid} award={award} setAward={setAward} />
        )) ||
        (title === "자격증" && (
          <AddCertificate
            setIsValid={setIsValid}
            certificate={certificate}
            setCertificate={setCertificate}
          />
        ))}
      <div className="mt-2">
        <button
          className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
            !isValid && "bg-slate-100 dark:bg-slate-700 cursor-not-allowed"
          }`}
          onClick={onSubmit}
          disabled={!isValid}
        >
          확인
        </button>
        <button
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
          } text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900`}
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </form>
  );
};

export default AddData;
