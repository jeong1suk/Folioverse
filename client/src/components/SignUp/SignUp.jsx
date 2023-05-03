// 정원석

import React, { useState } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const darkMode = "bg-white text-[#212121] dark:bg-[#212121] dark:text-white";

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  // 비밀번호 유효성검사, 숫자 문자 8글자 이상
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (isValid && e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };
  // 비밀번호 재확인 용 함수
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
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

  // const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMessage("");

    if (name.trim() === "") {
      setErrMessage("이름을 입력해 주세요.");
      return;
    }

    if (!isEmailValid) {
      setErrMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!isPasswordValid) {
      setErrMessage(
        "비밀번호는 숫자, 문자, 특수문자를 포함한 6자 이상이여야 합니다."
      );
      return;
    }

    if (!passwordMatch) {
      setErrMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await axios.post(host + "/auth/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", result.data.token);

      location.href = "/";
    } catch (err) {
      // console.log(err.response.data.message);
      setErrMessage(err.response.data.message);
    }
  };

  return (
    <div className={`bg-white dark:bg-[#212121]`}>
      <div className={`max-w-2xl h-auto mx-auto p-10 mb-auto shadow-sm`}>
        <h1 className={`${darkMode} mt-2 text-center`}>
          폴리오버스로 여행 시작하기
        </h1>
      </div>

      <div
        className={`max-w-2xl h-auto mx-auto p-10 mb-auto border border-slate rounded`}
      >
        <form className={`flex flex-col`}>
          <label className={`${darkMode} font-bold p-2`}>이름:</label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="text"
            placeholder="이름"
            onChange={handleNameChange}
          />
          <label className={`${darkMode} font-bold p-2`}>이메일:</label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />
          {/* {!isEmailValid && (
            <div className={`mt-2 text-red-500`}>
              이메일 형식이 올바르지 않습니다.
            </div>
          )} */}

          <label className={`${darkMode} font-bold p-2`}>비밀번호:</label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
          />
          {/* {!isPasswordValid && (
            <div className={`mt-2 text-red-500`}>
              숫자, 문자, 특수문자 포함 6글자 이상 입력해주세요.
            </div>
          )} */}

          <label className={`${darkMode} font-bold p-2`}>비밀번호 확인:</label>
          <input
            className={`p-2 border border-solid border-slate rounded`}
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleConfirmPasswordChange}
          />
          {/* {passwordMatch ? (
            <p></p>
          ) : (
            <p className={`mt-2 text-red-500`}>비밀번호가 맞지 않습니다.</p>
          )} */}

          {errMessage && (
            <div
              className={`p-2 border border-solid border-slate rounded text-center bg-yellow-300 text-red-500`}
            >
              {errMessage}
            </div>
          )}
          <button
            className={`p-2 rounded-2xl border-none bg-black text-white cursor-pointer mt-5`}
            type="submit"
            onClick={handleSubmit}
          >
            회원가입
          </button>
        </form>
      </div>

      <div
        className={`max-w-2xl h-auto mx-auto p-10 mb-auto border border-slate rounded`}
      >
        <p className={`${darkMode} mt-2 text-center`}>Welcome to Folioverse</p>
        <p className={`${darkMode} mt-2 text-center`}>
          Let's begin the adventure
        </p>
      </div>
    </div>
  );
}

export default SignUp;
