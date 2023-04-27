const { Schema } = require ("mongoose");

//FollowSchema 정의하기
const FollowSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    targer_user:{ ref:'User'},
    like_user:{ref:'User'},
  }
);

module.exports = FollowSchema ;
  
  // Table follow {
  //   id objectId [primary key]
  //   target_user ref[users]
  //   follow_user ref[users]
  // }
  
