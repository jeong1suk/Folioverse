import { Schema, model } from "mongoose";

//LikeSchema 정의하기
const LikeSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targer_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  like_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const LikeModel = model("Like", LikeSchema);

export { LikeModel };

// Table like {
//   id objectId [primary key]
//   target_user ref[users]
//   like_user ref[users]
// }

// Table follow {
//   id objectId [primary key]
//   target_user ref[users]
//   follow_user ref[users]
// }
