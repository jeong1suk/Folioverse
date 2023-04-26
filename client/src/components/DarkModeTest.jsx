import { useEffect, useState } from "react";
import useThemeStore from "../store/themeStore";

const DarkModeTest = () => {
  const theme = useThemeStore((state) => !state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [style, setStyle] = useState({
    backgroundColor: null,
    border: "1px solid",
    padding: "1rem",
  });

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
