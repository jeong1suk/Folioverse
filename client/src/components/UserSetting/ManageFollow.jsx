//담당 : 이승현

import { useState } from "react";

const ManageFollow = () => {
  const [tab, setTab] = useState(true);

  return (
    <>
      <h1>팔로우 관리</h1>
      <nav>
        <ul className="border flex flex-row">
          <li className="basis-1/2 text-center border">
            <button className="w-full" onClick={() => setTab(true)}>
              내가 팔로우한 유저
            </button>
          </li>
          <li className="basis-1/2 text-center border">
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
