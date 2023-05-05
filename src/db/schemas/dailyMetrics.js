import { Schema, model } from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

//   *** index 공부
const dailySchema = new Schema({
  date: {
    type: String,
    default: `${date.toISOString().substr(0, 10)}`,
    //  2023-05-02
  },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  follow_count: { type: Number, default: 0 },
  like_count: { type: Number, default: 0 },
  visit_count: { type: Number, default: 0 },
});
const DailyMetricsModel = model("DailyMetrics", dailySchema);

export { DailyMetricsModel };
