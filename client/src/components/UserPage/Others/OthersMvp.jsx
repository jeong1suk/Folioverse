//담당 : 이승현

import OthersAward from "./OthersMvp/OthersAward";
import OthersCertificate from "./OthersMvp/OthersCertificate";
import OthersEducation from "./OthersMvp/OthersEducation";
import OthersProject from "./OthersMvp/OthersProject";

const OthersMvp = ({ title, data }) => {
  return (
    <section className="border rounded p-5 mb-5 dark:border-cyan-950">
      <h1 className="text-xl font-bold dark:text-white">{title}</h1>
      <article>
        {(title === "학력" && (
          <OthersEducation education={data?.education} />
        )) ||
          (title === "프로젝트" && <OthersProject project={data?.project} />) ||
          (title === "수상 이력" && <OthersAward award={data?.award} />) ||
          (title === "자격증" && (
            <OthersCertificate certificate={data?.certificate} />
          ))}
      </article>
    </section>
  );
};

export default OthersMvp;
