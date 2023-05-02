import { useEffect, useState } from "react";

const AddCareer = ({ career, setCareer, setIsValid }) => {
  const [isDeveloper, setIsDeveloper] = useState(false);
  const [isWeb, setIsWeb] = useState(false);

  const handleRadioClick = (e) => {
    const { name, value } = e.target;

    if (name === "job") {
      setIsDeveloper(value === "developer");
      setCareer({ ...career, job: value });
    } else if (name === "yearly") {
      setCareer({ ...career, yearly: value });
    } else if (name === "isWeb") {
      setIsWeb(value === "true");
      setCareer({ ...career, isWeb: value === "true" });
    }
  };

  useEffect(() => {
    if (career.job && career.yearly) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [career.job, career.yearly]);

  return (
    <>
      <div className="flex flex-row items-center mb-4">
        <label className="mr-2">직업 : </label>
        <input
          type="radio"
          name="job"
          value="developer"
          onChange={handleRadioClick}
        />
        <label className="mr-2">개발자</label>
        <input
          type="radio"
          name="job"
          value="non-developer"
          onChange={handleRadioClick}
        />
        <label>비개발자</label>
      </div>

      <div className="flex flex-row items-center mb-4">
        <label className="mr-2">경력 : </label>
        <input
          type="radio"
          name="yearly"
          value="0"
          onChange={handleRadioClick}
        />
        <label className="mr-2">신입(1년 미만)</label>
        <input
          type="radio"
          name="yearly"
          value="1"
          onChange={handleRadioClick}
        />
        <label className="mr-2">경력(1년 이상)</label>
        <input
          type="radio"
          name="yearly"
          value="2"
          onChange={handleRadioClick}
        />
        <label>경력(5년 이상)</label>
      </div>

      {isDeveloper && (
        <div className="flex flex-row items-center mb-4">
          <label className="mr-2">웹 개발자 :</label>
          <input
            type="radio"
            name="isWeb"
            value="true"
            onChange={handleRadioClick}
          />
          <label className="mr-2">Yes</label>
          <input
            type="radio"
            name="isWeb"
            value="false"
            onChange={handleRadioClick}
          />
          <label>No</label>
        </div>
      )}

      {isWeb && (
        <div className="flex flex-row items-center mb-4">
          <label className="mr-2">포지션 : </label>
          <select
            onChange={(e) => setCareer({ ...career, position: e.target.value })}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
          </select>
        </div>
      )}

      {isDeveloper && (
        <div className="flex flex-row items-center mb-4">
          <label className="mr-2">기술 스택 :</label>
          <select
            onChange={(e) =>
              setCareer({ ...career, tech_stack: e.target.value })
            }
          >
            <option value="Python">파이썬</option>
            <option value="JavaScript">자바스크립트</option>
            <option value="Java">자바</option>
            {/* 더 추가할것 */}
          </select>
        </div>
      )}
    </>
  );
};

export default AddCareer;
