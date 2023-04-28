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
    like_user: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    follower_user: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
    profile_image: { type: Buffer, required: true },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export { UserModel };

//   Table users {
//   id objectId [primary key]
//   name varchar [not null]
//   email varchar [not null]
//   password varchar [not null]
//   description varchar
//   like_user ref[users]
//   follow_user ref[users]
//   comments ref[comments]
//   profile_image varchar
//   created_at timestamp
//   updated_at timestamp
// }
