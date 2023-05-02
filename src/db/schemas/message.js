//담당 : 이승현

import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  sendUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  targetUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: new Date() },
});

const MessageModel = model("Message", MessageSchema);

export { MessageModel };
