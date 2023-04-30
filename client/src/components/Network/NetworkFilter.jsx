// 정주현

import styles from "./Network.module.css";

function NetworkFilter({ sortBy, setSortBy }) {
  function handleFilter(e) {
    if (sortBy.includes(e.target.value)) {
      console.log(e.target.value);
      let newArr = [...sortBy];
      newArr.splice(newArr.indexOf(e.target.value), 1);
      return setSortBy(newArr);
    } else {
      console.log(e.target.value);
      let newArr = [...sortBy];
      newArr.push(e.target.value);
      return setSortBy(newArr);
    }
  }

  const filterItemStyle =
    "text-xs font-light text-[white] bg-[#bababa] px-[10px] py-[5px] mx-[5px] rounded-[10px] dark:bg-[#666666]";
  const btnDisabled = `bg-transparent font-light text-sm text-black m-[3px] px-3.5 py-[3px] rounded-[20px] ${styles.disabledFilterBorder} dark:text-[#b5b5b5]`;
  const btnEnabled = `bg-transparent font-light text-sm text-black m-[3px] px-3.5 py-[3px] rounded-[20px] ${styles.enabledFilterBorder} dark:text-[#b5b5b5] dark:bg-[rgba(26,26,26,1)]`;
  return (
    <div
      className={`w-[1150px] h-auto mt-2.5 m-auto p-2.5 rounded-[5px] bg-transparent text-black dark:text-white`}
    >
      <h2 className="ml-[10px]">필터</h2>
      <div className={`mt-[5px]`}>
        <button
          className={sortBy.includes("비전공자") ? btnEnabled : btnDisabled}
          value="비전공자"
          onClick={handleFilter}
        >
          비전공자
        </button>
        <button
          className={sortBy.includes("전공자") ? btnEnabled : btnDisabled}
          value="전공자"
          onClick={handleFilter}
        >
          전공자
        </button>
        <button
          className={sortBy.includes("신입개발자") ? btnEnabled : btnDisabled}
          value="신입개발자"
          onClick={handleFilter}
        >
          신입개발자
        </button>
        <button
          className={sortBy.includes("경력개발자") ? btnEnabled : btnDisabled}
          value="경력개발자"
          onClick={handleFilter}
        >
          경력개발자
        </button>
        <button
          className={sortBy.includes("숙련개발자") ? btnEnabled : btnDisabled}
          value="숙련개발자"
          onClick={handleFilter}
        >
          숙련개발자(8년 이상)
        </button>
      </div>
      <div className="mt-[10px]">
        {sortBy.length > 0 &&
          sortBy.map((item, index) => {
            return (
              <button
                key={index}
                className={filterItemStyle}
                onClick={handleFilter}
                value={item}
              >
                {item}
              </button>
            );
          })}
      </div>
    </div>
  );
}
export default NetworkFilter;
