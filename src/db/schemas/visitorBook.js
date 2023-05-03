import { Schema, model } from "mongoose";

//CommentsSchema 정의하기
const VisitorBookSchema = new Schema({
  target_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  write_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
});

const VisitorBookModel = model("VisitorBook", VisitorBookSchema);

export { VisitorBookModel };


