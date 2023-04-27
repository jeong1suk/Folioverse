//담당 : 이승현

import { useState } from "react";

const EditUserInfo = () => {
  const [content, setContent] = useState(false);
  return (
    <>
      <h1 className="text-2xl border-b-2 pb-2">회원 정보 수정</h1>
      <section className="pt-5">
        <div className="pr-20">
          <article className={`${content && "hidden"}`}>
            <label className="text-lg block">현재 비밀번호를 입력하세요</label>
            <input
              className="border mx-1 mt-3 rounded p-1"
              type="password"
              placeholder="••••••••"
            />
            <button
              className="border py-1 px-3 rounded hover:bg-gray-100"
              onClick={() => setContent(true)}
            >
              확인
            </button>
          </article>
          <EditContent content={content} />
        </div>
      </section>
    </>
  );
};

const EditContent = ({ content }) => {
  return (
    <div className={`${!content && "hidden"}`}>
      <article>
        <h3 className="text-xl mb-3">비밀번호 변경</h3>
        <label>새 비밀번호</label>
        <input
          className="block border w-full mb-5 mt-1 rounded p-1"
          type="password"
          placeholder="••••••••"
        />
        <label>비밀번호 확인</label>
        <input
          className="block border w-full mb-5 mt-1 rounded p-1"
          type="password"
          placeholder="••••••••"
        />
        <button className="border py-1 px-2 rounded hover:bg-gray-100">
          변경
        </button>
      </article>
      <article className="mt-5">
        <h3 className="text-xl mb-3">회원 탈퇴</h3>
        <button className="border p-2 bg-red-400 text-white rounded hover:bg-red-500">
          정말 회원에서 탈퇴하시겠습니까?
        </button>
      </article>
    </div>
  );
};

export default EditUserInfo;
