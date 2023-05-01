import { useEffect, useRef } from "react";
import profileIntroImg from "/homepage/profileExample.png";
import secondImg from "/homepage/2.png";

function SecondSlide() {
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
    observer.observe(imgRef.current);
  }, []);

  return (
    <div className="relative w-full pt-[40px] pb-[500px] bg-[#000] text-white text-center">
      <img
        ref={imgRef}
        className={`absolute top-[-5%] rotate-[180deg] right-[5%] h-[600px] opacity-0 mx-auto ${h2style}`}
        src={secondImg}
        alt="second img"
      />
      <div className="absolute left-[50%] translate-x-[-50%]">
        <h2 ref={ref1} className={`${h2style} left-[-70px] relative`}>
          당신을 소개하고
        </h2>
        <h2
          ref={ref2}
          className={`delay-[200ms] ${h2style} left-[-70px] relative`}
        >
          다른 사람들과 의견을 나눠보세요.
        </h2>
      </div>
      <img
        ref={ref3}
        className={`relative top-[200px] w-[900px] mx-auto mt-[20px] rounded-[5px] ${h2style} delay-[400ms]`}
        src={profileIntroImg}
        alt="profile example"
      />
    </div>
  );
}

export default SecondSlide;
