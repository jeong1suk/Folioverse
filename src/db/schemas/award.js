import { Schema, model } from "mongoose";

//AwardSchema 정의하기
const AwardSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    date: { type: String, required: true }, 
  },
  { timestamps: true }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };

