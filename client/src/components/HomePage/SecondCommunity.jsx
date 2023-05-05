import messageImg from "/homepage/message.png";
import followLikeImg from "/homepage/followLike.png";
import pdfExportImg from "/homepage/pdfExport.png";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const SecondCommunity = () => {
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const linkRef = useRef(null);

  const observer = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        observer.unobserve(e.target);
      }
    });
  });

  useEffect(() => {
    observer.observe(div1Ref.current);
    observer.observe(div2Ref.current);
    observer.observe(div3Ref.current);
    observer.observe(linkRef.current);
  }, []);

  return (
    <div className="text-white w-[fit-content] text-black grid grid-cols-[500px_300px]  gap-[20px] relative left-[50%] translate-x-[-50%] rounded-[10px] ">
      <div
        ref={div1Ref}
        className="w-full bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] h-[200px] rounded-[10px] overflow-hidden opacity-0 transition-opacity duration-1000 ease-in-out delay-[500ms]"
      >
        <img
          src={messageImg}
          alt="messageImg"
          className="relative top-[20px] left-[20px] w-[260px]"
        />
        <div className="absolute top-[20px] left-[290px]">
          <h4 className="text-left text-[30px] font-bold">마음에 들면</h4>
          <h4 className="text-left text-[40px] font-bold mt-[-10px]">
            <span className="text-[#9dcaf5]">쪽지</span>해요
          </h4>
          <p className="mt-[15px] text-left text-[15px] text-[#868686] w-[250px]">
            쪽지기능을 통해 포트폴리오에 <br></br>관심을 표현해보세요!
          </p>
        </div>
      </div>
      <div
        ref={div2Ref}
        className="w-full bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] h-[200px] rounded-[10px] overflow-hidden opacity-0 transition-opacity duration-1000 ease-in-out delay-[600ms]"
      >
        <img
          src={followLikeImg}
          alt="followLikeImg"
          className="relative top-[-10px] left-[20px] w-[260px]"
        />
        <div className="absolute w-[210px] top-[10px] left-[60px] backdrop-blur-[10px]">
          <h4 className="text-left w-[fit-content] text-[30px] font-bold">
            표현에 서툰
          </h4>
          <h4 className="text-left text-[40px] font-bold mt-[-10px]">
            <span className="text-[#9dcaf5] w-[fit-content]">당신</span>에게
          </h4>
          <p className="mt-[5px] text-left text-[15px] text-[#868686] w-[fit-content]">
            팔로우, 좋아요 기능으로<br></br>마음만 놓고 가요.
          </p>
        </div>
      </div>
      <div
        ref={div3Ref}
        className="w-full bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] col-start-1 col-end-3 h-[250px] 
        rounded-[10px] overflow-hidden opacity-0 transition-opacity duration-1000 ease-in-out delay-[650ms]"
      >
        <img
          src={pdfExportImg}
          alt="followLikeImg"
          className="relative top-[-50%] left-[20px] w-[400px]"
        />
        <div className="absolute top-[45%] translate-y-[-50%] left-[450px]">
          <h4 className="text-left text-[30px] font-bold">
            당신의 기록이 <span className="text-[#9dcaf5]">깔끔하고</span>
          </h4>
          <h4 className="text-left text-[35px] font-bold mt-[-10px]">
            <span className="text-[#9dcaf5]">보기좋게</span> 정리되도록
          </h4>
          <p className="mt-[15px] text-left text-[15px] text-[#868686] w-[350px]">
            마이페이지 내 PDF 다운로드를 이용하여 당신이 모아온 포트폴리오를
            한번에 정리해보세요!
          </p>
        </div>
      </div>
      <h4
        ref={linkRef}
        className="relative left-[10px] text-[20px]  opacity-0 transition-opacity duration-1000 ease-in-out delay-[400ms]"
      >
        <Link
          to="/sign-up"
          className="text-[#9dcaf5] underline hover:text-[#c4e2ff]"
        >
          회원가입
        </Link>{" "}
        또는{" "}
        <Link
          to="/login"
          className="text-[#9dcaf5] underline hover:text-[#c4e2ff]"
        >
          로그인
        </Link>
        &nbsp;하여 더 많은 기능들을 이용해보세요!
      </h4>
    </div>
  );
};

export default SecondCommunity;
