//담당 : 이승현

const OthersCertificate = ({ certificate }) => {
  return (
    <ul>
      {certificate?.map((item) => (
        <li
          key={item._id}
          className="text-black border p-3 rounded mt-2 dark:border-cyan-950"
        >
          <div>
            <p className="flex justify-between mb-2">
              <span className={`text-lg dark:text-white leading-10`}>
                {item.name}
              </span>
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
            >
              취득일
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-neutral-300 leading-10`}
            >
              {item.date}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
            >
              발급 기관
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-neutral-300 leading-10`}
            >
              {item.agency}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OthersCertificate;
