import { User } from "../db/models/User.js";
import { DailyMetrics } from "../db/models/DailyMetrics.js";

const dailyMetrics = async () => {
  // 매일 정각마다 실행할 코드
  // 새로운 컬렉션 생성 및 초기화
  try {
    const users = User.findAll("metrics");
    await DailyMetrics.createWholeUsersMetrics(users);
  } catch (err) {
    console.log(err);
  }
};

export default dailyMetrics;
