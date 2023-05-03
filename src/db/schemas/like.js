import { Schema, model } from "mongoose";

//LikeSchema 정의하기
const LikeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
