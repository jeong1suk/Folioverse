//담당 : 이승현

const OthersEducation = ({ education }) => {
  return (
    <ul>
      {education?.map((item) => (
        <li
          key={item._id}
          className="text-black border p-3 rounded mt-2 dark:border-cyan-950"
        >
          <div>
            <p className="flex justify-between mb-2">
              <span className={`text-lg dark:text-white leading-10`}>
                {item.school_name}({item.graduate_status})
              </span>
            </p>
            <p
              className={`ml-2 mb-2 text-neutral-500 dark:text-neutral-300 leading-10`}
            >
              {item.major}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OthersEducation;
