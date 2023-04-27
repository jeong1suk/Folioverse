//담당 : 이승현

import { useState } from "react";
import { usePostAxios } from "../../utils/useQuery";

const EditUserInfo = () => {
  const url = import.meta.env.VITE_SERVER_HOST;
  const [content, setContent] = useState(false);
  const [password, setPassword] = useState("");
  const { mutate } = usePostAxios(url + "/dummy/auth/check-password");

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      { body: { password: password } },
      {
        onSuccess: (data) => {
          data && setContent(true), setPassword("");
        },
      }
    );
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
                className="border mx-1 mt-3 rounded p-1 text-black"
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
          <EditContent content={content} setContent={setContent} />
        </div>
      </section>
    </div>
  );
};

const EditContent = ({ content, setContent }) => {
  const url = import.meta.env.VITE_SERVER_HOST;
  const { mutate } = usePostAxios(url + "/dummy/auth/change-password");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    mutate({ body: { password } }, { onSuccess: (data) => console.log(data) });
    setContent(false);
  };

  return (
    <div className={`${!content && "hidden"}`}>
      <form>
        <h3 className="text-xl mb-3">비밀번호 변경</h3>
        <label>새 비밀번호</label>
        <input
          className="block border w-full mb-5 mt-1 rounded p-1 dark:text-black"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>비밀번호 확인</label>
        <input
          className="block border w-full mb-5 mt-1 rounded p-1 dark:text-black"
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button
          className="border py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
          onClick={onSubmit}
        >
          변경
        </button>
      </form>
      <article className="mt-5">
        <h3 className="text-xl mb-3">회원 탈퇴</h3>
        <button className="p-2 bg-red-400 text-white rounded hover:bg-red-500">
          정말 회원에서 탈퇴하시겠습니까?
        </button>
      </article>
    </div>
  );
};

export default EditUserInfo;
