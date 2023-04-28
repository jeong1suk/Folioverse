import { Schema, model } from "mongoose";

//CareerSchema 정의하기
const CareerSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  yearly: { type: Number, required: true },
  job: { type: String, required: true },
});

const CareerModel = model("Career", CareerSchema);

export { CareerModel };

// Table career {
//   id objectId [primary key]
//   yearly integer [not null]
//   job varchar [not null]
// }
