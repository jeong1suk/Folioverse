import styles from "./Network.module.css";

const FilterDropMenu = ({ sortBy, setSortBy, skillStackOptions }) => {
  const stackListHandler = (e) => {
    if (sortBy.techStack.includes(e.target.dataset.value)) {
      let arr = [...sortBy.techStack];
      arr.splice(arr.indexOf(e.target.dataset.value), 1);
      return setSortBy({ ...sortBy, techStack: arr });
    }
    return setSortBy({
      ...sortBy,
      techStack: [...sortBy.techStack, e.target.dataset.value],
    });
  };
  return (
    <>
      <ul
        className={`h-[350px] overflow-y-scroll scroll-hide absolute top-[40px] px-[4px] bg-[#575757] left-[50%] translate-x-[-50%] rounded-lg z-[5]  ${styles.filterDropMenu}`}
      >
        {skillStackOptions.map((option, idx) => {
          return (
            <li
              key={idx}
              data-value={option}
              onClick={stackListHandler}
              className="py-[8px] px-[10px] text-white border-b-[#737373] border-b-[solid] hover:bg-[#6e6e6e] border-b-[1px] cursor-pointer"
            >
              {option}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FilterDropMenu;
