//담당 : 이승현

import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
});

const PostModel = model("Post", PostSchema);

export { PostModel };
