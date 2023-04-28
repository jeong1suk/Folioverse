//담당 : 이승현

import Mvp from "./Mvp";
import Profile from "./Profile";

const mvpList = [
  {
    id: 1,
    title: "학력",
  },
  {
    id: 2,
    title: "프로젝트",
  },
  {
    id: 3,
    title: "수상 이력",
  },
  {
    id: 4,
    title: "자격증",
  },
];

const UserPage = () => {
  return (
    <div className="p-5 flex flex-row">
      <Profile />
      <main className="basis-4/5 ml-5">
        {mvpList.map((item) => (
          <Mvp key={item.id} title={item.title} />
        ))}
      </main>
    </div>
  );
};

export default UserPage;
