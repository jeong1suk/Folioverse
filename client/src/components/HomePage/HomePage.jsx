// 정주현

import { useEffect, useRef } from "react";
import FirstGreet from "./FirstGreet";
import SecondSlide from "./SecondProfile";
import firstimg from "/homepage/1.png";
import FourthFolioSlide from "./FourthFolioSlide";
function HomePage() {
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
      <img
        ref={bgRef}
        className="w-[1700px] absolute top-[-300px] left-[50%] translate-x-[-50%] z-0 opacity-0 transition-all duration-500 ease-in-out"
        src={firstimg}
        alt="성운"
      />
      <div className="grid grid-cols-1 w-full mx-auto gap-[1500px] bg-[#000]">
        <FirstGreet />
        <SecondSlide />
        <FourthFolioSlide />
        <div className="font-bold text-[50px] text-white m-auto">Footer</div>
      </div>
    </div>
  );
}

export default HomePage;
