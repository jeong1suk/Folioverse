//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryFetch, useQueryGet } from "../../utils/useQuery";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const { data } = useQueryGet("/user/current", "getMyInfo");
  const { mutate } = useQueryFetch(`/user/${data?._id}`, "patch");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }
    mutate(
      { body: formData, file: formData.image },
      {
        onSuccess: () => queryClient.invalidateQueries("getMyInfo"),
      }
    );
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
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
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={onImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="border absolute bottom-0 left-3 px-2 py-1 bg-white text-black rounded hover:bg-gray-100 cursor-pointer"
            >
              사진 변경
            </label>
          </div>
        </article>
      </form>
    </div>
  );
};

export default EditProfile;
