// 정주현

import { useEffect, useRef } from "react";
import FirstGreet from "./FirstGreet";
import SecondProfile from "./SecondProfile";
import firstimg from "/homepage/1.png";
import ThirdFolioSlide from "./ThirdFolioSlide";
import FourthFooter from "./FourthFooter";

const HomePage = () => {
  const bgRef = useRef(null);

  const observer = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        observer.unobserve(e.target);
      }
    });
  });

  useEffect(() => {
    scrollTo(0, 0);
    observer.observe(bgRef.current);
  }, []);
  return (
    <div className="overflow-hidden w-full">
      <div className="absolute top-0 w-full h-[70px] bg-[#000] z-0"></div>
      {/* Header부분 공백가리기 */}
      <img
        ref={bgRef}
        className="w-[1700px] absolute top-[-300px] left-[50%] translate-x-[-50%] z-0 opacity-0 transition-all duration-500 ease-in-out"
        src={firstimg}
        alt="성운"
      />
      <div className="grid grid-cols-1 w-full mx-auto gap-[700px] bg-[#000]">
        <FirstGreet />
        <SecondProfile />
        <ThirdFolioSlide />
        <FourthFooter />
      </div>
    </div>
  );
};

export default HomePage;
