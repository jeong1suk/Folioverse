import { Schema, model } from "mongoose";

//AwardSchema 정의하기
const AwardSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    date: { type: String, required: true }, //문자타입맞아?
  },
  { timestamps: true }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };

// Table award {
//   id objectId [primary key]
//   name varchar [not null]
//   date varchar [not null]
//   created_at timestamp
//   updated_at timestamp
// }
