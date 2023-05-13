//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useQueryDelete, useQueryPatch } from "../../../utils/useQuery";
import AddAward from "./AddAward";
import AddCertificate from "./AddCertificate";
import AddEducation from "./AddEducation";
import AddProject from "./AddProject";
import useToastStore from "../../../store/toastStore";
import AddCareer from "./AddCareer";

const AddData = ({
  editState,
  setEditState,
  addState,
  setAddState,
  title,
  link,
  setLink,
  education,
  setEducation,
  career,
  setCareer,
  project,
  setProject,
  award,
  setAward,
  certificate,
  setCertificate,
  resetCount,
}) => {
  useEffect(() => {
    switch (title) {
      case "학력":
        setLink("/education");
        break;
      case "직업 및 경력":
        setLink("/career");
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

  const { mutate, isLoading: loadingPut } = useQueryPatch(link, "put");
  const { mutate: editMutate, isLoading: loadingPatch } = useQueryPatch(
    link,
    "patch"
  );
  const { deleteMutate, isLoading: loadingDelete } = useQueryDelete(link);
  const queryClient = useQueryClient();

  const setToast = useToastStore((state) => state.setToast);

  const [isValid, setIsValid] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const handdleMutate = (func, msg, stateFunc) => {
      switch (title) {
        case "학력":
          func(
            { body: education },
            {
              onSuccess: () => {
                queryClient.invalidateQueries("getEducation");
              },
            }
          );
          break;
        case "직업 및 경력":
          func(
            { body: career },
            { onSuccess: () => queryClient.invalidateQueries("getCareer") }
          );
          break;
        case "프로젝트":
          func(
            { body: project },
            { onSuccess: () => queryClient.invalidateQueries("getProject") }
          );
          break;
        case "수상 이력":
          func(
            { body: award },
            { onSuccess: () => queryClient.invalidateQueries("getAward") }
          );
          break;
        case "자격증":
          func(
            { body: certificate },
            { onSuccess: () => queryClient.invalidateQueries("getCertificate") }
          );
          break;
      }
      setToast(msg, "success");

      stateFunc(false);
    };

    if (addState) {
      handdleMutate(mutate, "데이터가 추가되었습니다", setAddState);
    } else {
      handdleMutate(editMutate, "데이터가 수정되었습니다", setEditState);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    switch (title) {
      case "학력":
        deleteMutate(education._id, {
          onSuccess: () => queryClient.invalidateQueries("getEducation"),
        });
        break;
      case "직업 및 경력":
        deleteMutate(career._id, {
          onSuccess: () => queryClient.invalidateQueries("getCareer"),
        });
        break;
      case "프로젝트":
        deleteMutate(project._id, {
          onSuccess: () => queryClient.invalidateQueries("getProject"),
        });
        break;
      case "수상 이력":
        deleteMutate(award._id, {
          onSuccess: () => queryClient.invalidateQueries("getAward"),
        });
        break;
      case "자격증":
        deleteMutate(certificate._id, {
          onSuccess: () => queryClient.invalidateQueries("getCertificate"),
        });
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
        (title === "직업 및 경력" && (
          <AddCareer
            setIsValid={setIsValid}
            career={career}
            setCareer={setCareer}
            resetCount={resetCount}
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
          className={`text-white hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 bg-blue-400 dark:focus:ring-gray-700 ${
            !isValid &&
            "bg-blue-300 hover:bg-blue-300 dark:bg-sky-800 dark:hover:bg-sky-800 cursor-not-allowed"
          }`}
          onClick={onSubmit}
          disabled={!isValid || loadingPut || loadingPatch}
        >
          확인
        </button>
        <button
          className={
            "text-white hover:bg-blue-500 bg-blue-400 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 mr-2 mb-2 dark:focus:ring-gray-700 "
          }
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
          } text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2 dark:border-red-400 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-900`}
          onClick={handleDelete}
          disabled={loadingDelete}
        >
          삭제
        </button>
      </div>
    </form>
  );
};

export default AddData;
