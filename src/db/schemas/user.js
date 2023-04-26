const { Schema } = require ("mongoose");

//UserSchema 정의하기
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, required: true },
    description: { type: String, required: false, default: "설명이 아직 없습니다. 추가해 주세요." },
    like_user: { type: String, ref : 'Users', required: true },
    follower_user: { type: String, ref : 'Users', required: true },
    comments: { type: String, ref : 'Comments', required: true },
    profile_image: { type: String, required: true }, //이미지인데 왜 문자열로 받아와????
    created_at: { timestamps: true },
    update_at: { timestamps: true },
  }
);

module.exports = UserSchema ;
