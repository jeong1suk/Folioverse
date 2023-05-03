// 정주현

function NetworkFilter({ sortBy, setSortBy }) {
  function handleFilter(e) {
    if (sortBy.includes(e.target.value)) {
      let newArr = [...sortBy];
      newArr.splice(newArr.indexOf(e.target.value), 1);
      return setSortBy(newArr);
    } else {
      let newArr = [...sortBy];
      newArr.push(e.target.value);
      return setSortBy(newArr);
    }
  }
  const bgColor = "bg-white dark:bg-[#1a1a1a]";
  const boxColor = "bg-[#d8d8d8] dark:bg-[#333333]";
  const borderColor = "border-solid border-[#9b9b9b] dark:border-[#575757]";
  const fontColorA = "text-[#3e3e3e] dark:text-[#fff]";

  const filterItemStyle = `text-xs font-light ${fontColorA} ${boxColor} px-[10px] py-[5px] mx-[5px] rounded-[10px]`;
  const btnDisabled = `box-border border bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px]  `;
  const btnEnabled = `bg-transparent font-light text-sm m-[3px] px-3.5 py-[3px] rounded-[20px] box-border border ${borderColor} ${bgColor} ${fontColorA}`;
  return (
    <div
      className={`w-[1150px] h-auto mt-2.5 m-auto p-2.5 rounded-[5px] bg-transparent ${fontColorA}`}
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
          경력개발자(1년 이상)
        </button>
        <button
          className={sortBy.includes("숙련개발자") ? btnEnabled : btnDisabled}
          value="숙련개발자"
          onClick={handleFilter}
        >
          숙련개발자(5년 이상)
        </button>
        {/* 프론트, 백엔드, 풀스택 추가 */}
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
