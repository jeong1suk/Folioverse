import AddAward from "./AddAward";
import AddCertificate from "./AddCertificate";
import AddEducation from "./AddEducation";
import AddProject from "./AddProject";

const AddData = ({ addState, setAddState, title }) => {
  return (
    <form className={`${!addState && "hidden"} mt-3`}>
      {(title === "학력" && <AddEducation />) ||
        (title === "프로젝트" && <AddProject />) ||
        (title === "수상 이력" && <AddAward />) ||
        (title === "자격증" && <AddCertificate />)}
      <button className="border rounded py-1 px-2 mr-2 mt-2">확인</button>
      <button
        className="border rounded py-1 px-2"
        onClick={() => setAddState(false)}
      >
        취소
      </button>
    </form>
  );
};

export default AddData;
