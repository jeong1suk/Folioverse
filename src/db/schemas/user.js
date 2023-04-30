import { Schema, model } from "mongoose";

// UserSchema 정의하기
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    like_user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    follower_user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    profile_image: { type: String },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export { UserModel };


