// 정원석

import axios from "axios";
import React, { useState } from "react";
import styles from "./Login.module.css";
const host = import.meta.env.VITE_SERVER_HOST;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

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

  return (
    <>
      <div
        className={`max-w-2xl h-auto mx-auto p-10 mb-auto border border-solid border-slate rounded-5 shadow-sm flex justify-center iteims-center`}
      >
        {/* max-w-800px mx-auto p-20 border border-gray-300 rounded-lg shadow-sm flex justify-center items-center */}
        <img
          className={`w-20 h-auto mx-auto`}
          src="/logo/logo-light.png"
          alt="로고 이미지"
        />
        <p className={`mx-auto`}>폴리오버스로 출발하기</p>
      </div>

      <div
        className={`max-w-2xl h-auto mx-auto p-10 mb-auto border border-solid border-slate rounded-5 shadow-sm`}
      >
        <form className={`flex flex-col`}>
          <label className={`font-bold mr-5`}>이메일</label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />
          <div>
            <label htmlFor="password" className={`font-bold mr-5`}>
              비밀번호:
            </label>
          </div>
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
            className={`${`p-2 rounded-2xl border-none bg-black text-white cursor-pointer mt-2`} ${
              isEmailValid && isPasswordValid
                ? `hover: bg-blue-500 cursor-pointer`
                : `cursor-wait`
            }`}
            type="submit"
            disabled={!isEmailValid || !isPasswordValid}
            onClick={handleSubmit}
          >
            로그인
          </button>
        </form>

        <div className={`mt-4 flex flex-col items-center mb-2`}>
          <p className={`mb-2`}>또는</p>
          <button
            className={`bg-blue-500 text-white text-lg px-10 py-2 rounded-md shadow-md flex justify-center items-center hover:cursor-pointer`}
          >
            <img
              className={styles.logo1}
              src="/logo/logo-light.png"
              alt="로고 이미지"
            />
            구글로 로그인
          </button>
          <button
            className={`bg-yellow-300 text-white text-lg px-10 py-2 rounded-md shadow-md flex justify-center items-center hover:cursor-pointer`}
          >
            <img
              className={styles.logo1}
              src="/logo/logo-light.png"
              alt="로고 이미지"
            />
            카카오 로그인
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
