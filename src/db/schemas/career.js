const { Schema } = require ("mongoose");

//CareerSchema 정의하기
const CareerSchema = new Schema(
  {
    yearly: {type: Number, required: true},
    job: {type: String, required: true},
  }
);

module.exports = CareerSchema ;

  
  // Table career {
  //   id objectId [primary key]
  //   yearly integer [not null]
  //   job varchar [not null]
  // }