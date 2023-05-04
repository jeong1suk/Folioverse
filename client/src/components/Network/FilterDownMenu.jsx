import styles from "./Network.module.css";

const FilterDropMenu = ({ techStackList, setTechStackList }) => {
  console.log(techStackList);
  const stackListHandler = (e) => {
    let selectedStackArr = techStackList;
    if (selectedStackArr.includes(e.target.dataset.value)) {
      selectedStackArr.splice(
        selectedStackArr.indexOf(e.target.dataset.value),
        1
      );
    } else {
      selectedStackArr.push(e.target.dataset.value);
    }
    return setTechStackList(selectedStackArr);
  };
  const skillStackOptions = [
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "JQuery",
    "NodeJs",
    "ExpressJs",
    "NestJs",
    "NextJS",
    "Remix",
    "SvelteKit",
    "Python",
    "Django",
    "Flask",
    "FastApi",
    "Java",
    "Spring",
    "ReactNative",
    "Fluter",
    "Kotilin",
    "Swift",
    "Docker",
    "AWS",
    "Firebase",
    "Dart",
    "Rust",
    "C",
    "C++",
    "C#",
    "Git",
    "GitHub",
    "RestAPI",
    "GraphQL",
    "Linux",
    "TensorFlow",
  ];
  return (
    <>
      <ul
        className={`h-[350px] overflow-y-scroll scroll-hide absolute top-[40px] px-[15px] bg-[#575757] left-[50%] translate-x-[-50%] rounded-lg z-[5]  ${styles.filterDropMenu}`}
      >
        {skillStackOptions.map((option, idx) => {
          return (
            <li
              key={idx}
              data-value={option}
              onClick={stackListHandler}
              className="py-[8px] text-white border-b-[#737373] border-b-[solid] border-b-[1px] cursor-pointer"
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
