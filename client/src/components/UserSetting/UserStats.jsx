//담당 : 이승현

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart } from "chart.js/auto";
import { useQueryGet } from "../../utils/useQuery";

Chart.register(CategoryScale);

const UserStats = ({ data }) => {
  const { data: chartData } = useQueryGet(`/user/weekly-metrics`, "getChart", {
    enabled: !!data,
  });

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl border-b-2 pb-2 mb-5 dark:border-neutral-800">
        통계
      </h1>
      <ul className="flex flex-row justify-evenly">
        <li className="flex flex-col">
          <span>총 방문자 수</span>
          <span className="my-2 text-center">{data?.visit_count}</span>
        </li>
        <li className="flex flex-col">
          <span>총 팔로워 수</span>
          <span className="my-2 text-center">{data?.follower_user.length}</span>
        </li>
        <li className="flex flex-col">
          <span>총 좋아요 수</span>
          <span className="my-2 text-center">{data?.like_user.length}</span>
        </li>
      </ul>
      <div>
        <UserChart chartData={chartData?.metrics} />
      </div>
    </div>
  );
};

const UserChart = ({ chartData }) => {
  const chartConfig = useMemo(() => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const labels = [];
    const visitorData = [];
    const followerData = [];
    const likeData = [];

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().slice(0, 10);
      labels.push(dateString);

      const dayData = chartData?.find((item) => item.date === dateString);

      if (dayData) {
        visitorData.push(dayData.visit_count);
        followerData.push(dayData.follow_count);
        likeData.push(dayData.like_count);
      } else {
        visitorData.push(0);
        followerData.push(0);
        likeData.push(0);
      }
    }

    return {
      labels,
      datasets: [
        {
          type: "line",
          label: "방문자수",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 2,
          data: visitorData,
        },
        {
          type: "bar",
          label: "팔로워수",
          backgroundColor: "rgb(255, 99, 132)",
          data: followerData,
          borderColor: "red",
          borderWidth: 2,
        },
        {
          type: "bar",
          label: "좋아요수",
          backgroundColor: "rgb(75, 192, 192)",
          data: likeData,
        },
      ],
    };
  }, [chartData]);

  return (
    <>
      <Line type="line" data={chartConfig} />
    </>
  );
};

export default UserStats;
