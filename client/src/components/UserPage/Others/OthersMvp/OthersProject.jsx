//담당 : 이승현

const OthersProject = ({ project }) => {
  const formatLink = (link) => {
    if (!/^https?:\/\//i.test(link)) {
      return "https://" + link;
    }
    return link;
  };

  const renderLink = (link) => {
    return (
      <a href={formatLink(link)} target="_blank">
        <span className="ml-2 text-blue-500">{link}</span>
      </a>
    );
  };
  return (
    <ul>
      {project?.map((item) => (
        <li
          key={item._id}
          className="text-black border p-3 rounded mt-2 dark:border-cyan-950"
        >
          <div>
            <p className="flex justify-between mb-2">
              <span className={`text-lg dark:text-white leading-10`}>
                {item.name}({item.division})
              </span>
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
            >
              프로젝트 내용
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-neutral-300 leading-10 whitespace-pre-wrap`}
            >
              {item.description}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
            >
              기간
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-neutral-300 leading-10`}
            >
              {item.date}
            </p>
            <p
              className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
            >
              기술 스택
            </p>
            <p
              className={`mb-2 ml-2 text-neutral-500 dark:text-neutral-300 leading-10 whitespace-pre-wrap`}
            >
              {item.tech_stack}
            </p>
            <div
              className={`mb-2 text-neutral-500 dark:text-neutral-300 leading-10`}
            >
              <span
                className={`text-sm text-neutral-400 dark:text-neutral-600 leading-10`}
              >
                참조 링크
              </span>
              {item.link.split("\n").map((link) => (
                <div key={link}>{renderLink(link)}</div>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OthersProject;
