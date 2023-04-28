import { Schema, model } from "mongoose";

//FollowSchema 정의하기
const FollowSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targer_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  like_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const FollowModel = model("Follow", FollowSchema);

export { FollowModel };

// Table follow {
//   id objectId [primary key]
//   target_Follow ref[users]
//   follow_user ref[users]
// }
