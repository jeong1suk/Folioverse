//담당 : 이승현

import { useEffect, useState } from "react";
import useThemeStore from "../store/themeStore"; //store를 불러오는 코드

const DarkModeTest = () => {
  const theme = useThemeStore((state) => !state.theme); //다크모드를 사용하는 쪽에서 쓰일 코드
  const toggleTheme = useThemeStore((state) => state.toggleTheme); //다크모드를 변경하는 쪽의 코드(아마도 네비게이션 바)

  //스타일 상태(순수 css 방식)
  const [style, setStyle] = useState({
    backgroundColor: null,
    border: "1px solid",
    padding: "1rem",
  });

  //theme의 값이 변할 때마다 body태그에서 dark클래스를 추가or제거하고, 순수 css방식의 경우 스타일 상태를 업데이트해줌.
  useEffect(() => {
    document.body.classList[theme ? "remove" : "add"]("dark");

    setStyle({
      ...style,
      backgroundColor: document.body.classList.contains("dark")
        ? "gray"
        : "white",
    });
  }, [theme]);

  return (
    <>
      <button className="border p-3" onClick={toggleTheme}>
        다크모드 토글 버튼
      </button>
      <div className="border p-5 dark:bg-gray-500 bg-gray-100">
        테일윈드 방식 다크모드
      </div>
      <div style={style}>자바스크립트 방식 다크모드</div>
      <p>{theme.toString()}</p>
    </>
  );
};

export default DarkModeTest;
