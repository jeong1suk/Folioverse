// 정주현

import { useEffect, useRef } from "react";
import secondImg from "/homepage/2.png";
import SecondCommunity from "./SecondCommunity";

const SecondProfile = () => {
  const imgRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const h2style =
    "text-white text-left text-[50px] font-[700] opacity-0 transition-opacity duration-1000 ease-in-out";

  const observer = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        observer.unobserve(e.target);
      }
    });
  });

  useEffect(() => {
    observer.observe(ref1.current);
    observer.observe(ref2.current);
    observer.observe(ref3.current);
  }, []);

  return (
    <div className="relative w-full pt-[40px] pb-[500px] bg-[#000] text-white text-center">
      <img
        ref={imgRef}
        className={`absolute top-[-10%] rotate-[180deg] left-[65%] translate-x-[-50%] h-[400px] opacity-1 transition-opacity duration-1000 ease-in-out`}
        src={secondImg}
        alt="second img"
      />
      <div className="absolute left-[50%] translate-x-[-50%]">
        <h2 ref={ref1} className={`${h2style} left-[-70px] relative`}>
          <span className="text-[#9dcaf5]">Folioverse</span>가 제공하는
        </h2>
        <h2
          ref={ref2}
          className={`delay-[200ms] ${h2style} left-[-70px] relative`}
        >
          <span className="text-[#9dcaf5]">여러가지 기능</span>을 이용해보세요
        </h2>
      </div>
      <div
        ref={ref3}
        className="relative top-[200px] opacity-0 transition-opacity duration-1000 ease-in-out delay-[400ms]"
      >
        <SecondCommunity />
      </div>
    </div>
  );
};

export default SecondProfile;
