// 정주현

import { useEffect, useRef } from "react";
import logo from "/logo/logo-dark.png";
function FirstGreet() {
  const logoRef = useRef(null);
  const h21Ref = useRef(null);
  const h22Ref = useRef(null);
  const h23Ref = useRef(null);
  const h2style =
    "relative text-white text-left text-[60px] font-[700] opacity-0 transition-opacity duration-1000 ease-in-out";
  const observer = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.transform = "rotate(0deg)";
        e.target.style.opacity = "1";
        observer.unobserve(e.target);
      }
    });
  });

  useEffect(() => {
    observer.observe(logoRef.current);
    observer.observe(h21Ref.current);
    observer.observe(h22Ref.current);
    observer.observe(h23Ref.current);
  }, []);

  return (
    <div className="mt-[80px] relative text-white">
      <img
        src={logo}
        alt="Homepage"
        ref={logoRef}
        className="mx-auto h-[300px] opacity-0 rotate-[5deg] transition-all duration-1000 ease-in-out"
      />
      <div className="absolute left-[50%] translate-x-[-50%]">
        <h2 ref={h21Ref} className={`${h2style} mt-[100px] delay-[500ms]`}>
          <span className="text-[#9dcaf5]">Folioverse</span>에 오신 것을
          환영합니다!
        </h2>
        <h2 ref={h22Ref} className={`${h2style} delay-[600ms]`}>
          당신의 <span className="text-[#9dcaf5]">포트폴리오</span>를 게시하고
        </h2>
        <h2 ref={h23Ref} className={`${h2style} delay-[700ms]`}>
          다른 개발자들과 <span className="text-[#9dcaf5]">공유해보세요.</span>
        </h2>
      </div>
    </div>
  );
}

export default FirstGreet;
