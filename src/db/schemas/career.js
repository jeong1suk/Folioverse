//담당 : 이승현

import { Schema, model } from "mongoose";

const CareerSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  yearly: { type: String, required: true },
  job: { type: String, required: true },
  isWeb: { type: Boolean },
  position: { type: String },
  tech_stack: { type: [String] },
});

const CareerModel = model("Career", CareerSchema);

export { CareerModel };
