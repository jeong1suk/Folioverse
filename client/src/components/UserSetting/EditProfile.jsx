//담당 : 이승현

import { useEffect, useState } from "react";
import { useQueryPatch } from "../../utils/useQuery";
import { useQueryClient } from "react-query";
import useToastStore from "../../store/toastStore";

const EditProfile = ({ data }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null);

  const queryClient = useQueryClient();
  const { mutate: updateProfile } = useQueryPatch(
    `/user/${data?._id}`,
    "patch"
  );
  const { mutate: uploadImage } = useQueryPatch(`/image`, "patch");

  const setToast = useToastStore((state) => state.setToast);

  const onSubmit = (e) => {
    e.preventDefault();

    const updateProfileData = {
      body: { name, description },
    };

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      uploadImage(
        { body: formData, file: formData.image },
        {
          onSuccess: (data) => {
            updateProfileData.body.profile_image = data.imageUrl;
            updateProfile(updateProfileData, {
              onSuccess: () => {
                queryClient.invalidateQueries("getMyInfo");
                setToast("프로필이 수정되었습니다", "success");
              },
            });
          },
        }
      );
    } else {
      updateProfile(updateProfileData, {
        onSuccess: () => {
          queryClient.invalidateQueries("getMyInfo");
          setToast("프로필이 수정되었습니다", "success");
        },
      });
    }
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
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
      <h1 className="text-2xl border-b-2 pb-2 dark:border-cyan-950">
        프로필 설정
      </h1>
      <form className="flex flex-row pt-5">
        <div className="basis-3/4 pr-20">
          <article>
            <label className="text-lg">이름</label>
            <input
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1 dark:text-black focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </article>
          <article>
            <label className="text-lg">이메일</label>
            <input
              type="text"
              className="block w-full mx-1 mb-5 mt-1 p-1 text-slate-500 font-thin border rounded dark:bg-neutral-700 dark:border-cyan-950"
              defaultValue={data?.email}
              disabled
            />
          </article>
          <article>
            <label className="text-lg">한줄 소개</label>
            <textarea
              className="block border w-full mx-1 mb-5 mt-1 rounded p-1 dark:text-black focus:outline-neutral-500 dark:bg-neutral-900 dark:border-cyan-950 dark:text-neutral-300"
              name="description"
              cols="30"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              placeholder="100자 이내로 작성하세요"
            ></textarea>
          </article>
          <button
            className={`${
              !isValid && "bg-gray-100 dark:bg-neutral-700 cursor-not-allowed"
            } border px-2 py-1 w-full rounded hover:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:border-cyan-950`}
            onClick={onSubmit}
            disabled={!isValid}
          >
            변경
          </button>
        </div>
        <article className=" basis-1/4">
          <h3 className="text-lg mb-3">프로필 사진</h3>
          <div className="grid justify-items-center relative">
            <img
              className="rounded-full object-cover w-24 h-24 lg:w-40 lg:h-40"
              src={
                previewUrl
                  ? previewUrl
                  : `${data?.profile_image ?? "/profile/profile-dark.png"}`
              }
              alt="프로필 사진"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="imageUpload"
              onChange={onImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="border mt-3 lg:absolute bottom-0 left-3 px-2 py-1 bg-white text-black rounded hover:bg-gray-100 cursor-pointer dark:border-cyan-950 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
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
