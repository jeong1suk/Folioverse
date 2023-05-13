import styles from "./Network.module.css";

const FilterDropMenu = ({ sortBy, setSortBy, skillStackOptions }) => {
  const stackListHandler = (e) => {
    const value = e.target.dataset.value;
    const updatedTechStack = sortBy.techStack.includes(value)
      ? sortBy.techStack.filter((tech) => tech !== value)
      : [...sortBy.techStack, value];

    setSortBy({ ...sortBy, techStack: updatedTechStack });
  };
  const renderMenuItem = (option, idx) => (
    <li
      key={idx}
      data-value={option}
      onClick={stackListHandler}
      className="py-[8px] px-[10px] text-white border-b-[#737373] border-b-[solid] transition-all ease-in duration-75 hover:bg-[#6e6e6e] border-b-[1px] cursor-pointer"
    >
      {option}
    </li>
  );

  return (
    <ul
      className={`h-[350px] overflow-y-scroll scroll-hide absolute top-[40px] px-[4px] bg-[#575757] left-[50%] translate-x-[-50%] rounded-lg z-[5] ${styles.filterDropMenu}`}
    >
      {skillStackOptions.map(renderMenuItem)}
    </ul>
  );
};

export default FilterDropMenu;
