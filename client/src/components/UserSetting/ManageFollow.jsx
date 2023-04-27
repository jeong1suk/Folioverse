//담당 : 이승현

import { useState } from "react";

const ManageFollow = () => {
  const [tab, setTab] = useState(true);

  return (
    <>
      <h1 className="text-2xl border-b-2 pb-2">팔로우 관리</h1>
      <nav className="mt-3">
        <ul className="flex flex-row">
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg ${
              tab && "bg-gray-100 border-b-0"
            }`}
          >
            <button className="w-full" onClick={() => setTab(true)}>
              내가 팔로우한 유저
            </button>
          </li>
          <li
            className={`basis-1/2 text-center p-2 border rounded-t-lg ${
              !tab && "bg-gray-100 border-b-0"
            }`}
          >
            <button className="w-full" onClick={() => setTab(false)}>
              나를 팔로우한 유저
            </button>
          </li>
        </ul>
      </nav>
      <section className={`${!tab && "hidden"}`}>
        <ul>
          <li>내가 팔로우한 유저1</li>
          <li>내가 팔로우한 유저2</li>
          <li>내가 팔로우한 유저3</li>
        </ul>
      </section>
      <section className={`${tab && "hidden"}`}>
        <ul>
          <li>나를 팔로우한 유저1</li>
          <li>나를 팔로우한 유저2</li>
          <li>나를 팔로우한 유저3</li>
        </ul>
      </section>
    </>
  );
};

export default ManageFollow;
