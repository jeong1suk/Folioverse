// 정원석

import axios from "axios";
import { useState, useEffect } from "react";
import useModalStore from "../../store/modalStore";
import { Link } from "react-router-dom";
import { GoogleButton, KakaoButton } from "./SocialButton";
const host = import.meta.env.VITE_SERVER_HOST;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const fontColorA = "text-white";

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
  const isToken = localStorage.getItem("token");

  useEffect(() => {
    if (isToken) {
      location.href = "/error/auth";
    }
  }, []);

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
    <div className={`min-h-screen bg-black`}>
      <img
        src="/homepage/3.png"
        className={`absolute rotate-180 w-[1440px] top-[-20%] left-[50%] translate-x-[-50%]`}
      />
      <div
        className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[55%] 2xl:w-[50%]`}
      >
        <div className={`h-auto pt-10 mx-auto p-5 mb-auto min-w-screen`}>
          <p
            className={`${fontColorA} mt-2 text-3xl font-bold text-center bg-[transparent] relative`}
          >
            <span className={`text-[#9dcaf5] text-[50px] mr-2`}>Welcome</span>{" "}
            to
            <span className={`text-[50px] mt-10`}>
              <span className={`text-[#9dcaf5] ml-2`}>Folio</span>verse
            </span>
          </p>
        </div>

        <div
          className={`max-w-2xl h-auto mx-auto p-5 mb-auto bg-[rgba(33,33,33,0.8)] backdrop-blur-[10px] border-slate py-18 rounded-3xl`}
        >
          <form className={`flex flex-col`}>
            <label className={`${fontColorA} font-bold p-2`}>이메일:</label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black`}
              type="email"
              placeholder="이메일"
              onChange={handleEmailChange}
            />

            <label className={`${fontColorA} font-bold mt-2 p-2`}>
              비밀번호:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black`}
              type="password"
              placeholder="비밀번호"
              onChange={handlePasswordChange}
            />

            {errMessage && (
              <div
                className={`p-2 mt-2 rounded text-center bg-red-500 text-white my-1`}
              >
                {errMessage}
              </div>
            )}

            <button
              className={`${`p-2 rounded-2xl border-none bg-black text-white cursor-pointer mt-3`} ${
                isEmailValid &&
                isPasswordValid &&
                `bg-blue-500 hover:bg-blue-400 cursor-pointer`
              }`}
              type="submit"
              onClick={handleSubmit}
            >
              로그인
            </button>
          </form>
          <div className="flex justify-center flex-col sm:flex-row mt-2">
            <GoogleButton />
            <KakaoButton />
          </div>

          <Link
            className={`inline-block mt-2 mx-2 lg:mx-0 lg:ml-auto text-cyan-500 cursor-pointer`}
            onClick={() => {
              setModal("", "mail");
            }}
          >
            비밀번호 찾기
          </Link>
          <Link
            to="/sign-up"
            className={`inline-block mt-2 mx-2 float-right text-cyan-500 cursor-pointer`}
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
