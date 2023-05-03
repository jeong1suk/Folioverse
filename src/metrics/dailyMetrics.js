import { Schema, model } from "mongoose";
import { UserModel } from "../db/schemas/user.js";

const dailyMetrics = async () => {
  // 매일 정각마다 실행할 코드
  // 새로운 컬렉션 생성 및 초기화

  //   *** index
  const dailySchema = new Schema({
    date: {
      type: String,
      default: `${new Date().toISOString().substr(0, 10)}`,
      //  2023-05-02
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    follow_count: { type: Number, default: 0 },
    like_count: { type: Number, default: 0 },
    visit_count: { type: Number, default: 0 },
  });
  const DailyMetricsModel = model("DailyMetrics", dailySchema);

  // 모든 유저에 대한 dailyMetrics를 만들어야 한다.
  const users = await UserModel.find({}, { _id: 1, metrics: 1 });

  users.forEach(async (user) => {
    // daily도 만들고, User에도 넣어줘야 하는데, 유저한텐 7일간의 정보만 들어가야 한다.
    const dailyMetrics = await DailyMetricsModel.create({ user_id: user._id });
    if (user.metrics.length >= 7) {
      user.metrics.shift();
    }
    user.metrics.push(dailyMetrics._id);
    await user.save();
  });
};

export default dailyMetrics;
