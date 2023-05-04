// 정원석

import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const darkMode = "text-[#212121] dark:text-white";
  const fontColorA = "text-white";

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const isValid = validatePassword(e.target.value);
    if (isValid && e.target.value === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

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
      setErrMessage(err.response.data.message);
    }
  };

  return (
    <div className={`bg-black min-h-screen`}>
      <img
        src="/homepage/2.png"
        className={`absolute rotate-180 w-[1200px] top-0 left-[50%] translate-x-[-50%]`}
      />
      <div
        className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[1200px]`}
      >
        <div className={`h-auto pt-10 mx-auto p-5 mb-auto min-w-screen`}>
          {/* <img
          className={`w-20 h-auto mx-auto`}
          src="/logo/logo-dark.png"
          alt="로고 이미지"
        /> */}

          <p
            className={`${darkMode} ${fontColorA} mt-2 text-3xl font-bold text-center bg-[transparent] relative`}
          >
            <span className={`text-[#9dcaf5]`}>Traveling</span> with
            <br />
            <span className={`text-[50px] mt-10`}>
              <span className={`text-[#9dcaf5]`}>Folio</span>verse
            </span>
          </p>
        </div>

        <div
          className={`max-w-2xl h-auto mx-auto p-5 mb-auto bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] border-slate py-18 rounded-3xl`}
        >
          <form className={`flex flex-col inline-block`}>
            <label className={`${darkMode} ${fontColorA} font-bold my-1`}>
              이름:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1`}
              type="text"
              placeholder="이름"
              onChange={handleNameChange}
            />
            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              이메일:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1`}
              type="email"
              placeholder="이메일"
              onChange={handleEmailChange}
            />

            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              비밀번호:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1`}
              type="password"
              placeholder="비밀번호(숫자, 문자 특수문자 포함 6자 이상)"
              onChange={handlePasswordChange}
            />

            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              비밀번호 확인:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1`}
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleConfirmPasswordChange}
            />

            {errMessage && (
              <div
                className={`p-2 mt-2 rounded text-center bg-red-500 text-white my-1`}
              >
                {errMessage}
              </div>
            )}

            <button
              className={`${`p-2 rounded-2xl border-none bg-black text-white cursor-pointer mt-2 my-1`} ${
                name.length > 0 &&
                isEmailValid &&
                passwordMatch &&
                `bg-blue-500 cursor-pointer`
              }`}
              type="submit"
              onClick={handleSubmit}
            >
              회원가입
            </button>
            <Link
              to="/login"
              className={`inline-block mt-2 mx-2 float-right text-cyan-500`}
            >
              이미 계정이 있나요? 로그인하러 가기
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
