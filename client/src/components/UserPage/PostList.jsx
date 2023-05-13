//담당 : 이승현

import useModalStore from "../../store/modalStore";

const PostList = ({ id }) => {
  const setModal = useModalStore((state) => state.setModal);
  return (
    <div className="text-center mt-3">
      <button
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className={
          "w-full mt-1 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2"
        }
        type="button"
        onClick={() => setModal(id, "post")}
      >
        미니 블로그
      </button>
    </div>
  );
};

export default PostList;
