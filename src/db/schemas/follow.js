const { Schema } = require ("mongoose");

//UserSchema 정의하기
const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    like_user: {
      type: String,
      required: true,
    },
    follower_user: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    profile_image: {
      type: String,
      required: true,
    },
    created_at: {
      timestamps: true,
    },

    update_at: {
      timestamps: true,
    },
  }
);

module.exports = UserSchema ;
