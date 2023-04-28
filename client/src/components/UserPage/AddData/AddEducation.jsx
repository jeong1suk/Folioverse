import { useState } from "react";

const AddEducation = () => {
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [graduation, setGraduation] = useState(null);

  const handleRadioClick = (e) => {
    const { value } = e.target;
    setGraduation((prevValue) => (prevValue === value ? null : value));
  };

  return (
    <>
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="학교 이름"
        onChange={(e) => setName(e.target.value)}
        value={name}
        maxLength={20}
      />
      <input
        className="block border w-full p-2 mb-4 rounded focus:outline-gray-300"
        type="text"
        placeholder="전공"
        onChange={(e) => setMajor(e.target.value)}
        value={major}
        maxLength={20}
      />
      <div>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="재학중"
          checked={graduation === "재학중"}
          onChange={handleRadioClick}
        />
        <label className="m-1">재학중</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="학사졸업"
          checked={graduation === "학사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1">학사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="석사졸업"
          checked={graduation === "석사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1">석사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="박사졸업"
          checked={graduation === "박사졸업"}
          onChange={handleRadioClick}
        />
        <label className="m-1">박사졸업</label>
        <input
          className="m-1"
          name="degree"
          type="radio"
          value="중퇴"
          checked={graduation === "중퇴"}
          onChange={handleRadioClick}
        />
        <label className="m-1">중퇴</label>
      </div>
    </>
  );
};

export default AddEducation;
