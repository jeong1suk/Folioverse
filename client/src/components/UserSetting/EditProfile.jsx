//담당 : 이승현

import { useEffect, useState } from "react";
import { useGetAxios } from "../../utils/useQuery";

const EditProfile = () => {
  const url = import.meta.env.VITE_SERVER_HOST;
  const { data } = useGetAxios(url + "/dummy/auth/user-info", "getMyInfo");
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  useState(() => {
    setName(data?.name);
    setDescription(data?.description);
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description);
  };

  return (
    <>
      <h1 className="text-2xl border-b-2 pb-2">프로필 설정</h1>
      <form className="flex flex-row pt-5">
        <div className="basis-3/4 pr-20">
          <article>
            <label className="text-lg">이름</label>
            <input
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </article>
          <article>
            <label className="text-lg">이메일</label>
            <input
              type="text"
              className="block w-full mx-1 mb-5 mt-1 p-1 text-slate-500 font-thin border rounded"
              defaultValue={data?.email}
              disabled
            />
          </article>
          <article>
            <label className="text-lg">한줄 소개</label>
            <textarea
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </article>
          <button
            className="border px-2 py-1 w-full rounded hover:bg-gray-100"
            onClick={onSubmit}
          >
            변경
          </button>
        </div>
        <article className=" basis-1/4">
          <h3 className="text-lg mb-3">프로필 사진</h3>
          <div className="grid justify-items-center relative">
            <img className="rounded-full" src="/cat.png" alt="프로필 사진" />
            <button className="border absolute bottom-0 left-3 px-2 py-1 bg-white text-black rounded hover:bg-gray-100">
              수정
            </button>
          </div>
        </article>
      </form>
    </>
  );
};

export default EditProfile;
