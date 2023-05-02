import { Schema, model } from "mongoose";

//CommentsSchema 정의하기
const CommentsSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target_user: { type: Schema.Types.ObjectId, ref: "User" },
  write_user: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
});

const CommentsModel = model("Comments", CommentsSchema);

export { CommentsModel };


