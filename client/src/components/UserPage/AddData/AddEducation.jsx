//담당 : 이승현

const AddEducation = ({ education, setEducation }) => {
  const handleRadioClick = (e) => {
    const { value } = e.target;
    setEducation({
      ...education,
      graduation: value,
    });
  };

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="학교 이름"
        onChange={(e) => setEducation({ ...education, name: e.target.value })}
        value={education.name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="전공"
        onChange={(e) => setEducation({ ...education, major: e.target.value })}
        value={education.major}
        maxLength={20}
      />
      <div>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="재학중"
          checked={education.graduation === "재학중"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">재학중</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="학사졸업"
          checked={education.graduation === "학사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">학사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="석사졸업"
          checked={education.graduation === "석사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">석사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="박사졸업"
          checked={education.graduation === "박사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">박사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="중퇴"
          checked={education.graduation === "중퇴"}
          onChange={handleRadioClick}
        />
        <label className="m-1 dark:text-neutral-300">중퇴</label>
      </div>
    </>
  );
};

export default AddEducation;
