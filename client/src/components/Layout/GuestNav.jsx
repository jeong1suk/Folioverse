// 정주현
import { Link } from "react-router-dom";

const GuestNav = () => {
  const fontColorB = "text-[#4f4f4f] dark:text-[#a4a4a4]";

  return (
    <div className="h-[40px] w-[fit-content] mx-[5px] float-right relative top-[50%] -translate-y-1/2">
      <Link
        to="/login"
        className={`float-right mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal ${fontColorB}`}
      >
        로그인
      </Link>
      <Link
        to="/sign-up"
        className={`float-right mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal ${fontColorB}`}
      >
        회원가입
      </Link>
    </div>
  );
};

export default GuestNav;
