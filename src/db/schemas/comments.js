const { Schema } = require ("mongoose");

//CommentsSchema 정의하기
const CommentsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    target_user: { type: Schema.Types.ObjectId, ref: 'User' },
    write_user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true }
  }
);

module.exports = CommentsSchema ;


  
  // Table comments {
  //   id objectId [primary key]
  //   target_user ref[users]
  //   write_user ref[users]
  //   content varchar [not null]
  // }
  
