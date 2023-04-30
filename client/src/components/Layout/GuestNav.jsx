// 정주현
import { Link } from "react-router-dom";

function GuestNav() {
  return (
    <div className="h-[40px] w-[fit-content] mx-[5px] float-right relative top-[50%] -translate-y-1/2">
      <Link
        to="/login"
        className={`float-right mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal text-[#212121] dark:text-[#b5b5b5]`}
      >
        로그인
      </Link>
      <Link
        to="/sign-up"
        className={`float-right mx-[5px] relative top-[50%] -translate-y-1/2 w-[fit-content] h-[fit-content] font-normal text-[#212121] dark:text-[#b5b5b5]`}
      >
        회원가입
      </Link>
    </div>
  );
}

export default GuestNav;
