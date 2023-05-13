//담당 : 이승현

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useQueryDelete, useQueryPatch } from "../../utils/useQuery";
import useModalStore from "../../store/modalStore";
import useToastStore from "../../store/toastStore";
import useThemeStore from "../../store/themeStore";

const Profile = ({ myInfo, othersInfo, followInfo, likeInfo }) => {
  const params = useParams();
  const isToken = localStorage.getItem("token");
  const profileSrc = othersInfo
    ? othersInfo?.profile_image
    : myInfo?.profile_image;
  const name = othersInfo ? othersInfo?.name : myInfo?.name;
  const email = othersInfo ? othersInfo?.email : myInfo?.email;
  const description = othersInfo
    ? othersInfo?.description
    : myInfo?.description;

  const [followCount, setFollowCount] = useState();
  const [likeCount, setLikeCount] = useState();

  useEffect(() => {
    if (params?.id) {
      setFollowCount(othersInfo?.follower_user.length);
      setLikeCount(othersInfo?.like_user.length);
    } else {
      setFollowCount(myInfo?.follower_user.length);
      setLikeCount(myInfo?.like_user.length);
    }
  }, [othersInfo, myInfo, params]);

  const theme = useThemeStore((state) => state.theme);

  return (
    <aside
      className={
        "border rounded-2xl p-5 h-fit relative dark:bg-[#4e4e4e61] dark:border-neutral-600"
      }
    >
      <div className={othersInfo && isToken ? "block" : "hidden"}>
        <MessageIcon id={othersInfo?._id} name={othersInfo?.name} />
      </div>
      <img
        className="w-20 h-20 rounded-full mx-auto mb-5 object-cover"
        src={
          profileSrc ??
          (!theme ? "/profile/profile-dark.png" : "/profile/profile-light.png")
        }
      />
      <p className="text-center text-xl font-bold dark:text-white">{name}</p>
      <p className="text-center text-neutral-500">{email}</p>
      <p className="text-center dark:text-neutral-200 my-3">
        {description ?? "소개가 없습니다"}
      </p>
      <div className="flex flex-row text-neutral-500 my-5">
        <div className="basis-1/2 text-center">
          <div>{followCount}</div>
          <div>팔로워</div>
        </div>
        <div className="basis-1/2 text-center">
          <div>{likeCount}</div>
          <div>좋아요</div>
        </div>
      </div>
      <p className="text-center text-sm mt-3 text-blue-400">
        <Link
          className={`hover:bg-neutral-100 dark:hover:bg-neutral-700 p-5 rounded ${
            othersInfo && "hidden"
          }`}
          to="/user-setting"
        >
          Edit
        </Link>
      </p>
      <div
        className={`${
          othersInfo && isToken ? "block" : "hidden"
        } flex justify-center`}
      >
        <ButtonGroup followInfo={followInfo} likeInfo={likeInfo} />
      </div>
    </aside>
  );
};

const MessageIcon = ({ id, name }) => {
  const setModal = useModalStore((state) => state.setModal);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="absolute right-5 rounded w-8 h-8 text-black dark:text-white cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600"
      onClick={() => setModal(id, "message", name)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
};

const ButtonGroup = ({ followInfo, likeInfo }) => {
  const params = useParams();
  const { mutate: doFollow, isLoading: loadingFollow } = useQueryPatch(
    `/follow/${params.id}`,
    "post"
  );
  const { deleteMutate: unFollow, isLoading: loadingUnFollow } =
    useQueryDelete("/follow");

  const { mutate: doLike, isLoading: loadingLike } = useQueryPatch(
    `/like/${params.id}`,
    "post"
  );
  const { deleteMutate: unLike, isLoading: loadingUnlike } =
    useQueryDelete("/like");

  const setToast = useToastStore((state) => state.setToast);

  const queryClient = useQueryClient();

  const handleFollow = () => {
    if (followInfo) {
      unFollow(params.id, {
        onSuccess: () => {
          queryClient.invalidateQueries("getFollowInfo");
          queryClient.invalidateQueries("getMyInfo");
          queryClient.invalidateQueries("getOthersInfo");
          setToast("팔로우를 취소하였습니다", "success");
        },
      });
    } else {
      doFollow(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries("getFollowInfo");
            queryClient.invalidateQueries("getMyInfo");
            queryClient.invalidateQueries("getOthersInfo");
            setToast("유저를 팔로우하였습니다", "success");
          },
        }
      );
    }
  };

  const handleLike = () => {
    if (likeInfo) {
      unLike(params.id, {
        onSuccess: () => {
          queryClient.invalidateQueries("getLikeInfo");
          queryClient.invalidateQueries("getMyInfo");
          queryClient.invalidateQueries("getOthersInfo");
          setToast("좋아요를 취소하였습니다", "success");
        },
      });
    } else {
      doLike(
        {},
        {
          onSuccess: () => {
            queryClient.invalidateQueries("getLikeInfo");
            queryClient.invalidateQueries("getMyInfo");
            queryClient.invalidateQueries("getOthersInfo");
            setToast("유저를 좋아합니다", "success");
          },
        }
      );
    }
  };

  return (
    <>
      <button
        onClick={handleFollow}
        className="relative mx-5 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        disabled={loadingFollow || loadingUnFollow}
      >
        <span
          className={`relative flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${
            followInfo && "bg-gradient-to-br dark:bg-gradient-to-br"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${followInfo && "text-white"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </span>
      </button>
      <button
        onClick={handleLike}
        className="relative mx-5 inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
        disabled={loadingLike || loadingUnlike}
      >
        <span
          className={`relative flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ${
            likeInfo && "bg-gradient-to-br dark:bg-gradient-to-br"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 ${likeInfo && "text-white"}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
        </span>
      </button>
    </>
  );
};

export default Profile;
