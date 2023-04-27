const { Schema } = require ("mongoose");

//LikeSchema 정의하기
const LikeSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    targer_user:{ ref:'User'},
    like_user:{ref:'User'},
  }
);

module.exports = LikeSchema ;


  
  // Table like {
  //   id objectId [primary key]
  //   target_user ref[users]
  //   like_user ref[users]
  // }
  
  
  // Table follow {
  //   id objectId [primary key]
  //   target_user ref[users]
  //   follow_user ref[users]
  // }
  