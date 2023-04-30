//담당 : 이승현

const AddProject = ({ project, setProject }) => {
  const handleRadioClick = (e) => {
    const { value } = e.target;
    setProject({
      ...project,
      division: value,
    });
  };

  return (
    <>
      <div>
        <input
          className="border p-2 mb-4 rounded focus:outline-gray-300 w-1/2"
          type="text"
          placeholder="프로젝트 이름"
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          value={project.name}
          maxLength={20}
        />
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="개인 프로젝트"
          checked={project.division === "개인 프로젝트"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">개인 프로젝트</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="팀 프로젝트"
          checked={project.division === "팀 프로젝트"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">팀 프로젝트</label>
      </div>
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        placeholder="프로젝트 내용"
        cols="30"
        rows="10"
        onChange={(e) =>
          setProject({ ...project, description: e.target.value })
        }
        value={project.description}
        maxLength={1000}
      ></textarea>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="프로젝트 기간"
        onChange={(e) => setProject({ ...project, date: e.target.value })}
        value={project.date}
        maxLength={50}
      />
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        cols="30"
        rows="3"
        placeholder="기술 스택"
        onChange={(e) => setProject({ ...project, tech_stack: e.target.value })}
        value={project.tech_stack}
        maxLength={500}
      ></textarea>
      <textarea
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        cols="30"
        rows="3"
        placeholder="참조 링크"
        onChange={(e) => setProject({ ...project, link: e.target.value })}
        value={project.link}
        maxLength={500}
      ></textarea>
    </>
  );
};

export default AddProject;
