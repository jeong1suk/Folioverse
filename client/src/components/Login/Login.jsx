// 정원석

import axios from "axios";
import React, { useState } from "react";
import useModalStore from "../../store/modalStore";
const host = import.meta.env.VITE_SERVER_HOST;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const darkMode = "bg-white text-[#212121] dark:bg-[#212121] dark:text-white";
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";
  const fontColorB = "text-[#4f4f4f] dark:text-[#a4a4a4]";
  const fontColorC = "text-[#808080] dark:text-[#868686]";

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateEmail = (email) => {
    return email.toLowerCase().match(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&].{6,18}$/;
    return regex.test(password);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  const setModal = useModalStore((state) => state.setModal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(host + "/auth/login-process", {
        email,
        password,
      });

      localStorage.setItem("token", result.data.token);
      location.href = "/";
    } catch (err) {
      setErrMessage(err.response.data.message);
    }
  };

  const googleLogin = async () => {
    const result = await axios.get(host + "/auth/google/callback");
    console.log(result);
  };

  const kakaoLogin = async () => {
    const result = await axios.get(host + "/auth/kakao/callback");
  };

  return (
    <div className={`bg-white dark:bg-[#212121] min-h-screen`}>
      <div className={`max-w-2xl h-auto mx-auto p-10 mb-auto shadow-sm`}>
        <img
          className={`w-20 h-auto mx-auto`}
          src="/logo/logo-light.png"
          alt="로고 이미지"
        />
        <p className={`${darkMode} mt-2 text-2xl text-center`}>
          폴리오버스로 출발하기
        </p>
      </div>

      <div className={`max-w-xl h-auto mx-auto mb-auto`}>
        <form className={`flex flex-col`}>
          <label className={`${darkMode} ${fontColorA} font-bold p-2`}>
            이메일:
          </label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />

          <label className={`${darkMode} ${fontColorA} font-bold mt-2 p-2`}>
            비밀번호:
          </label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
          />

          {errMessage && (
            <div
              className={`p-2 border border-solid border-slate rounded text-center bg-yellow-300 text-red-500`}
            >
              {errMessage}
            </div>
          )}

          <button
            className={`${`p-2 rounded-2xl border-none bg-black text-white cursor-pointer mt-5`} ${
              isEmailValid && isPasswordValid && `bg-blue-500 cursor-pointer`
            }`}
            type="submit"
            onClick={handleSubmit}
          >
            로그인
          </button>
        </form>

        <div className={`mt-4 flex flex-col items-center mb-2`}>
          <p className={`${darkMode} mb-2`}>또는</p>
          <button
            className={`bg-blue-500 text-white text-lg px-10 py-2 mt-2 rounded-md shadow-md flex justify-center items-center hover:cursor-pointer`}
            onClick={googleLogin}
          >
            <img
              className={`w-[50px] h-auto`}
              src="/logo/logo-light.png"
              alt="Google"
            />
            구글로 로그인
          </button>
          <button
            className={`bg-yellow-300 text-white text-lg px-10 py-2 mt-2 rounded-md shadow-md flex justify-center items-center hover:cursor-pointer`}
            onClick={kakaoLogin}
          >
            <img
              className={`w-[50px] h-auto`}
              src="/logo/logo-light.png"
              alt="로고 이미지"
            />
            카카오 로그인
          </button>
        </div>
        <a
          className={`inline-block mt-2 mx-2 lg:mx-0 lg:ml-auto text-cyan-500`}
          onClick={() => {
            setModal("", "mail");
          }}
        >
          비밀번호 찾기
        </a>
        <a
          href="/sign-up"
          className={`inline-block mt-2 mx-2 float-right text-cyan-500`}
        >
          회원가입
        </a>
      </div>
    </div>
  );
};

export default Login;
