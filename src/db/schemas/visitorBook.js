//담당 : 이승현

import { Schema, model } from "mongoose";

const VisitorBookSchema = new Schema({
  target_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  write_user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
});

const VisitorBookModel = model("VisitorBook", VisitorBookSchema);

export { VisitorBookModel };
