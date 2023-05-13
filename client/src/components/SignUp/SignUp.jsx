// 정원석

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const host = import.meta.env.VITE_SERVER_HOST;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  //아래는 각 필드의 유효성에 대한 상태값
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [isValid, setIsValid] = useState(false);

  //유효성 검사 로직
  const emailValidator = (email) =>
    RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email);
  const passwordValidator = (password) =>
    RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/
    ).test(password);
  const nameValidator = (name) => RegExp(/^[a-zA-Z가-힣\s]{2,20}$/).test(name);

  //각 필드에 값이 입력될 때마다 검사를 진행해서 set된 valid값을 기준으로 각 필드의 스타일을 변경함
  useEffect(() => {
    setNameValid(nameValidator(name));
    setEmailValid(emailValidator(email));
    setPasswordValid(passwordValidator(password));
    setConfirmPasswordValid(password === confirmPassword);
  }, [name, email, password, confirmPassword]);

  //각 필드의 유효성 값이 변했을 때 최종적으로 isValid에 대한 값을 세팅하며 버튼의 상태를 제어함
  useEffect(() => {
    if (nameValid && emailValid && passwordValid && confirmPasswordValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [nameValid, emailValid, passwordValid, confirmPasswordValid]);

  const darkMode = "text-[#212121] dark:text-white";
  const fontColorA = "text-white";

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isToken = localStorage.getItem("token");

  useEffect(() => {
    if (isToken) {
      location.href = "/error/auth";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMessage("");

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
        className={`absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[55%] 2xl:w-[50%]`}
      >
        <div className={`h-auto pt-10 mx-auto p-5 mb-auto min-w-screen`}>
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
              className={`p-2 border border-solid border-slate rounded outline-black my-1 ${
                name && !nameValid && "border-red-500 outline-red-500"
              }`}
              type="text"
              placeholder="이름"
              onChange={handleNameChange}
              maxLength={12}
            />
            {name && !nameValid && (
              <p className={`text-red-500`}>2글자 이상 입력해주세요.</p>
            )}
            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              이메일:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1 ${
                email && !emailValid && "border-red-500 outline-red-500"
              }`}
              type="email"
              placeholder="이메일"
              onChange={handleEmailChange}
              maxLength={250}
            />
            {email && !emailValid && (
              <p className={`text-red-500`}>이메일 형식을 맞춰주세요.</p>
            )}

            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              비밀번호:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1 ${
                password && !passwordValid && "border-red-500 outline-red-500"
              }`}
              type="password"
              placeholder="비밀번호(숫자, 문자 특수문자 포함 6자 이상)"
              onChange={handlePasswordChange}
              maxLength={18}
            />
            {password && !passwordValid && (
              <p className={`text-red-500`}>
                비밀번호(숫자, 문자, 특수문자 포함 6자 이상)
              </p>
            )}

            <label className={`${darkMode} ${fontColorA} font-bold mt-3 my-1`}>
              비밀번호 확인:
            </label>
            <input
              className={`p-2 border border-solid border-slate rounded outline-black my-1 ${
                confirmPassword &&
                !confirmPasswordValid &&
                "border-red-500 outline-red-500"
              }`}
              type="password"
              placeholder="비밀번호 확인"
              onChange={handleConfirmPasswordChange}
              maxLength={18}
            />
            {confirmPassword && !confirmPasswordValid && (
              <p className={`text-red-500`}>비밀번호가 일치하지 않습니다.</p>
            )}

            {errMessage && (
              <div
                className={`p-2 mt-2 rounded text-center bg-red-500 text-white my-1`}
              >
                {errMessage}
              </div>
            )}

            <button
              className={`${`p-2 rounded-2xl border-none bg-black text-white mt-2 my-1`} ${`bg-blue-500`} ${
                !isValid && "bg-neutral-300 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!isValid}
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
