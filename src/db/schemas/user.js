import { Schema, model } from "mongoose";

// UserSchema 정의하기
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    description: {
      type: String,
    },
    like_user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    follower_user: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    profile_image: { type: String },
    metrics: [{ type: Schema.Types.ObjectId, ref: "DailyMetrics" }],
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
