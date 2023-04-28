//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryFetch, useQueryGet } from "../../utils/useQuery";

const EditProfile = () => {
  const url = import.meta.env.VITE_SERVER_HOST;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);

  const { mutate } = useQueryFetch(url + "/dummy/auth/edit-profile", "post");
  const { data } = useQueryGet(url + "/dummy/auth/user-info", "getMyInfo");

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        body: {
          name,
          description,
        },
      },
      {
        onSuccess: (data) => console.log(data),
      }
    );
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
    }
  }, [data]);

  useEffect(() => {
    setIsValid(name ? true : false);
  }, [name]);

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2">프로필 설정</h1>
      <form className="flex flex-row pt-5">
        <div className="basis-3/4 pr-20">
          <article>
            <label className="text-lg">이름</label>
            <input
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1 dark:text-black focus:outline-gray-300"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </article>
          <article>
            <label className="text-lg">이메일</label>
            <input
              type="text"
              className="block w-full mx-1 mb-5 mt-1 p-1 text-slate-500 font-thin border rounded dark:bg-neutral-300"
              defaultValue={data?.email}
              disabled
            />
          </article>
          <article>
            <label className="text-lg">한줄 소개</label>
            <textarea
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1 dark:text-black focus:outline-gray-300"
              name="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </article>
          <button
            className={`${
              !isValid && "bg-gray-100 dark:bg-neutral-700 cursor-not-allowed"
            } border px-2 py-1 w-full rounded hover:bg-gray-100 dark:hover:bg-neutral-700`}
            onClick={onSubmit}
            disabled={!isValid}
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
    </div>
  );
};

export default EditProfile;
