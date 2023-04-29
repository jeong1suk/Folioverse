//담당 : 이승현

import { useEffect, useRef, useState } from "react";
import { useQueryFetch } from "../../utils/useQuery";
import { useQueryDelete } from "../../utils/useQuery";
import useToastStore from "../../store/toastStore";
import useModalStore from "../../store/modalStore";

const EditUserInfo = ({ data }) => {
  const [content, setContent] = useState(false);
  const [password, setPassword] = useState("");
  const { mutate } = useQueryFetch(`/auth/check-password`, "patch");

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      { body: { password } },
      {
        onSuccess: (data) => {
          data && setContent(true);
        },
      }
    );
    setPassword("");
  };

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2">회원 정보 수정</h1>
      <section className="pt-5">
        <div className="pr-20">
          <article className={`${content && "hidden"}`}>
            <label className="text-lg block">현재 비밀번호를 입력하세요</label>
            <form>
              <input
                className="border mx-1 mt-3 rounded p-1 text-black focus:outline-gray-300"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                className="border py-1 px-3 rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
                onClick={onSubmit}
              >
                확인
              </button>
            </form>
          </article>
          <EditContent content={content} setContent={setContent} data={data} />
        </div>
      </section>
    </div>
  );
};

const EditContent = ({ content, setContent, data }) => {
  const { mutate } = useQueryFetch(`/user/${data?._id}`, "patch");
  const formRef = useRef();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordVaild, setPasswordVaild] = useState(true);
  const [password2Vaild, setPassword2Vaild] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const setToast = useToastStore((state) => state.setToast);
  const setModal = useModalStore((state) => state.setModal);

  const passwordValidator = (password) =>
    RegExp(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,18}$/
    ).test(password);

  const onSubmit = (e) => {
    e.preventDefault();

    mutate(
      { body: { password } },
      {
        onSuccess: () => {
          setToast("비밀번호가 변경되었습니다", true);
          formRef.current.reset();
        },
      }
    );
  };

  useEffect(() => {
    setPasswordVaild(!password || passwordValidator(password) ? true : false);
    setPassword2Vaild(!password2 || password === password2 ? true : false);

    if (password && passwordValidator(password) && password === password2) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, password2]);

  const defaultInputStyle = "focus:outline-neutral-300 focus:outline-gray-300";
  const validInputStyle = "border-green-500 outline-green-500";
  const invalidInputStyle = "border-red-500 outline-red-500";

  return (
    <div className={`${!content && "hidden"}`}>
      <form ref={formRef}>
        <h3 className="text-xl mb-3">비밀번호 변경</h3>
        <label>새 비밀번호</label>
        <input
          className={`${
            !password
              ? defaultInputStyle
              : passwordVaild
              ? validInputStyle
              : invalidInputStyle
          } block border w-full mb-5 mt-1 rounded p-1 dark:text-black`}
          type="password"
          placeholder="••••••••"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={`${passwordVaild && "hidden"} text-red-500 mb-5`}>
          비밀번호 형식을 확인하세요
        </p>
        <label>비밀번호 확인</label>
        <input
          className={`${
            !password2
              ? defaultInputStyle
              : password2Vaild
              ? validInputStyle
              : invalidInputStyle
          } block border w-full mb-5 mt-1 rounded p-1 dark:text-black`}
          type="password"
          placeholder="••••••••"
          autoComplete="off"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className={`${password2Vaild && "hidden"} text-red-500 mb-5`}>
          비밀번호가 일치하지 않습니다
        </p>
        <button
          className={`${
            !isValid && "bg-gray-100 dark:bg-neutral-700 cursor-not-allowed"
          } border py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700`}
          onClick={onSubmit}
          disabled={!isValid}
        >
          변경
        </button>
      </form>
      <article className="mt-5">
        <h3 className="text-xl mb-3">회원 탈퇴</h3>
        <button
          className="p-2 text-white rounded bg-red-500 hover:bg-red-600"
          onClick={() => {
            setModal(data?._id);
          }}
        >
          정말 회원에서 탈퇴하시겠습니까?
        </button>
      </article>
    </div>
  );
};

export default EditUserInfo;
