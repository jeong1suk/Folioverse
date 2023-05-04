//담당 : 이승현

import useModalStore from "../../store/modalStore";
import useStyleClassStore from "../../store/styleClassStore";

const PostList = ({ id }) => {
  const setModal = useModalStore((state) => state.setModal);
  const pointColor = useStyleClassStore((state) => state.pointColor);
  return (
    <div className="text-center mt-3">
      <button
        data-dropdown-toggle="dropdownSearch"
        data-dropdown-placement="bottom"
        className={
          "w-full text-black border dark:border-0 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-black " +
          pointColor
        }
        type="button"
        onClick={() => setModal(id, "post")}
      >
        글 목록 보기
      </button>
    </div>
  );
};

export default PostList;
